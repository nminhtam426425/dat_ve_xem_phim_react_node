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
            attributes: ['id','name']
        })
    }

    create = async ({}) => {
        try{
           
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    update = async ({}) => {
        try{
          
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    delete = async (id) => {
        try{
            
        }
        catch(err){
            throw new Error(err.message)
        }
    }
}

export default new CategoryService()