import {Branches, BranchStaff, User} from "../model/index.js";
import { findObject } from "./validate.js";
class BranchService {
    constructor(branch) {
        this.branch = branch;
    }

    getAll = async () => {
        return await this.branch.findAll()
    }

    create = async ({name,address,phone}) => {
        try{
            return await Branches.create({
                name,
                address,
                phone
            })
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    getStaffInBranch = async (branchId) => {
        try{
            let users =  await User.findAll({
                where: {role: 'user'}
            })
            let staffs = await User.findAll({
                where: { role: 'staff' },
                include: [{
                  model: Branches,
                  attributes: [],
                  where: { id: branchId }, 
                  through: { attributes: [] }  
                }]
            })
            return [...staffs, ...users]
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    getInfoBranch = async (user_id) => {
        if(!user_id)
            throw new Error("Lấy thông tin thất bại [Error_Code: 23102006]!")
        const user = await findObject(BranchStaff, 'user_id', user_id)
        try {
           return await this.branch.findOne({
                attributes: ['id','name'],
                where: {id: user.branch_id}
                
           })
        } 
        catch(err){
            throw new Error(err.message)
        }
    }
}

export default new BranchService(Branches)