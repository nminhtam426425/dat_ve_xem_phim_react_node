import { PaymentService } from "../service/index.js"

class PaymentController {
    payment = async (req, res) => {
        try {
            const {id} = req.user
            const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
            const result = await PaymentService.createOrder(id, ipAddress, req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    verity = async (req, res) => {
        try {
            const result = await PaymentService.verifyOrder(req.query)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new PaymentController()