import {BranchService, MovieTheaterService, TypeTheaterService} from "../service/index.js";

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

    updateRoom = async (req,res) => {
        try {
            const {id} = req.user
            const result = await MovieTheaterService.update(req.body, id)
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

    // tạo thể loại phòng chiếu mới
    createTypeTheater = async (req, res) => {
        try {
            const result = await TypeTheaterService.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateTypeTheater = async (req, res) => {
        try {
            const result = await TypeTheaterService.update(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    deleteTypeTheater = async (req, res) => {
        try {
            const idTheater = req.params.id_theater
            const result = await TypeTheaterService.delete(idTheater)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateInfoBranch = async (req, res) => {
        try {
            const result = await TypeTheaterService.updateInfoBranch(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getInfomationAboutCinema = async (req, res) => {
        try {
            const result = await TypeTheaterService.getInfoBranch()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new BranchController(BranchService)