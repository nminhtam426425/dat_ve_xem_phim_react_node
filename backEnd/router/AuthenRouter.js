import { AuthenController } from '../controller/index.js'
import express from 'express'

const routerAuthen = express.Router()

routerAuthen.post('/login',AuthenController.login)
routerAuthen.post('/refreshToken',AuthenController.refreshToken)
routerAuthen.post('/logout',AuthenController.logout)

export default routerAuthen