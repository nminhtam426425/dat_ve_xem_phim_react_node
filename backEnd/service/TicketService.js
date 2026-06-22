import {Tickets, Seats, Bookings, sequelize} from "../model/index.js"
import crypto from "crypto"
import {convertObjectForUpdate} from "./validate.js"
import {pusher} from "../authen/config.js"

class TicketService {
    constructor(ticket) {
        this.ticket = ticket;
    }

    create = async (room_id, showtime_id) => {
        try{
            const seats = await Seats.findAll({
                where: {room_id: room_id}
            })

            let listTickets = this.createListTicket(seats, showtime_id)
            return await this.ticket.bulkCreate(listTickets)
        }
        catch(err){
            throw new Error(err.message)
        }
    }

   createListTicket = (listChair, showtime_id) => {
        let result = []
        let length = listChair.length
        for(let i = 0; i < length; i++){
            result.push({
                ticket_id: crypto.randomUUID(),
                booking_id: null,
                seat_id: listChair[i].id,
                showtime_id: showtime_id,
                is_scanned: 0,
                scanned_at: null
            })
        }
        return result
   }

   // Đặt vé: nếu đã có booking_id thì update booking_id vào ticket, 
   // nếu chưa có thì tạo mới booking rồi update booking_id vào ticket
   bookingTicket = async (seat_id, showtime_id, user_id) => {
        let result = null 
        try{
            result = await sequelize.transaction(async (t) => {
                const seat = await Tickets.findOne({
                    where: {
                        seat_id: seat_id,
                        showtime_id: showtime_id
                    },
                        lock: t.LOCK.UPDATE, 
                        transaction: t 
                    })

                    if (!seat) 
                        throw new Error("Ghế không tồn tại trong suất chiếu này!")
                
                    if (seat.booking_id != null ) 
                        throw new Error("Ghế này đã có người nhanh tay chọn trước!")

                    const bookings = await Bookings.findOne({
                        where: {user_id: user_id, showtime_id: showtime_id}
                    })
    
                    let booking_id = ''
                    console.log(showtime_id,user_id,seat_id)
                    if(bookings)
                        booking_id = bookings.id 
                    else {
                        const newBooking = await Bookings.create({
                            id: crypto.randomUUID(),
                            user_id: user_id,
                            showtime_id: showtime_id,
                            booking_date: new Date()
                        })
                        booking_id = newBooking.id
                    }
        
                    if(booking_id === '')
                        throw new Error("Đặt vé thất bại [Error_Code: 26042004]!")
                    
                    await seat.update({
                        booking_id: booking_id,
                    }, { 
                        transaction: t 
                    })
                    
                    return { seat_id, showtime_id }
            })
        }
        catch(err){
            console.log(err)
            throw new Error("Đặt vé thất bại [Error_Code: 17012004]!")
        }

        await pusher.trigger(`showtimes-${showtime_id}`,'booking_seat',{
            showtimeId: showtime_id,
            seatId: seat_id
        })

        return result
    }
   
}

export default new TicketService(Tickets)