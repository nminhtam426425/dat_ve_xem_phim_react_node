import { User,BranchStaff, Branches, Bookings, Tickets, sequelize, ForgetPass } from "../model/index.js"
import { validatePassword,validateUsername, convertObjectForUpdate, findObject, countByCondition, countMonthNow } from "./validate.js"
import crypto from "crypto"
import bcrypt from "bcrypt"
import {cloudinary, transporter} from '../authen/config.js'
import { Op } from "sequelize"

function generateToken(timestamp) {
    const signature = crypto.createHmac('sha256', process.env.SECRET_KEY_FOR_REGISTER)
      .update(timestamp.toString())
      .digest('hex')
    return `${timestamp}.${signature}`
}

class UserService {
    constructor(user) {
        this.user = user;
    }

    calcPercent = async () => {
        let users = await this.user.findAll({
            attributes: ['id', 'fullname', 'email', 'phone', 'username', 'avatar', 'role', 'is_activating', 'created_at']
        })
        let percentTotal = Math.floor((countMonthNow(users)/users.length)*100)
        let staff = countByCondition(users, 'role', 'staff')
        let user = countByCondition(users, 'role', 'user')
        let active = countByCondition(users, 'is_activating', 1)
        let percentUser = Math.floor((countMonthNow(users.filter(item => item.role == 'user'))/users.length)*100)

        return {
            total: users.length,
            percentTotal,
            staff,
            user,
            active,
            percentUser
        }
    }

    getAllForStaff = async () => {
        return await this.user.findAll({
            attributes: ['id', 'fullname','username', 'email', 'phone', 'username', 'avatar', 'role', 'is_activating', 'created_at'],
            where: {
                role: 'user',
                is_activating: 1
            }
        })
    }

    getAll = async ({page, limit, role, is_activating, search}) => {
        try {
            const offset = (page - 1) * limit
            
            const whereCondition = {}
        
            if (role) 
              whereCondition.role = role
        
            // Lọc theo trạng thái Kích hoạt
            if (is_activating !== undefined && is_activating !== '') 
              whereCondition.is_activating = is_activating === '1'
            
            // Tìm kiếm theo Fullname hoặc Email
            if (search && search.trim() !== '') {
              const keyword = `%${search.trim()}%`
              whereCondition[Op.or] = [
                { fullname: { [Op.like]: keyword } },
                { email: { [Op.like]: keyword } }
              ]
            }

            let {count} = await this.user.findAndCountAll({
                where: whereCondition
            })
        
            const { rows } = await this.user.findAndCountAll({
                attributes: [
                  'id', 'fullname', 'email', 'phone', 'username', 'avatar', 'role', 'is_activating', 'created_at',
                  [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('CustomerBookings.price_at_booking')), 0), 'total_revenue']
                ],
                include: [
                  {
                    model: Bookings,
                    attributes: [], 
                    duplicating: false, // Giúp count không bị nhân bản khi dùng với findAndCountAll,
                    as: 'CustomerBookings'
                  }
                ],
                where: whereCondition,
                group: ['User.id'], 
                subQuery: false, 
                limit: Number(limit),
                offset: offset,
                raw: true 
            })
        
