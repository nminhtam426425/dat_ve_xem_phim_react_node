import { User,BranchStaff, Branches } from "../model/index.js"
import { validatePassword,
    validateUsername, 
    vallidatePhone, 
    convertObjectForUpdate,
    findObject 
} from "./validate.js"
import crypto from "crypto"
import bcrypt from "bcrypt"

class UserService {
    constructor(user) {
        this.user = user;
    }

    getAll = async () => {
        return await this.user.findAll()
    }

    create = async ({username,password,fullname,email,phone,role}) => {
        try{
            if(!username || !password)
                throw new Error("Vui lòng nhập tên đăng nhập và mật khẩu !")

            if(!validatePassword(password))
                throw new Error("Mật khẩu phải có ít nhất 8 kí tự và chỉ được chứa chữ và số !")

            if(!validateUsername(username))
                throw new Error("Tên đăng nhập chỉ chứa chữ và số, không chứa khoảng trắng !")

            if(phone && !vallidatePhone(phone))
                throw new Error("Số điện thoại không hợp lệ !")

            const passHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
            const result = await this.user.create({
                id: crypto.randomUUID(),
                fullname: fullname || null,
                email: email || null,
                username: username,
                password: passHash,
                phone: phone || null,
                role: role || 'user'
            })
            return result
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    update = async ({id,fullname,email,phone,is_activating}) => {
        try{
            let userUpdate = await findObject(this.user, 'id', id)

            // dựa vào key để xem prop nào được truyền vào từ FE
            // nếu props nào undefined hoặc null thì bỏ qua trong vòng hàm
            let sourceObj = {fullname,email,phone,is_activating}
            userUpdate = convertObjectForUpdate(userUpdate,sourceObj)

            return await userUpdate.save()
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

    createStaff = async ({username,password,role,branchId}) => {
        try{
            const branch = await findObject(Branches, 'id', branchId)

            const request = {
                username,
                password,
                role
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
            attributes: ['id','fullname','phone','email','avatar','created_at','role'],
            where: {id: id_user}
        })
    }
}

export default new UserService(User)