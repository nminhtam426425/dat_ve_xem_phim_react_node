import {TicketService, RevenueService} from "../service/index.js"

class BookingController {

    bookingTicket = async (req,res) => {
        try {
            const {id} = req.user
            const {seat_number, showtime_id, socket_id} = req.body
            const result = await TicketService.bookingTicket(seat_number, showtime_id, id, socket_id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    unBooking = async (req,res) => {
        try {
            const {seat_number, showtime_id, socket_id} = req.body
            const result = await TicketService.unBooking(seat_number, showtime_id, socket_id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    bookingTicketNonLogin = async (req,res) => {
        try {
            let {seat_number, user_id, showtime_id, socket_id} = req.body
            const result = await TicketService.bookingTicket(seat_number, showtime_id, user_id, socket_id, "non-login")
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    unBookingUserNonLogin = async (req,res) => {
        try {
            const {seat_number, showtime_id, socket_id} = req.body
            const result = await TicketService.unBooking(seat_number, showtime_id, socket_id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    deleteTicketExpired = async (req,res) => {
        try {
            let {showtime_id, seat_number, socket_id} = req.body
            const result = await TicketService.deleteTicketExpired(showtime_id, seat_number, socket_id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    paymentSuccess = async (req,res) => {
        try {
            const {id} = req.user
            let {showtime_id,price_at_booking,role,userEarnPoint,useVoucher} = req.body
            const result = await TicketService.paymentSuccess(id, showtime_id, price_at_booking, role, userEarnPoint,useVoucher)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    historyOfUser = async (req,res) => {
        try {
            const {id} = req.user
            const result = await TicketService.historyOfUser(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    checkTicket = async (req,res) => {
        try {
            const id = req.params.id_ticket
            const result = await TicketService.checkTicket(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getRevenueWeek = async (req,res) => {
        try {
            const result = await RevenueService.getRevenueWeek(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new BookingController()