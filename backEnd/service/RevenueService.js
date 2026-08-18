import { Bookings, sequelize, User } from "../model/index.js"
import MovieService from "./MovieService.js"
import { Op } from "sequelize"

class RevenueService {

    // lấy dũ liệu doanh thu theo tuần
    // tính toán các ngày trong tuần
    // trả về dữ liệu dạng []
    getRevenueWeek = async ({startMark, endMark}) => {
        let dataLabelRevenue = this.createArrMonToSun(startMark)
        let revenueWeek = await this.getRevenueFromStartToEndMark(startMark, endMark)

        let startMarkBefore = new Date(startMark)
        startMarkBefore.setDate(startMarkBefore.getDate() - 7)

        let endMarkBefore = new Date(endMark)
        endMarkBefore.setDate(endMarkBefore.getDate() - 7)
        let revenueWeekBefore = await this.getRevenueFromStartToEndMark(startMarkBefore, endMarkBefore)
        
        // tính toán giá trị tuần trước --> % trên FE
        let totalRevueWeekbefore = revenueWeekBefore.reduce( (pre, cur)=>pre+=parseInt(cur.revenue),0)

        let tickets = await Bookings.findAll({
            attributes: ['id','price_at_booking']
        })

        let arrayContainValue = [0,0,0,0,0,0,0]

        for(let i of revenueWeek){
            let id = i.booking_date.substr(0,10)
            for(let j = 0; j < 7; j++){
                if(dataLabelRevenue[j] == id){
                    arrayContainValue[j] = parseInt(i.revenue)
                    break
                }
            }
        }

        let revenueMovie = await MovieService.getDataRevenue()
        let users = await User.findAll({
            attributes: ['id','created_at','role'],
            where: {
                role: 'user'
            }
        })

        return {
            dataRevenue: arrayContainValue,
            movies: [
                ...revenueMovie
            ],
            tickets: tickets,
            totalRevueWeekbefore,
            users
        }
    }

    createArrMonToSun = (startMark) => {
        let dataRevenue = []
        for (let i = 0; i < 7; i++) {
            let current = new Date(startMark) 
            current.setDate(current.getDate() + i)

            dataRevenue.push(current.toISOString("vi-VN").substring(0,10))
        }
        return dataRevenue
    } 

    getRevenueFromStartToEndMark = async (startMark, endMark) => {
        return  await Bookings.findAll({
            attributes: [
                'booking_date',
                [sequelize.fn('SUM', sequelize.col('price_at_booking')), 'revenue']
            ],
            where: {
                booking_date: {
                    [Op.between]: [new Date(startMark), new Date(endMark)]
                },
                payment_status: 'paid'
            },
            group: [sequelize.fn('DATE', sequelize.col('booking_date'))],
            raw: true
        })
    }
}

export default new RevenueService