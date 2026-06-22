import { VoucherController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js'
import express from 'express'

const routerVoucher = express.Router()

routerVoucher.get('/all',authenticate,authorize(['admin']),VoucherController.getAll)
routerVoucher.post('/',VoucherController.create)
routerVoucher.put('/usage',VoucherController.useVoucher)
routerVoucher.delete('/:idVoucher',authenticate,authorize(['admin']),VoucherController.delete)
routerVoucher.put('/',authenticate,authorize(['admin']),VoucherController.updateVoucher)

export default routerVoucher