import { MovieController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js'
import express from 'express'

const routerMovie = express.Router()

routerMovie.get('/all',authenticate,authorize(['admin']),MovieController.getAll)
routerMovie.get('/showtime',authenticate,authorize(['admin','staff','user']),MovieController.getForShowtime)
routerMovie.post('/',authenticate,authorize(['admin']),MovieController.create)
routerMovie.put('/',authenticate,authorize(['admin']),MovieController.update)
routerMovie.delete('/:id',authenticate,authorize(['admin']),MovieController.delete)
routerMovie.post('/delete/poster',authenticate,authorize(['admin']),MovieController.deletePoster)

export default routerMovie