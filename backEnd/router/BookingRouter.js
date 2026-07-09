import { BookingController } from '../controller/index.js'
import { authenticate, authorize} from "../authen/authen.js"
import express from 'express'

const routerBooking = express.Router()

routerBooking.post('/',authenticate,authorize(['user','staff']),BookingController.bookingTicket)
routerBooking.post('/unbook',authenticate,authorize(['user','staff']),BookingController.unBooking)
routerBooking.post('/non-login',BookingController.bookingTicketNonLogin)
routerBooking.post('/non-login/unbook',BookingController.unBookingUserNonLogin)
routerBooking.post('/delete',BookingController.deleteTicketExpired)
routerBooking.post('/payment',authenticate,authorize(['user','staff']),BookingController.paymentSuccess)
routerBooking.get('/history',authenticate,authorize(['user']),BookingController.historyOfUser)
routerBooking.get('/check/:id_ticket',authenticate,authorize(['staff']),BookingController.checkTicket)

// doanh thu
routerBooking.post('/revenue-weeks',authenticate,authorize(['admin']),BookingController.getRevenueWeek)

export default routerBooking