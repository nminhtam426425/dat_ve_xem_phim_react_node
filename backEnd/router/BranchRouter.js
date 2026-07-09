import { BranchController } from '../controller/index.js'
import {authenticate, authorize} from '../authen/authen.js' 
import express from 'express'

const routerBranch = express.Router()

routerBranch.get('/all',authenticate, authorize(['admin']),BranchController.getAll)
routerBranch.post('/',authenticate, authorize(['admin']),BranchController.create)
routerBranch.get('/staff/:branchId',authenticate, authorize(['admin']),BranchController.getStaffInBranch)
routerBranch.post('/room',authenticate, authorize(['admin']),BranchController.createRoom)
routerBranch.put('/room',authenticate, authorize(['admin']),BranchController.updateRoom)
routerBranch.get('/infoBranch',authenticate, authorize(['admin','staff']), BranchController.getInfoBranch)
routerBranch.get('/theaters',authenticate, authorize(['admin','staff']), BranchController.getAllRoomOnBranch)
routerBranch.delete('/theaters/:theater_id',authenticate, authorize(['admin']), BranchController.delete)
routerBranch.get('/chairs/:theater_id',authenticate, authorize(['admin','staff','user']), BranchController.getChairOfBranch)
routerBranch.get('/type/theater', BranchController.getAllTypeTheater)

routerBranch.get('/',BranchController.getInfomationAboutCinema)
routerBranch.put('/',authenticate, authorize(['admin']),BranchController.updateInfoBranch)

routerBranch.post('/type/theater',authenticate, authorize(['admin']),BranchController.createTypeTheater)
routerBranch.put('/type/theater',authenticate, authorize(['admin']),BranchController.updateTypeTheater)
routerBranch.delete('/type/theater/:id_theater',authenticate, authorize(['admin']),BranchController.deleteTypeTheater)

export default routerBranch