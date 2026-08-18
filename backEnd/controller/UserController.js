import {UserService} from "../service/index.js"

class UserController {
    constructor(userService) {
        this.userService = userService
    }

    calcPercent = async (req, res) => {
        try {
            const result = await this.userService.calcPercent()
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    getAllForStaff = async (req, res) => {
        try {
            const result = await this.userService.getAllForStaff()
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    
    getAll = async (req, res) => {
        try {
            const result = await this.userService.getAll(req.query)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    create = async (req,res) => {
        try {
            const {username,password,email,fullname,website,role,token} = req.body
            // tạo phản hổi giả
            if(website)
                return res.status(200).json({ message: "Đăng ký thành công !" })
            const result = await this.userService.create(username,password,email,fullname,role,token)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    createByStaff = async (req,res) => {
        try {
            const {username,password,fullname} = req.body
            const result = await this.userService.createByStaff(username,password,fullname)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }


    activateAccount= async (req,res) => {
        try {
            const result = await this.userService.activateAccount(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    update = async (req,res) => {
        try {
            const {id} = req.user
            const {fullname,email,phone,birthday,is_activating} = req.body
            const result = await this.userService.update(id, fullname,email,phone,birthday,is_activating)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    updateAvatar = async (req,res) => {
        try {
            const {id} = req.user
            const {avatar, pub_id_avatar} = req.body
            const result = await this.userService.updateAvatar(id, avatar, pub_id_avatar)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    delete = async (req,res) => {
        try {
            const result = await this.userService.delete(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    createStaff = async (req, res) => {
        try {
            const {id} = req.user
            const {username,password,email,fullname} = req.body
            const result = await this.userService.createStaff(id,fullname,username,password,email)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    info = async (req, res) => {
        try {
            const {id} = req.user
            const result = await this.userService.getInfo(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    getSpendingPrivate = async (req, res) => {
        try {
            const {id} = req.user
            const result = await this.userService.getSpendingPrivate(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    changePassword = async (req, res) => {
        try {
            const {id} = req.user
            const result = await this.userService.changePassword(id, req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    forgetPass = async (req, res) => {
        try {
            const result = await this.userService.forgetPassword(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    confirmCode = async (req, res) => {
        try {
            const result = await this.userService.confirmCode(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    changePasswordForForget = async (req, res) => {
        try {
            const result = await this.userService.changePasswordForForget(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    createCode = async (req, res) => {
        try {
            const result = await this.userService.createCode()
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

export default new UserController(UserService)