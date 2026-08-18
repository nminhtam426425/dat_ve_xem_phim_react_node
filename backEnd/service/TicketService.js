import {Tickets, Seats, Showtimes, Bookings, Movies, MovieTheater, TypeTheater, Categories, VoucherOfUser, User, BookingVoucher} from "../model/index.js"
import crypto from "crypto"
import {pusher} from "../authen/config.js"
import { Op } from "sequelize"
import { findObject } from "./validate.js"

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
    bookingTicket = async (seat_number, showtime_id, user_id, socket_id) => {
        try{
            const showtime = await Showtimes.findOne({
                where: {id: showtime_id}
            })
            let expired_at = this.addMinutes(new Date(), showtime.limited_number_of_minutes)
            //let expired_at = this.addMinutes(new Date(), 5/(60*1000))
            let result = await this.ticket.create({
                seat_number: seat_number,
                showtime_id:showtime_id,
                ticket_id: crypto.randomUUID(),
                booking_id: user_id == "" ? crypto.randomUUID() : user_id,
                is_scanned: 0,
                scanned_at: null,
                expired_at: expired_at,
                status: 'pending'
            })
            
            await pusher.trigger(`showtimes-${showtime_id}`,
                'booking_seat',
                {
                    showtimeId: showtime_id,
                    seatId: [seat_number],
                    type: 'book'
                },
                {
                    socket_id: socket_id
                }
            )
    
            return {
                result,
                tmpIdUser: user_id == "" ? result.booking_id : "oke"
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }
   
    // xoá vé khi re-click
    unBooking = async (seat_number, showtime_id, socket_id) => {
        try{
            let result = await this.ticket.destroy({
                where: {
                    seat_number: seat_number,
                    showtime_id: showtime_id
                }
            })

            await pusher.trigger(`showtimes-${showtime_id}`,
                'booking_seat',
                {
                    showtimeId: showtime_id,
                    seatId: [seat_number],
                    type: 'unbook'
                },
                {
                    socket_id: socket_id
                }
            )
           
            return result
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // xóa vé, gửi đến các user cùng suất chiếu
    deleteTicketExpired = async (showtime_id, seats_number, socket_id) => {
        let result =  await this.ticket.destroy({
            where: {
                expired_at: {
                    [Op.lt]: new Date()
                },
                status: 'pending',
                showtime_id: showtime_id
            }
        })
        // xóa hết các ghế tương ứng của user
        // vì seats_id là mảng rồi nên không tạo mảng mảng như các hàm trên
        await pusher.trigger(`showtimes-${showtime_id}`,
            'booking_seat',
            {
                showtimeId: showtime_id,
                seatId: seats_number,
                type: 'unbook'
            },
            {
                socket_id: socket_id
            }
        )
        return result
    }

    // xoá vé của người dùng hết hạn, gửi đến các user khác
    deleteMyTicketExpired = async (user_id, showtime_id, seats_number, socket_id) => {
        let result =  await this.ticket.destroy({
            where: {
                status: 'pending',
                booking_id: user_id
            }
        })
        // xóa hết các ghế tương ứng của user
        // vì seats_id là mảng rồi nên không tạo mảng mảng như các hàm trên
        await pusher.trigger(`showtimes-${showtime_id}`,
            'booking_seat',
            {
                showtimeId: showtime_id,
                seatId: seats_number,
                type: 'unbook'
            },
            {
                socket_id: socket_id
            }
        )
        return result
    }

    // cộng thêm thời gian cho user thanh toán
    addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }

    // chưa xử lý voucher
    paymentSuccess = async (idUser,showtime_id,price_at_booking,role,userEarnPoint=null,useVoucher) => {
        let dataForCreate = {
            id: crypto.randomUUID(),
            user_id: role == 'user' ? idUser : userEarnPoint?.id || null,
            staff_id: role == 'staff' ? idUser : null,
            showtime_id: showtime_id,
            payment_status: role == 'staff' ? 'paid' : 'pending',
            price_at_booking: price_at_booking
        }
        let result = await Bookings.create(dataForCreate)

        // cập nhật - tạo mới voucher sử dụng
        if(useVoucher?.length > 0){
            let pubVoucher = useVoucher.find(item => item.type == 'public')
            let privateVoucher = useVoucher.find(item => item.type == 'private')

            if(privateVoucher){
                // cập nhật lại voucher cá nhân
                await VoucherOfUser.update(
                    {
                        is_use: 1
                    },
                    {
                        where: {
                            user_id: idUser,
                            voucher_id: privateVoucher.id
                        }
                    }
                )
                await BookingVoucher.create({
                    booking_id: dataForCreate.id,
                    voucher_id: privateVoucher.id
                })
            }

            if(pubVoucher){
                await BookingVoucher.create({
                    booking_id: dataForCreate.id,
                    voucher_id: pubVoucher.id
                })
            }
        }

        // nếu là staff -> status == 'paid' không quan tâm đến field expired_at
        // ngược lại user -> cập nhật lại thêm thời hạn thanh toán
        await this.ticket.update(
            {
                booking_id: result.id,
                status: dataForCreate.payment_status,
                expired_at: this.addMinutes(new Date(),6)
            },
            {
                where: {
                    showtime_id: showtime_id,
                    booking_id: idUser
                }
            }
        )
        if(userEarnPoint){
            let showtime = await findObject(Showtimes, 'id', showtime_id)
            let user = await findObject(User, 'id', userEarnPoint.id)
            let tickets = await this.ticket.findAll({
                where: {
                    showtime_id: showtime_id,
                    booking_id: result.id
                }
            })
            let point = showtime.point*tickets.length + user.reward_points
            await user.update({
                reward_points: point
            })
        }
       

        return result
    }

    // lịch sử đặt vé của người dùng
    historyOfUser = async (idUser) => {
        let result =  await Bookings.findAll({
            attributes:['id','price_at_booking'],
            where: {
                user_id: idUser,
                payment_status: 'paid'
            },
            include:[
                {
                    model: Showtimes,
                    attributes:['id','start_time'],
                    include: [
                        {
                            model: Movies,
                            attributes: ['title','poster_url']
                        },
                        {
                            model: MovieTheater,
                            attributes: ['name'],
                            include: [
                                {
                                    model: TypeTheater,
                                    attributes: ['type_name']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Tickets,
                    attributes: ['seat_number']
                }
            ]
        })
        return result
    }

    // dùng riêng có cấu trúc đặc biệt của arr
    findMax = (arr) => {
        if(!arr) return 
        let max = 0
        for(let i of arr){
            if(i.age_permit > max)
                max = i.age_permit
        }
        return max
    }
    // check tuổi
    getAgePermit = async (idMovie) => {
        let result = await Movies.findOne({
            attributes: [],
            include: [
                {
                    model: Categories,
                    attributes: ['age_permit'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: idMovie
            }
        })
        return this.findMax(result.Categories)
    }

    //check vé, ùng cho staff
    checkTicket = async (qrCode) => {
        let result = await Bookings.findOne({
            where: {
                id: qrCode
            },
            include:[
                {
                    model: Showtimes,
                    attributes:['id','start_time'],
                    include: [
                        {
                            model: Movies,
                            attributes: ['id','title']
                        },
                        {
                            model: MovieTheater,
                            attributes: ['name'],
                            include: [
                                {
                                    model: TypeTheater,
                                    attributes: ['type_name']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Tickets,
                    attributes: ['seat_number']
                }
            ]
        })
        let message = ""
       
        // nếu không có result: có thể tách vé - dựa vào ticket_id để check
        // nếu cả 2 không có ==> vé không hợp lệ
        if(!result){
            let ticket = await Tickets.findOne({
                where:{
                    ticket_id: qrCode
                }
            })
            if(!ticket){
                message = "Vé không hợp lệ !"
                return {
                    type: 'error',
                    message: message
                }
            }
        }

        let checkDay = new Date(result.Showtime.start_time)
        
        if(new Date() - checkDay > 0){
            message = `Quá thời gian suất chiếu\nPhim: ${result.Showtime.Movie.title}\nThời gian: ${result.Showtime.start_time}`
            return {
                type: 'error',
                message: message
            }
        }

        let ticket = await Tickets.findOne({
            where: {
                booking_id: result.id,
                showtime_id: result.showtime_id
            }
        })
       
        // kiểm tra xem vé đã scan chưa
        if(ticket.is_scanned == 1){
            message = "Vé đã sử dụng !"
            return {
                type: 'error',
                message: message
            }
        }

        await this.ticket.update(
            {
                is_scanned: 1
            },
            {
                where: {
                    booking_id: result.id,
                    showtime_id: result.showtime_id
                }
            }
        )

        let maxAge = await this.getAgePermit(result.Showtime.Movie.id)
        
        return {
            type: 'success',
            data: {
                title: result.Showtime.Movie.title,
                theater: `${result.Showtime.MovieTheater.name} (${result.Showtime.MovieTheater.TypeTheater.type_name})`,
                start_time: result.Showtime.start_time,
                seats: result.Tickets.map( item => item.seat_number).join(', '),
                maxAge: maxAge
            }
        }
    }

    // lấy danh sách các vé và thông tin vé 
    getInfoDetailShowtime = async (showtime_id) => {
        let bookings =  await Bookings.findAll({
            attributes:['id'],
            where: {
                showtime_id
            },
            include:[
                {
                    model: User,
                    as: 'Customer', 
                    attributes: ['fullname', 'role'] 
                },
                {
                    model: User,
                    as: 'Staff', 
                    attributes: [ 'fullname', 'role'] 
                }
            ]
        })
        let tickets = await this.ticket.findAll({
            attributes:['seat_number','booking_id'],
            where: {
                showtime_id,
                status: 'paid'
            }
        })
        let bookingMap = {}
        bookings.forEach(item =>{
            bookingMap[item.id] = {
                data: {
                    customer: item.Customer,
                    staff: item.Staff
                }
            }
        })

        let finalResult = []
        tickets.forEach(item => {
            finalResult.push({
                data:{
                    ...item.dataValues,
                    ...bookingMap[item.booking_id].data
                }
            })
        })
        return finalResult
    }
}

export default new TicketService(Tickets)