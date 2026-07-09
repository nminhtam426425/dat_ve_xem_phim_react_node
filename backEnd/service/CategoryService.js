import { Categories, MovieCategory } from "../model/index.js";
import {convertObjectForUpdate, findObject} from "./validate.js"

class CategoryService {

    getCategoriesOfMovie = async (idMovie) => {
        return await MovieCategory.findAll({
            where: {movie_id: idMovie},
            attributes: [],
            include:[
                {
                    model: Categories,
                    attributes:['id','name']
                }
            ]
        })
    }

    getAll = async () => {
        return await Categories.findAll({
            attributes: ['id','name','age_permit']
        })
    }

    create = async ({name, age_permit}) => {
        try{
            return Categories.create({
                name,
                age_permit
            })
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    update = async ({id, name, age_permit}) => {
        try{
            let cateUpdate = await findObject(Categories, 'id', id)

            let sourceObj = {name, age_permit}
            cateUpdate = convertObjectForUpdate(cateUpdate,sourceObj)

            return await cateUpdate.save()
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    delete = async (id) => {
        try{
            return await Categories.destroy({
                where: {
                    id: id
                }
            })
        }
        catch(err){
            throw new Error(err.message)
        }
    }
}

export default new CategoryService()