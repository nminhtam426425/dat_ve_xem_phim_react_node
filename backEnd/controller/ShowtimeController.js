import {ShowtimeService} from "../service/index.js"

class ShowtimeController {
    constructor(showtimeService) {
        this.showtimeService = showtimeService
    }

    getAll = async (req, res) => {
        try {
            const result = await this.showtimeService.getAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    create = async (req,res) => {
        try {
            const result = await this.showtimeService.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    findShowtimeByMovieId = async (req,res) => {
        try {
            const result = await this.showtimeService.findShowtimeByMovieId(req.params.id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    update = async (req,res) => {
        try {
            const result = await this.showtimeService.update(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getShowtimeByDate = async (req,res) => {
        try {
            let {id} = req.user
            let date = req.params.date
            const result = await this.showtimeService.getForShowtimeTable(id, date)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    delete = async (req,res) => {
        try {
            let id = req.params.idShowtime
            const result = await this.showtimeService.deleteShowtime(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getShowtimeForStaff = async (req,res) => {
        try {
            let {id} = req.user
            const result = await this.showtimeService.getForStaffTicket(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getListChairOfShowtime = async (req,res) => {
        try {
            let id = req.params.id_showtime
            const result = await this.showtimeService.getListChairOfShowtime(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new ShowtimeController(ShowtimeService)