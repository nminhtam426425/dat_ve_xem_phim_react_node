import {ChatService} from "../service/index.js"

class AuthenController {
    
    chatToAdmin = async (req, res) => {
        try {
            const {id} = req.user
            const result = await ChatService.sendMessageToAdmim(id, req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    chatToUser = async (req, res) => {
        try {
            const {id} = req.user
            const result = await ChatService.sendMessageToUser(id, req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getInfoUser = async (req, res) => {
        try {
            let id_conver = req.params.id_conver
            const result = await ChatService.getInfoUser(id_conver)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getMessages = async (req, res) => {
        try {
            const {id} = req.user
            const result = await ChatService.getMessageOfUser(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getMessagesByID = async (req, res) => {
        try {
            const id_conver = req.params.id_conver
            const result = await ChatService.getMessageOfConver(id_conver)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    
    getTotalMessage = async (req, res) => {
        try {
            const result = await ChatService.getTotalConservation()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateIsRead = async (req, res) => {
        try {
            const result = await ChatService.updateIsRead(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new AuthenController()