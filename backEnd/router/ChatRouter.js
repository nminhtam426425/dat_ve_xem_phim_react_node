import { ChatController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js'
import express from 'express'

const routerChat = express.Router()

routerChat.post('/toAdmin',authenticate, authorize(['user']), ChatController.chatToAdmin)
routerChat.post('/toUser',authenticate, authorize(['admin']), ChatController.chatToUser)
routerChat.get('/infoUser/:id_conver',authenticate, authorize(['admin']), ChatController.getInfoUser)
routerChat.get('/messages',authenticate, authorize(['admin','user']), ChatController.getMessages)
routerChat.get('/messagesAdmin/:id_conver',authenticate, authorize(['admin']), ChatController.getMessagesByID)
routerChat.get('/messages-total/',authenticate, authorize(['admin']), ChatController.getTotalMessage)
routerChat.post('/messages/is-read',authenticate, authorize(['admin','user']), ChatController.updateIsRead)

export default routerChat