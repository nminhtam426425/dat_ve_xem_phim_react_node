import { Showtimes, Movies, Tickets, Categories, Seats, MovieTheater } from "../model/index.js"
import {TicketService, MovieTheaterService} from "./index.js"
import { Op } from 'sequelize'
import { findObject, convertObjectForUpdate } from "./validate.js";

class ShowtimeService {
    constructor(showtime) {
        this.showtime = showtime;
    }

    getAll = async (id) => {
        return await this.showtime.findAll()
    }

    // hàm dùng để dựa vào thời gian của phim để tính toán thời gian end_time cho 1 showtimes
    addMinutes = (date, minutes) => {
        return new Date(date.getTime() + minutes * 60 * 1000);
    }

    // tạo suất chiếu mới
    // kiểm tra xem suất chiếu mới có trùng với suất chiếu nào đã tồn tại hay không
    // tạo các vé của phòng chiếu tương ứng
    create = async ({ distance_minutes=15,movie_id,room_id,start_time,price,max_tickets,limit_minutes=5,point}) => {
        try{
            if(!movie_id || !room_id || !start_time || !price)
                throw new Error("Thiếu tham số đầu vào !")

            const showtime = await this.validShowtime(movie_id, start_time, room_id, distance_minutes)

            if(showtime.showtime)
                throw new Error("Suất chiếu bị trùng !")

            let result = await this.showtime.create({
                id: crypto.randomUUID(),
                movie_id: movie_id,
                room_id: room_id,
                start_time: showtime.startTime,
                end_time: showtime.endTime,
                price: price,
                max_tickets: max_tickets || 2,
                limit_minutes: limit_minutes || 5,
                point: point || 0
            })

            let tickets = await TicketService.create(room_id, result.id)

            return {
                ...result.dataValues,
                tickets: tickets.length
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    update = async ({ showtime_id,movie_id,room_id,start_time,price,max_tickets,limit,point, distance_minutes=15}) => {
        try{
            let showtimeUpdate = await findObject(this.showtime, 'id', showtime_id)
            const showtime = await this.validShowtime(movie_id || showtimeUpdate.movie_id, start_time, room_id || showtimeUpdate.room_id, distance_minutes)
            
            if(showtime.showtime)
                throw new Error("Suất chiếu bị trùng !")
            
            let sourceObj = {movie_id,room_id,start_time,price,max_tickets,limit,point}
            showtimeUpdate = convertObjectForUpdate(showtimeUpdate,sourceObj)

            return await showtimeUpdate.save()
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // hàm tìm suâts chiếu mới trong 3 ngày gần nhất từ ngày hôm này khi biết id phim
    findShowtimeByMovieId = async (movie_id) => {
        // hôm nay
        let startTime = new Date()
        // cộng thêm 3 ngày 
        let endTime = new Date( startTime.getTime() + 3 * 24 * 60 * 60 * 1000) 

        const showtime = await this.showtime.findAll({
            where: {
                movie_id: Number(movie_id),
                [Op.and]: [
                    {
                        start_time: {
                            [Op.between]: [startTime, endTime]
                        }
                    }
                ]
            },
            include: [
                {
                    model: Movies,
                    attributes: ['id','poster_url','trailer_url','title'], 
                }
            ]
        })

        return showtime
    }

    validShowtime = async (movie_id, start_time, room_id, distance_minutes) => {
        const movie = await findObject(Movies, 'id', movie_id)

        let startTime = new Date(start_time)

        if(startTime - new Date() <= 0)
            throw new Error("Ngày trong quá khứ !")

        const endTime = this.addMinutes(startTime,movie.duration+distance_minutes)

        const showtime = await this.showtime.findOne({
            where: {
                room_id: room_id,
                [Op.or]: [
                    {
                        start_time: {
                            [Op.between]: [startTime, endTime]
                        }
                    },
                    {
                        end_time: {
                            [Op.between]: [startTime, endTime]
                        }
                    }
                ]
            }
        })
        return {
            showtime: showtime,
            startTime: startTime,
            endTime: endTime,
        }
    }

    getForShowtimeTable = async (id_account, date) => {
        const result = await MovieTheaterService.getTheaterForShowtime(id_account)

        let mark = new Date(date)
        let startDay = new Date(mark.getFullYear(), mark.getMonth(), mark.getDate(),0,0,0)
        let endDay = new Date(mark.getFullYear(), mark.getMonth(), mark.getDate(),23,59,59)

        const showtimes = await this.showtime.findAll({
            attributes: ['id','start_time','end_time','room_id','price'],
            where: {
                [Op.and]: [
                    {
                        start_time: {
                            [Op.gte]: startDay
                        }
                    },
                    {
                        end_time: {
                            [Op.lte]: endDay
                        }
                    }
                ]
            },
            include: [
                {
                    model: Movies,
                    attributes: ['title'],
                },
                {
                    model: Tickets,
                    attributes:['ticket_id','booking_id']
                }
            ]
        })

        // khởi tạo prop showtime cho mỗi phần  tử của phòng chiếu (.showtimes)
        for(let i of result){
            i.showtimes = []
        }

        for(let i of showtimes){
            for(let j of result){
                if(j.showtimes && j.room_id == i.room_id){
                    j.showtimes.push({
                        id: i.id,
                        startTime: i.start_time,
                        endTime: i.end_time,
                        name: i.Movie.title,
                        sold: i.Tickets.filter(item => item.booking_id != null).length
                    })
                    break
                }
            }
        }

        return result
    }

    deleteShowtime = async (idShowtime) => {
        return this.showtime.destroy({
            where: {id: idShowtime}
        })
    }   

    // dành cho bán vé tại quầy
    getForStaffTicket = async (id_account) => {
        const result = await MovieTheaterService.getTheaterForShowtime(id_account)

        let mark = new Date()
        let startDay = new Date(mark.getFullYear(), mark.getMonth(), mark.getDate(),0,0,0)
        let endDay = new Date(mark.getFullYear(), mark.getMonth(), mark.getDate(),23,59,59)

        const showtime = await Movies.findAll({
            attributes: ['id','title','poster_url','duration'],
            include: [
               {
                    model: Showtimes,
                    attributes: ['id','start_time','end_time','room_id','price'],
                    where: {
                        [Op.and]: [
                            {
                                start_time: {
                                    [Op.gte]: startDay
                                }
                            },
                            {
                                end_time: {
                                    [Op.lte]: endDay
                                }
                            }
                        ]
                    }
                },
                {
                    model: Categories,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]   
        })
        return showtime
    }

    // lấy danh sách các ghế và trạng thái đặt trong phòng chiếu
    // dùng cho staff, user
    getListChairOfShowtime = async  (idShowtime) => {
        const showtime = await findObject(this.showtime, 'id', idShowtime)
        const theater = await findObject(MovieTheater, 'id', showtime.room_id)

        let tickets = await Tickets.findAll({
            where: {showtime_id: showtime.id},
            attributes: ['booking_id','seat_id']
        })

        let seats = await Seats.findAll({
            attributes: ['id','seat_number','type'],
            where: {room_id: showtime.room_id}
        })

        seats = seats.sort( (a,b) => a.id - b.id)
        tickets = tickets.sort( (a,b) => a.seat_id - b.seat_id)

        let length = seats.length

        let result = []

        for(let i = 0; i < length; i++){
            result.push({
                id: seats[i].id,
                seat_number: seats[i].seat_number,
                status: tickets[i].booking_id == null ? 'empty' : 'booked',
                type: seats[i].type
            })
        }

        return {
            room_id: theater.dataValues.id,
            name_theater: theater.dataValues.name,
            count: theater.dataValues.count_per_row,
            list: result
        }
    }
}

export default new ShowtimeService(Showtimes)