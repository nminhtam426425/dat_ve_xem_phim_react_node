import { Conversations, ContentConver, User } from "../model/index.js"
import crypto from "crypto"
import {pusher} from "../authen/config.js"
import {findObject} from './validate.js'
import { Op } from "sequelize"

class ChatService {
    sendMessageToAdmim = async (user_id,{message, time}) => {
        try{
            let admin_id = 'a0b47baf-b2dc-4f95-9794-e2870b6be965'

            let conversation = await Conversations.findOne({
                where: {
                    admin_id,
                    user_id
                }
            })
    
            if(!conversation){
                conversation = await Conversations.create({
                    admin_id,
                    user_id,
                    updated_at: new Date()
                })
            }
    
            let result = await this.storedMessage(conversation.id, user_id, message, time)
            await ContentConver.update(
                {
                    is_read: 1
                },
                {
                    where:{
                        sender_id: admin_id,
                        conver_id: conversation.id
                    }
                }
            )
    
            await pusher.trigger(`chat-${admin_id}`,
                'chat',
                {
                    id_conver: conversation.id,
                    message_text: message
                }
            )
    
            return result
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    storedMessage = async (id_conver, user_id, message, time) => {
        let result = await ContentConver.create({
            id: crypto.randomUUID(),
            conver_id: id_conver,
            sender_id: user_id,
            message_text: message,
            created_at: time
        })
        
        await Conversations.update(
            {
                updated_at: time
            },
            {
                where: {
                    id: id_conver
                }
            }
        )
        return result
    }

    sendMessageToUser = async (user_id, {id_conver, message, time}) => {
        try{
            let conversation = await Conversations.findOne({
                where: {
                    id: id_conver
                }
            })
            let result = await this.storedMessage(id_conver, user_id, message, time)
            await ContentConver.update(
                {
                    is_read: 1
                },
                {
                    where:{
                        sender_id: conversation.user_id,
                        conver_id: conversation.id
                    }
                }
            )

            await pusher.trigger(`chat-${conversation.user_id}`,
                'chat',
                {
                    id_conver: id_conver,
                    message_text: message
                }
            )
    
            return result
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // lấy thông tin của user khi trò chuyện với admin
    getInfoUser = async  (id_conver) => {
        let conver = await findObject(Conversations, 'id', id_conver)
        let user = await findObject(User, 'id', conver.user_id)
        return {
            avatar: user.avatar,
            fullname: user.fullname
        }
    }

    getMessageOfUser = async (user_id) => {
        try {
            let conver = await findObject(Conversations, 'user_id', user_id)

            return await this.getMessageOfConver(conver.id)
        } 
        catch (error) {
            throw new Error(error.message)
        }
    }

    // lấy nội dung cuộc trò chuyện với id_conver tương ứng
    getMessageOfConver = async (conver_id) => {
        try {
            let conver = await Conversations.findOne({
                where: {
                    id: conver_id
                }
            })
            await ContentConver.update(
                {
                    is_read: 1
                },
                {
                    where: {
                        conver_id: conver_id,
                        sender_id: conver.user_id
                    }
                }
            )
            return await ContentConver.findAll({
              attributes: ['id','sender_id', 'message_text','is_read', 'created_at'], 
              where: {
                conver_id
              },
              order: [['created_at', 'ASC']], 
            })
        } 
        catch (error) {
            throw new Error(error.message)
        }
    }

    getTotalConservation = async () => {
        try {
            const conversations = await Conversations.findAll({
                include: [
                    {
                        model: User,
                        as: 'Customer',
                        attributes: ['id', 'fullname', 'avatar']
                    },
                    {
                        model: ContentConver,
                        as: 'Messages', 
                        required: false,
                        attributes: ['id', 'message_text', 'is_read', 'sender_id', 'created_at']
                    }
                ],
                order: [
                    [{ model: ContentConver, as: 'Messages' }, 'created_at', 'DESC']
                ]
            })
        
            const result = conversations.map((conver) => {
                const messages = conver.Messages || []
                const lastMsg = messages[0]; 
            
                const unreadCount = messages.filter(
                    (msg) => !msg.is_read && msg.sender_id === conver.user_id
                ).length
            
                return {
                    id: conver.id,
                    buyerName: conver.Customer?.fullname || 'Khách hàng',
                    avatar: conver.Customer?.avatar || '',
                    lastMessage: lastMsg ? lastMsg.message_text : '',
                    time: lastMsg ? this.formatMessageTime(lastMsg.created_at) : '',
                    unreadCount: unreadCount,
                    online: false
                }
            })
        
            return result
        } catch (error) {
            console.error('Lỗi lấy danh sách conversation:', error)
            throw error
        }
    }

    formatMessageTime = (date) => {
        if (!date) return ''
        
        const msgDate = new Date(date)
        const now = new Date()
      
        // Reset giờ về 00:00:00 để so sánh ngày
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
      
        const msgDay = new Date(msgDate.getFullYear(), msgDate.getMonth(), msgDate.getDate())
      
        if (msgDay.getTime() === today.getTime()) 
          return 'Hôm nay'
        else if (msgDay.getTime() === yesterday.getTime()) 
          return 'Hôm qua'
        else {
          const pad = (n) => String(n).padStart(2, '0');
          const year = msgDate.getFullYear();
          const month = pad(msgDate.getMonth() + 1);
          const day = pad(msgDate.getDate());
          const hour = pad(msgDate.getHours());
          const minute = pad(msgDate.getMinutes());
          const second = pad(msgDate.getSeconds());
          return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
    }

    // đánh dấu đã đọc - user
    updateIsRead = async ({messages}) => {
        let idMessage = messages.map(item => item.id)
        return await ContentConver.update(
            {
                is_read: 1
            },
            {
                where:{
                    id:{
                        [Op.in]: idMessage
                    }
                }
            }
        )
    }
}

export default new ChatService()