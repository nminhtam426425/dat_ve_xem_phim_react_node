import { Movies, MovieCategory, Categories, Showtimes, Bookings, sequelize, MovieTrending, QueryTypes } from "../model/index.js"
import {convertObjectForUpdate, findObject} from "./validate.js"
import {cloudinary} from '../authen/config.js'
import { Op } from "sequelize"

class MovieService {
    constructor(movie) {
        this.movie = movie;
    }

    getAll = async () => {
        const movieInstances = await Movies.findAll({
            attributes: ['id', 'title', 'description', 'duration', 'release_date', 'poster_url', 'pub_id_poster', 'director', 'actor', 'trailer_url', 'status'],
            include: [
                {
                    model: Categories,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        })

        const movies = movieInstances.map(movie => movie.toJSON())
        const showtimeCounts = await this.getShowtime()
        const newShowtimeCounts = await this.getNewShowtime()
        const revenueData = await this.getDataRevenue()

        const countMap = {}
        showtimeCounts.forEach(item => {
            countMap[item.movie_id] = parseInt(item.total_showtimes, 10)
        })

        const newCountMap = {}
        newShowtimeCounts.forEach(item => {
            newCountMap[item.movie_id] = parseInt(item.total_showtimes, 10)
        })

        const revenueMap = {}
        revenueData.forEach(revenue => {
            revenueMap[revenue.Showtime.movie_id] = parseInt(revenue.total_revenue, 10)
        })

        const finalResult = movies.map(movie => {
            return {
                ...movie,
                showtimes_count: countMap[movie.id] || 0,
                newShowtimes_count: newCountMap[movie.id] || 0,
                total_revenue: revenueMap[movie.id] || 0
            }
        })

        return finalResult
    }

    // lấy số lượng suất chiếu
    getShowtime = async () => {
        return await Showtimes.findAll({
            attributes: [
                'movie_id',
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_showtimes']
            ],
            group: ['movie_id'],
            raw: true
        })
    }

    // lấy số lượng suất chiếu mới tính từ hôm nay
    getNewShowtime = async () => {
        return await Showtimes.findAll({
            attributes: [
                'movie_id',
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_showtimes']
            ],
            where: {
                start_time: {
                    [Op.gte]: new Date()
                }
            },
            group: ['movie_id'],
            raw: true
        })
    }

    // lấy doanh thu theo phim
    getDataRevenue = async () => {
        return await Bookings.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('Bookings.price_at_booking')), 'total_revenue']
            ],
            
            include: [{
                model: Showtimes,
                attributes: ['movie_id'],
                required: true,
                include: [
                    {
                        model: Movies,
                        attributes: ['title']
                    }
                ] 
            }],

            group: [sequelize.col('Showtime.movie_id')],
            
            raw: true,
            nest: true
        })
    }

    getAllForShowtime = async () => {
        let result =  await this.movie.findAll({
            attributes: ['id', 'title','duration','poster_url','status','director']
        })
        return result.filter(item => item.satus != 'ended')
    }

    validMovieInfo = async (release_date, pub_id_poster) => {
        if(!release_date)
            release_date = new Date()

        else{
            if((new Date(release_date) - new Date() < 0)){
                if(pub_id_poster != "")
                    await this.deletePosterOnCloud({pub_id_poster: pub_id_poster})
                throw new Error("Ngày không hợp lệ !")
            }
                
        }
    }

    // hàm nhận một mảng các id của category và id phim 
    // tạo các movie_categories tương ứng
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
            if(!title || !duration){
                if(pub_id_poster != "")
                    await this.deletePosterOnCloud({pub_id_poster: pub_id_poster})
                throw new Error("Thiếu dữ liệu đầu vào !")
            }
            await this.validMovieInfo(release_date, pub_id_poster)
            
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
            if (pub_id_poster && pub_id_poster != "") {
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

    getDetailMovie = async (idMovie) => {
        return await this.movie.findOne({
            attributes: ['id', 'title','description','duration','release_date','poster_url','director','actor','trailer_url','status'],
            where: {
                id: idMovie
            },
            include: [
                {
                    model: Categories,
                    attributes: ['id','name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        })
    }

    updateMovieTrending = async ({movie_id, background_url, pub_id_bg}) => {
        const sql = `SELECT pub_id_bg FROM movie_trending WHERE 1`

        const results = await sequelize.query(sql, {
            type: QueryTypes.SELECT 
        })
        if(results.length > 0){
            let pub_id_bg = results[0].pub_id_bg
            await this.deletePosterOnCloud({pub_id_poster: pub_id_bg})
            await MovieTrending.destroy({
                where: {
                    pub_id_bg: pub_id_bg
                }
            })
            
        }
        
        return MovieTrending.create(
            { 
                movie_id,
                background_url,
                pub_id_bg
            }
        )
    }

    // lấy movie_id để map dữ liệu tử mảnh ở FE
    // nên không cần lấy các thông số của movie 
    getMovieTrending = async () => {
        return await MovieTrending.findAll()
    }
}

export default new MovieService(Movies)