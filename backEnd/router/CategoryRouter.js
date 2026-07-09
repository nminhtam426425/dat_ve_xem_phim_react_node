import { CategoryController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js'
import express from 'express'

const routerCategory = express.Router()

routerCategory.get('/all',CategoryController.getAll)
routerCategory.post('/',authenticate,authorize(['admin']),CategoryController.create)
routerCategory.put('/',authenticate,authorize(['admin']),CategoryController.update)
routerCategory.delete('/:id_cate',authenticate,authorize(['admin']),CategoryController.delete)

export default routerCategory