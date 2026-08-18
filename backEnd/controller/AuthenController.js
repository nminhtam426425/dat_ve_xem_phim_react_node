import {AuthenService} from "../service/index.js"

class AuthenController {
    
    login = async (req, res) => {
        try {
            const result = await AuthenService.login(req.body)
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,  // Ngăn JavaScript truy cập
                secure: true,    // Chỉ gửi qua HTTPS 
                sameSite: 'strict', // Ngăn chặn tấn công CSRF (Cross-Site Request Forgery)
                maxAge: 24 * 60 * 60 * 1000
            })
            res.status(200).json({token: result.token})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    
    loginWithGoogle = async (req, res) => {
        try {
            const result = await AuthenService.loginWithGoogle(req.body)
            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,  // Ngăn JavaScript truy cập
                secure: true,    // Chỉ gửi qua HTTPS 
                sameSite: 'strict', // Ngăn chặn tấn công CSRF (Cross-Site Request Forgery)
                maxAge: 24 * 60 * 60 * 1000
            })
            res.status(200).json({token: result.token})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    
    refreshToken = async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) 
                return res.status(401).json({ message: 'Không tìm thấy Refresh Token!' })
            
            const result = await AuthenService.refreshToken(refreshToken)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    logout = async (req, res) => {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,      
                sameSite: 'strict'
            })
    
            return res.status(200).json({ message: 'Đăng xuất thành công!' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
    
}

export default new AuthenController()