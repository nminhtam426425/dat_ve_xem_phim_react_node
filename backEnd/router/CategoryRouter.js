import { CategoryController } from '../controller/index.js'
import express from 'express'

const routerCategory = express.Router()

routerCategory.get('/all',CategoryController.getAll)

export default routerCategory