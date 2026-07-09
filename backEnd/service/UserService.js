import { User,BranchStaff, Branches, Bookings, Tickets } from "../model/index.js"
import { validatePassword,validateUsername, convertObjectForUpdate, findObject } from "./validate.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
import {cloudinary} from '../authen/config.js'

class UserService {
    constructor(user) {
        this.user = user;
    }

    getAll = async () => {
        let result =  await this.user.findAll()
        return result.filter(item => item.role != 'admin')
    }

    create = async ({username,password,fullname,role}) => {
        try{
            if(!username || !password)
                throw new Error("Vui lòng nhập tên đăng nhập và mật khẩu !")

            let userTemp = await this.user.findOne({
                where: {username: username}
            })
            if(userTemp)
                throw new Error("Tên đăng nhập đã tồn tại !") 

            if(!validatePassword(password))
                throw new Error("Mật khẩu phải có ít nhất 8 kí tự và chỉ được chứa chữ và số !")

            if(!validateUsername(username))
                throw new Error("Tên đăng nhập chỉ chứa chữ và số, không chứa khoảng trắng !")

            const passHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
            const result = await this.user.create({
                id: crypto.randomUUID(),
                fullname:  fullname,
                email:  null,
                username: username,
                password: passHash,
                phone: null,
                avatar: "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png",
                pub_id_avatar: "",
                role: role || 'user'
            })
            return result
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    update = async (id,fullname,email,phone,birthdayFE) => {
        try{
            let userUpdate = await findObject(this.user, 'id', id)

            // dựa vào key để xem prop nào được truyền vào từ FE
            // nếu props nào undefined hoặc null thì bỏ qua trong vòng hàm
            let birthday = birthdayFE ==  "" ? null : birthdayFE
            let sourceObj = {fullname,email,phone,birthday}
            userUpdate = convertObjectForUpdate(userUpdate,sourceObj)

            await userUpdate.save()

            return "oke"
        }
        catch(err){
            console.log(err)
            throw new Error(err.message)
        }
    }

    activateAccount = async ({id, is_activating}) => {
        try{
            let userUpdate = await findObject(this.user, 'id', id)

            let sourceObj = {is_activating}
            userUpdate = convertObjectForUpdate(userUpdate,sourceObj)

            await userUpdate.save()

            return "oke"
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    delete = async ({id}) => {
        try{
            const userDelete = await findObject(this.user,'id',id)

            return await userDelete.destroy()
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    createStaff = async (idUser,{fullname,username,password}) => {
        try{
            const userBranch = await findObject(BranchStaff,'user_id',idUser)
            const branch = await findObject(Branches, 'id', userBranch.branch_id)

            const request = {
                fullname,
                username,
                password,
                role: 'staff'
            }

            const accountStaff = await this.create(request)
            await BranchStaff.create({
                branch_id: branch.id,
                user_id: accountStaff.id
            })
            return accountStaff
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    getInfo = (id_user) => {
        return this.user.findOne({
            attributes: ['id','fullname','phone','email','avatar','created_at','role','birthday'],
            where: {id: id_user}
        })
    }

    updateAvatar = async (idUser, avatar, pub_id_avatar) => {
        try{
            let user = await findObject(this.user, 'id', idUser)
            await this.deleteAvatar(user.pub_id_avatar)

            let sourceObj = {avatar, pub_id_avatar}
            user = convertObjectForUpdate(user,sourceObj)

            await user.save()

            return "oke"
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    deleteAvatar = async (pub_id_avatar) => {
        try{
            if (pub_id_avatar != "" && pub_id_avatar) {
                const cloudinaryResponse = await cloudinary.uploader.destroy(pub_id_avatar)
                
                if (cloudinaryResponse.result !== 'ok') 
                    console.warn("Lưu ý: Ảnh chưa được xóa trên Cloudinary hoặc public_id không tồn tại.")
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // tính toán giá trị theo từng tháng
    // tử mảng lấy từ database truyền vào
    generateSpendingReport = (rawData) => {
        const currentMonth = new Date().getMonth()
        const spending = {
            label: [],
            payment: []
        }
        
        for (let i = 0; i <= currentMonth; i++) {
            spending.label.push(`T${i + 1}`)
            spending.payment.push(0)
        }
        
        rawData.forEach(item => {
            if (!item.booking_date || !item.price_at_booking) return
            
            const dateObj = new Date(item.booking_date)
            const monthIndex = dateObj.getMonth()
            
            // cần chia cho 1 triệu, để phù hợp với FE
            if (monthIndex <= currentMonth) {
                spending.payment[monthIndex] += Number(item.price_at_booking)
            }
        })
        
        return spending
    }

    // lấy thông số cho trang home
    getSpendingPrivate = async (idUser) => {
        const user = await this.user.findOne({
            where: {
                id: idUser
            }
        })
        const total = await Bookings.findAll({
            attributes: ['booking_date', 'price_at_booking'],
            where: {
                user_id: idUser
            }
        })

        const totalTickets = await Bookings.findAll({
            attributes: [],
            where: {
                user_id: idUser
            },
            include: [
                {
                    model: Tickets,
                    attributes: ['seat_number']
                }
            ]
        })

        const spending = this.generateSpendingReport(total)

        return {
            totalSpending: total.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price_at_booking), 0),
            totalTickets: totalTickets.reduce( (accumulator, currentValue)=> accumulator + currentValue.Tickets.length,0),
            points: user.reward_points,
            spending: {
                ...spending
            }
        }
    }

    changePassword = async (id_user,{old_pass, new_pass}) => {
        let user = await findObject(this.user,'id',id_user)

        const isMatch = await bcrypt.compare(old_pass, user.password)
        if(!isMatch) 
            throw new Error("Sai mật khẩu !")

        if(!validatePassword(new_pass))
            throw new Error("Mật khẩu phải có ít nhất 8 kí tự và chỉ được chứa chữ và số !")

        const passHash = await bcrypt.hash(new_pass, Number(process.env.SALT_ROUNDS))

        let sourceObj = {password: passHash}
        user = convertObjectForUpdate(user, sourceObj)
        await user.save()

        return {
            message: "Cập nhật mật khẩu thành công !"
        }
    }
}

export default new UserService(User)