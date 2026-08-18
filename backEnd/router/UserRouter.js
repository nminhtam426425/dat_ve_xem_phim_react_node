import { UserController } from '../controller/index.js'
import {authorize, authenticate} from '../authen/authen.js'
import express from 'express'

const routerUser = express.Router()

routerUser.get('/dataCal',authenticate,authorize(['admin']),UserController.calcPercent)
routerUser.get('/all',authenticate,authorize(['admin','staff']),UserController.getAll)
routerUser.get('/all-staff',authenticate,authorize(['admin','staff']),UserController.getAllForStaff)
routerUser.get('/',authenticate,authorize(['admin','staff','user']),UserController.info)
routerUser.put('/activate',authenticate,authorize(['admin']),UserController.activateAccount)
routerUser.post('/',UserController.create)
routerUser.post('/create-by-staff',authenticate,authorize(['staff']),UserController.createByStaff)
routerUser.put('/',authenticate,authorize(['admin','staff','user']),UserController.update)
routerUser.put('/avatar',authenticate,authorize(['admin','staff','user']),UserController.updateAvatar)
routerUser.delete('/',authenticate,authorize(['admin']),UserController.delete)
routerUser.post('/staff',authenticate,authorize(['admin']),UserController.createStaff)
routerUser.get('/spending',authenticate,authorize(['user']),UserController.getSpendingPrivate)
routerUser.post('/change-password',authenticate,authorize(['user','staff','admin']),UserController.changePassword)
routerUser.post('/forget-password',UserController.forgetPass)
routerUser.post('/confirm-code',UserController.confirmCode)
routerUser.post('/confirm-password',UserController.changePasswordForForget)

// dành cho việc đăng ký và tạo mã khi loadform
routerUser.get('/create-code',UserController.createCode)


export default routerUser