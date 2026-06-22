import {User} from "../model/index.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class AuthenService {
    login = async ({username, password, type}) => {
        try{
            const userLogin = await User.findOne({where: {username: username}})
            if(!userLogin)
                throw new Error("Thông tin tài khoản không chính xác1 !")
            if( !userLogin.is_activating)
                throw new Error("Tài khoản đã bị khóa !")

            const isMatch = await bcrypt.compare(password, userLogin.password)
            let isAllowed = type.includes(userLogin.role)
            if(!isMatch || !isAllowed)
                throw new Error("Thông tin tài khoản không chính xác 2!")
            
            const token = this.createToken(userLogin.id, userLogin.role)
            const refreshToken = this.createTokenRefresh(userLogin.id, userLogin.role)
            return {
                token,
                refreshToken
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // status: isLoging -> dùng chp các user đã đăng nhập khi mua vé không hiển thị thông báo
    // status: nonLogin -> dùng cho các user muốn mua vé mà không muốn tạo tài khoản hoặc đăng nhập sẽ hiển thị thông báo
    createToken = (id,role,status='isLoging') => {
        const token = jwt.sign(
            {
                id: id, 
                role: role,
                status: status
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN}
        )
        return token
    }

    createTokenRefresh = (id,role,status='isLoging') => {
        const token = jwt.sign(
            {
                id: id, 
                role: role,
                status: status
            }, 
            process.env.JWT_SECRET_REFRESH, 
            {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
        )
        return token
    }

    refreshToken = async (refreshToken) => {
        return jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
            if (err) 
              return res.status(401).json({ message: 'Refresh Token không hợp lệ !' })
        
            const newAccessToken = jwt.sign(
                { 
                    id: decoded.id, 
                    role: decoded.role 
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN } 
            )
        
            return { token: newAccessToken }
        })
    }
}

export default new AuthenService()