import { Bookings, Tickets, User, Showtimes, VoucherOfUser, BookingVoucher, Vouchers } from "../model/index.js"
import TicketService from "./TicketService.js"
import crypto from "crypto"
import qs from "qs"
import { findObject } from "./validate.js"
import { Op } from "sequelize"

class PaymentService {

    formatDateToVnPay = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
    
        return `${year}${month}${day}${hours}${minutes}${seconds}`
    }

    // vnp_BankCode=VNPAYQR - Thanh toán quét mã QR
    // vnp_BankCode=VNBANK - Thẻ ATM - Tài khoản ngân hàng nội địa
    // vnp_BankCode=INTCARD - Thẻ thanh toán quốc tế
    createOrder = async (idUser,ipAddress,{showtime_id,price_at_booking,role,userEarnPoint=null,useVoucher}) => {
        try {
            const order = await TicketService.paymentSuccess(idUser,showtime_id,price_at_booking,role,userEarnPoint,useVoucher)

            if (!order || !price_at_booking) 
                throw new Error("Thiếu trường dữ liệu !")
            
            let today = new Date()
            let expired = new Date(today.getTime() +  5 *60 * 1000)

            today = this.formatDateToVnPay(today)
            expired = this.formatDateToVnPay(expired)

            // chuyển từ localost IPV6 -> IPV4
            if (ipAddress === '::1') 
                ipAddress = '127.0.0.1'

            let tmnCode = process.env.VNPAY_CODE
            let secureSecret = process.env.VNPAY_SECRET
            let vnpUrl = process.env.VNPAY_URL
            let returnUrl = process.env.FE
            let bankCode = null

            let vnp_Params = {}

            vnp_Params['vnp_Version'] = '2.1.0'
            vnp_Params['vnp_Command'] = 'pay'
            vnp_Params['vnp_TmnCode'] = tmnCode
            vnp_Params['vnp_Locale'] = 'vn'
            vnp_Params['vnp_CurrCode'] = 'vnd'
            vnp_Params['vnp_TxnRef'] = order.id
            vnp_Params['vnp_OrderInfo'] = `Thanh toan dat ve. Don hang ${order.id}`
            vnp_Params['vnp_OrderType'] = 'other'
            vnp_Params['vnp_Amount'] = Number(price_at_booking) * 100
            vnp_Params['vnp_ReturnUrl'] = `${returnUrl}/vnpay-return`
            vnp_Params['vnp_IpAddr'] = ipAddress
            vnp_Params['vnp_CreateDate'] = today
            vnp_Params['vnp_ExpireDate'] = expired

            if(bankCode !== null && bankCode !== ''){
                vnp_Params['vnp_BankCode'] = 'VNBANK'
            }
        
            vnp_Params = this.sortObject(vnp_Params)
        
            let signData = qs.stringify(vnp_Params, { encode: false })
            let hmac = crypto.createHmac("sha512", secureSecret)
            let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex")

            vnp_Params['vnp_SecureHash'] = signed

            vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false })

            return {paymentUrl: vnpUrl}

        } catch (error) {
            console.error('Verify payment error:', error.message)
            throw new Error(error.message)
        }
    }
        
    verifyOrder = async (verifyQuery) => {
        try {
            const vnp_Params = this.sortObject(verifyQuery)

            var secureHash = vnp_Params['vnp_SecureHash']
            delete vnp_Params['vnp_SecureHash']
            delete vnp_Params['vnp_SecureHashType']
            let secretKey = process.env.VNPAY_SECRET
        
            var signData = qs.stringify(vnp_Params, { encode: false })
            var hmac = crypto.createHmac("sha512", secretKey)
            let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex") 
        
        
            if(secureHash === signed){
                //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
                const orderId = vnp_Params['vnp_TxnRef']
                const responseCode = vnp_Params['vnp_ResponseCode']

                let booking = await findObject(Bookings, 'id', orderId)
                let user = await findObject(User, 'id', booking.user_id)
                let showtime = await findObject(Showtimes, 'id', booking.showtime_id)

                if (responseCode === '00') {
                    await Tickets.update(
                        {
                            status: 'paid',
                            expired_at: null
                        },
                        {
                            where: {
                                booking_id: orderId
                            }
                        }
                    )
                    await Bookings.update(
                        {
                            payment_status: 'paid',
                            booking_at: new Date()
                        },
                        {
                            where: {
                                id: orderId
                            }
                        }
                    )

                    let tickets = await Tickets.findAll({
                        where: {
                            showtime_id: booking.showtime_id,
                            booking_id: orderId
                        }
                    })
                    let point = showtime.point*tickets.length + user.reward_points
                    await user.update({
                        reward_points: point
                    })

                    return { success: true, message: 'Thanh toán thành công', orderId }
                } 
                else {
                    let idVoucher = await BookingVoucher.findAll({
                        attributes: ['voucher_id'],
                        where: {
                            booking_id: orderId
                        }
                    })
                    await VoucherOfUser.update(
                        {
                            is_use: 0
                        },
                        {
                            where:{
                                user_id: booking.user_id,
                                voucher_id : {
                                    [Op.in]: idVoucher.map(item => item.voucher_id)
                                }
                            }
                        }
                    )
                    await BookingVoucher.destroy({
                        where: {
                            booking_id: orderId
                        }
                    })
                    await Bookings.destroy({
                        where:{
                            id: orderId
                        }
                    })
                    await Tickets.destroy({
                        where:{
                            booking_id: orderId
                        }
                    })
                    
                    return { success: false, message: `Thanh toán thất bại với mã lỗi: ${responseCode}` }
                }
            } 
            else
                return { success: false, message: `Thanh toán thất bại với mã lỗi: 97` }
            
        } catch (error) {
            console.error('Verify payment error:', error.message)
            throw new Error(error.message)
        }
    }
    
    // Ví dụ sắp xếp tham số trước khi ký
    sortObject = (obj) => {
        let sorted = {}
        // Object.keys(obj) lấy thẳng các key hợp lệ và chúng ta dùng hàm .sort() của mảng luôn
        let keys = Object.keys(obj).sort()
        
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+")
        }
        return sorted
    }
}

export default new PaymentService()