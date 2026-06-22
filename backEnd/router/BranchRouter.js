import { BranchController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js' 
import express from 'express'

const routerBranch = express.Router()

routerBranch.get('/all',authenticate, authorize(['admin']),BranchController.getAll)
routerBranch.post('/',authenticate, authorize(['admin']),BranchController.create)
routerBranch.get('/staff/:branchId',authenticate, authorize(['admin']),BranchController.getStaffInBranch)
routerBranch.post('/room',authenticate, authorize(['admin']),BranchController.createRoom)
routerBranch.get('/infoBranch',authenticate, authorize(['admin','staff']), BranchController.getInfoBranch)
routerBranch.get('/theaters',authenticate, authorize(['admin','staff']), BranchController.getAllRoomOnBranch)
routerBranch.delete('/theaters/:theater_id',authenticate, authorize(['admin']), BranchController.delete)
routerBranch.get('/chairs/:theater_id',authenticate, authorize(['admin','staff','user']), BranchController.getChairOfBranch)
routerBranch.get('/type/theater', BranchController.getAllTypeTheater)

export default routerBranch