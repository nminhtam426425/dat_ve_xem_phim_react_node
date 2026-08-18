import { PaymentController } from '../controller/index.js'
import {authenticate, authorize} from "../authen/authen.js"
import express from 'express'

const routerPayment = express.Router()

routerPayment.post('/vnpay/create-payment',authenticate,authorize(['user']), PaymentController.payment)
routerPayment.get('/vnpay/verify-payment', PaymentController.verity)
routerPayment.get('/vnpay/verify-ipn',authenticate,authorize(['user']), (req, res) =>{})


export default routerPayment