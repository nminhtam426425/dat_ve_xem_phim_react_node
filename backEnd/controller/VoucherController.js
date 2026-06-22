import {VoucherService} from "../service/index.js"

class VoucherController {
    constructor(voucherControler) {
        this.voucherControler = voucherControler
    }

    getAll = async (req, res) => {
        try {
            const result = await this.voucherControler.getAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    create = async (req,res) => {
        try {
            const result = await this.voucherControler.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    useVoucher = async (req, res) => {
        try {
            const result = await this.voucherControler.useVoucher(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.idVoucher
            const result = await this.voucherControler.deleteVoucher(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateVoucher = async (req, res) => {
        try {
            const result = await this.voucherControler.updateVoucher(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new VoucherController(VoucherService)