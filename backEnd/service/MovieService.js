import { Movies, MovieCategory, Categories } from "../model/index.js";
import {convertObjectForUpdate, findObject} from "./validate.js"
import {cloudinary} from '../authen/config.js'

class MovieService {
    constructor(movie) {
        this.movie = movie;
    }

    getAll = async () => {
        let result =  await this.movie.findAll({
            attributes: ['id', 'title','description','duration','release_date','poster_url','pub_id_poster','director','actor','trailer_url','status'],
            include:[
                {
                    model: Categories,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
        return result
    }

    getAllForShowtime = async () => {
        let result =  await this.movie.findAll({
            attributes: ['id', 'title','duration','poster_url','status']
        })
        return result.filter(item => item.satus != 'ended')
    }

    validMovieInfo = (release_date) => {
        if(!release_date)
            release_date = new Date()

        else{
            if((new Date(release_date) - new Date() < 0))
                throw new Error("Ngày không hợp lệ !")
        }
    }

    // hàm nhận một mảng các id của category và id phim 
    createCategories = async (categories, movie_id) => {
        // tạo danh sách phim-thể loại
        const categotyOfmovie = categories.map( item => {
            return {
                movie_id: movie_id,
                category_id: item
            }
        })
        await MovieCategory.bulkCreate(categotyOfmovie)
    }

    // lấy thể loại phim dưới định dạng của front-end
    getCategoryOfMovie = async (id) => {
        return await this.movie.findOne({
            where: {id: id},
            attributes: [],
            include:[
                {
                    model: Categories,
                    attributes:['id','name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
    }

    create = async ({ title,description,duration,release_date,poster_url,pub_id_poster,trailer_url,director,actor,status, categories}) => {
        try{
            if(!title || !duration)
                throw new Error("Thiếu dữ liệu đầu vào !")
            this.validMovieInfo(release_date)
            
            const result =  await this.movie.create({
                title,
                description,
                duration,
                release_date,
                poster_url,
                pub_id_poster,
                director,
                actor,
                trailer_url,
                status
            })

           await this.createCategories(categories, result.id)
           
            // lấy dữ liệu thể loại sau khi tạo phim 
            
            const movieCategories = await this.getCategoryOfMovie(result.id)

            // custome dữ liệu trả về dạng chuẩn cho front-end render
            return {
                ...result.dataValues,
                Categories: movieCategories?.Categories || []
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }
    
    update = async ({id,title,description,duration,release_date,poster_url,pub_id_poster,trailer_url,director,actor,status,categories}) => {
        try{
            let movieUpdate = await findObject(this.movie, 'id', id)

            // dựa vào key để xem prop nào được truyền vào từ FE
            // nếu props nào undefined hoặc null thì bỏ qua trong hàm
            let sourceObj = {title,description,duration,release_date,poster_url,pub_id_poster,director,actor,trailer_url,status}
            movieUpdate = convertObjectForUpdate(movieUpdate, sourceObj)
            await movieUpdate.save()

            // update categories
            // xóa, sau đó thêm mới
            await MovieCategory.destroy({
                where: {movie_id: id}
            })
            await this.createCategories(categories, id)

            const movieCategories = await this.getCategoryOfMovie(id)

            return {
                ...movieUpdate.dataValues,
                Categories: movieCategories?.Categories || []
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    delete = async (id) => {
        try{
            const movieDelete = await findObject(this.movie, 'id', id)
            if(movieDelete.pub_id_poster != "")
                await this.deletePosterOnCloud({pub_id_poster: movieDelete.pub_id_poster})
            return await movieDelete.destroy()
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    deletePosterOnCloud = async ({pub_id_poster}) => {
        try{
            if (pub_id_poster) {
                const cloudinaryResponse = await cloudinary.uploader.destroy(pub_id_poster)
                
                if (cloudinaryResponse.result !== 'ok') 
                    console.warn("Lưu ý: Ảnh chưa được xóa trên Cloudinary hoặc public_id không tồn tại.")
            }
        }
        catch(err){
            throw new Error(err.message)
        }
        return {message: `Đã xóa ảnh ${pub_id_poster}}`}
    }
}

export default new MovieService(Movies)