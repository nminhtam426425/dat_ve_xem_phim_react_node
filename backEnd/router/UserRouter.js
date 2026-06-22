import { UserController } from '../controller/index.js'
import {authorize, authenticate} from '../authen/authen.js'
import express from 'express'

const routerUser = express.Router()

routerUser.get('/all',authenticate,authorize(['admin', 'superadmin']),UserController.getAll)
routerUser.get('/',authenticate,authorize(['admin', 'superadmin','staff','user']),UserController.info)
routerUser.post('/',UserController.create)
routerUser.put('/',UserController.update)
routerUser.delete('/',UserController.delete)
routerUser.post('/staff',UserController.createStaff)

export default routerUser