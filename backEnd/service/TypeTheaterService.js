import {TypeTheater, Branches, BranchStaff} from '../model/index.js'
import { findObject, convertObjectForUpdate } from './validate.js'

class TypeTheaterService {
    create = async ({type_name, description}) => {
        return await TypeTheater.create({
            type_name,
            description
        })
    }

    update = async ({id, type_name, description}) => {
        let objUpdate = await findObject(TypeTheater, 'id', id)
        let sourceObj = {type_name, description}

        objUpdate = convertObjectForUpdate(objUpdate, sourceObj)

        return await objUpdate.save()
    }

    delete = async (id) => {
        return await TypeTheater.destroy({
            where: {
                id
            }
        })
    }

    updateInfoBranch = async ({id, name, address, map_url}) => {
        
        console.log(name, address)
        let objUpdate = await findObject(Branches, 'id', id)
        let sourceObj = {name, address, map_url}
        console.log(name, address)

        objUpdate = convertObjectForUpdate(objUpdate, sourceObj)

        return await objUpdate.save()
    }

    getInfoBranch = async () => {
        return await Branches.findAll()
    }
}

export default new TypeTheaterService()