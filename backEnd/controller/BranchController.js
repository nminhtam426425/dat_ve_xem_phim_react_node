import {BranchService, MovieTheaterService} from "../service/index.js";

class BranchController {
    constructor(branchController) {
        this.branchController = branchController
    }

    getAll = async (req, res) => {
        try {
            const result = await this.branchController.getAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    create = async (req,res) => {
        try {
            const result = await this.branchController.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    delete = async (req,res) => {
        try {
            const id = req.params.theater_id
            const result = await MovieTheaterService.delete(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getStaffInBranch = async (req,res) => {
        try {
            const branchId = req.params.branchId
            const result = await this.branchController.getStaffInBranch(branchId)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    createRoom = async (req,res) => {
        try {
            const {id} = req.user
            const result = await MovieTheaterService.create(req.body, id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getInfoBranch = async (req,res) => {
        try {
            const {id} = req.user
            const result = await this.branchController.getInfoBranch(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getAllRoomOnBranch = async (req,res) => {
        try {
            const {id} = req.user
            const result = await MovieTheaterService.getTheaterByIdAccount(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // lấy dữ liệu ghế của phòng chiếu
    getChairOfBranch = async (req,res) => {
        try {
            const id = req.params.theater_id
            const result = await MovieTheaterService.getListChairOfTheater(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getAllTypeTheater = async (req,res) => {
        try {
            const result = await MovieTheaterService.getAllTypeTheater()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new BranchController(BranchService)