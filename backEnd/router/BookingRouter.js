import { BookingController } from '../controller/index.js'
import { authenticate, authorize} from "../authen/authen.js"
import express from 'express'

const routerBooking = express.Router()

routerBooking.post('/',authenticate,authorize(['user','non-user','staff']),BookingController.bookingTicket)

export default routerBooking