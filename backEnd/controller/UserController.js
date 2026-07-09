import {UserService} from "../service/index.js"

class UserController {
    constructor(userService) {
        this.userService = userService
    }

    getAll = async (req, res) => {
        try {
            const result = await this.userService.getAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    create = async (req,res) => {
        try {
            const result = await this.userService.create(req.body)
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
            const result = await this.userService.createStaff(id,req.body)
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
}

export default new UserController(UserService)