import {TicketService} from "../service/index.js";

class BookingController {

    bookingTicket = async (req,res) => {
        try {
            const {id} = req.user
            const {seat_id, showtime_id} = req.body
            const result = await TicketService.bookingTicket(seat_id, showtime_id, id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new BookingController()