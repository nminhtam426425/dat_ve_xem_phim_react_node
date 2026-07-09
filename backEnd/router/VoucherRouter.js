import { VoucherController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js'
import express from 'express'

const routerVoucher = express.Router()

routerVoucher.get('/all',authenticate,authorize(['admin']),VoucherController.getAll)
routerVoucher.get('/user',authenticate,authorize(['user','admin','staff']),VoucherController.getAllForUser)
routerVoucher.get('/user/exchange',authenticate,authorize(['user','admin']),VoucherController.getVoucherForPointExchange)
routerVoucher.post('/user/exchange',authenticate,authorize(['user','admin']),VoucherController.pointExchange)
routerVoucher.get('/private',authenticate,authorize(['user','admin']),VoucherController.getVoucherPrivate)
routerVoucher.put('/usage',authenticate,authorize(['user','amdin']),VoucherController.useVoucher)

routerVoucher.post('/',authenticate,authorize(['admin']),VoucherController.create)
routerVoucher.delete('/:idVoucher',authenticate,authorize(['admin']),VoucherController.delete)
routerVoucher.put('/',authenticate,authorize(['admin']),VoucherController.updateVoucher)

export default routerVoucher