            return {
                data: rows,
                pagination: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    itemsPerPage: limit
                }
            }
          } catch (error) {
            throw new Error(error.message)
          }
    }

    createCode = async () => {
        const timestamp = Date.now()
        const token = generateToken(timestamp)
        return token
    }

    create = async (username,password,email,fullname,role="user",token,byStaff=false) => {
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

            // chỉ xét ở trang đăng ký - register
            // byStaff = true là tạo tài khoản ở quầy, không cần xác thực
            if(role == 'user' && !byStaff) {
                //Thời gian tạo form không hợp lệ !
                if (!token || !token.includes('.')) 
                    return {message: 'Đăng ký thành công!'}

                const [timestampStr, clientSignature] = token.split('.')
                const timestamp = parseInt(timestampStr, 10)

                //So sánh chữ ký HMAC để đảm bảo Timestamp không bị sửa đổi
                const expectedSignature = crypto.createHmac('sha256', process.env.SECRET_KEY_FOR_REGISTER)
                    .update(timestampStr)
                    .digest('hex')

                //Thời gian tạo form đã bị can thiệp!
                if (clientSignature !== expectedSignature) 
                    return {message: 'Đăng ký thành công!'}

                const timeTaken = Date.now() - timestamp
                // Nếu thời gian từ lúc tạo form đến lúc submit quá nhanh (ví dụ < 3 giây), có thể là bot
                if (timeTaken < process.env.MIN_SUBMIT_TIME_MS) 
                    return { message: 'Đăng ký thành công!' }

                if (timeTaken > process.env.MAX_SUBMIT_TIME_MS) 
                    throw new Error("Vui lòng tải lại trang và thử lại!")
            }

            const passHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
            const result = await this.user.create({
                id: crypto.randomUUID(),
                fullname:  fullname,
                email:  email || null,
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

    // tạo tài khoản user ở quầy, không cần xác thực
    createByStaff = async (username,password,fullname) => {
        try{
            return await this.create(username,password,null,fullname,"user","",true)
        }
        catch(err){
            console.log(err.message)
            throw new Error(err.message)
        }
    }

    update = async (id,fullname,email="",phone,birthdayFE) => {
        try{
            let emailDupliacte = null
            if(email != ""){
                emailDupliacte = await User.findOne({
                    where:{
                        email: email
                    }
                })
            }
            
            let userUpdate = await findObject(this.user, 'id', id)
            if(emailDupliacte && userUpdate.id != emailDupliacte.id)
                throw new Error("Email đã có người đăng ký !")

            // dựa vào key để xem prop nào được truyền vào từ FE
            // nếu props nào undefined hoặc null thì bỏ qua trong vòng hàm
            let birthday = birthdayFE ==  "" ? null : birthdayFE
            let sourceObj = {fullname,email,phone,birthday}
            userUpdate = convertObjectForUpdate(userUpdate,sourceObj)

            await userUpdate.save()

            return "oke"
        }
        catch(err){
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

    createStaff = async (idUser,fullname,username,password,email) => {
        try{
            const userBranch = await findObject(BranchStaff,'user_id',idUser)
            const branch = await findObject(Branches, 'id', userBranch.branch_id)

            const request = {
                fullname,
                username,
                email,
                password,
                role: 'staff'
            }

            const accountStaff = await this.create(username,password,email,fullname,"staff")
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
            attributes: ['id','fullname','phone','email','avatar','created_at','role','birthday','reward_points'],
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
    // dùng cho profile cá nhân
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

    generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length)
          result += characters[randomIndex]
        }
        return result.toUpperCase()
    }

    // bước 1: tạo mã xác nhận, gửi về gmail đăng ký tài khoản
    forgetPassword = async ({username}) => {
        let user = await this.user.findOne({
            where: {
                username
            }
        })
        if(!user || user.role != 'user') 
            throw new Error ("Tài khoản không hợp lệ !")
        
        if(user.email==null || user.email == "")
            throw new Error ("Tài khoản chưa đăng ký gmail, vui lòng liện hệ trực tiếp ADMIN để được xử lý !")

        let code_reset = this.generateRandomString()

        let expired_date = new Date(new Date().getTime() + 5*60*1000)
        
        await ForgetPass.create({
            user_id: user.id,
            code_reset,
            expired_date,
            created_at: new Date()
        })

        try{
            const mailOptions = {
                from: "nminhtam425@gmail.com",
                to: user.email,
                subject: "Reset mật khẩu",
                text: `Xin chào, đây là CODE: ${code_reset} để reset mật khẩu của bạn, có hiệu lực trong 5 phút.`,
               
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) 
                    console.log("Lỗi khi gửi mail:", error)
                else 
                    console.log("Email đã được gửi:", info.response)
                }
            )
        }
        catch(err){
            throw new Error(err.message)
        }

       return {
            url: process.env.FE+'/xac-nhan'
       }
    }

    // bước 2 sau khi quên mật khẩu --> xác nhận mã code
    confirmCode = async ({code_reset}) => {
        let code = await ForgetPass.findOne({
            where: {
                code_reset
            }
        })
        if(!code)
            throw new Error("Không hợp lệ !")

        let today = new Date()
        let expire = new Date(code.expired_date)

        await ForgetPass.destroy({
            where: {
                expired_date: {
                    [Op.lt]: new Date()
                }
            }
        })

        if(expire - today < 0)
            throw new Error("Không hợp lệ !")
        return {
            user_id: code.user_id
        }
    }

    // bước 3: đổi mật khẩu sử dụng id của user - tránh staff, user
    changePasswordForForget = async ({user_id, new_pass}) => {
        console.log(new_pass)
        let user = await findObject(this.user, 'id', user_id)
        if(!user)
            throw new Error("Không hợp lệ !")

        if(!validatePassword(new_pass))
            throw new Error("Mật khẩu phải có ít nhất 8 kí tự và chỉ được chứa chữ và số !")

        const passHash = await bcrypt.hash(new_pass, Number(process.env.SALT_ROUNDS))

        let sourceObj = {password: passHash}
        user = convertObjectForUpdate(user, sourceObj)
        await user.save()

        return {
            username: user.username
        }
    }
}

export default new UserService(User)