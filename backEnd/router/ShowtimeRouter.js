import { ShowtimeController } from '../controller/index.js'
import { authenticate,authorize } from '../authen/authen.js'
import express from 'express'

const showtimeRouter = express.Router()

showtimeRouter.get('/all',ShowtimeController.getAll)
showtimeRouter.post('/movies/cates',ShowtimeController.getShowtimeByCates)
showtimeRouter.post('/',authenticate,authorize(["admin"]),ShowtimeController.create)
showtimeRouter.delete('/:idShowtime',authenticate,authorize(["admin"]),ShowtimeController.delete)
showtimeRouter.get('/movie/:id',ShowtimeController.findShowtimeByMovieId)
showtimeRouter.put('/',ShowtimeController.update)
showtimeRouter.get('/date/:date',authenticate,authorize(["admin","staff"]),ShowtimeController.getShowtimeByDate)
showtimeRouter.get('/staff',authenticate,authorize(["admin","staff"]),ShowtimeController.getShowtimeForStaff)
showtimeRouter.get('/seats/:id_showtime',authenticate,authorize(["admin","staff","user"]),ShowtimeController.getListChairOfShowtime)

//chỉ dùng phía user (dùng cho chưa đăng nhập, Không cần tài khoản)
showtimeRouter.get('/seats/non-login/:id_showtime',ShowtimeController.getListChairOfShowtime)
showtimeRouter.get('/user',ShowtimeController.getListShowtimeForHome)
showtimeRouter.get('/user/:id_movie/:date',ShowtimeController.getShowtimeByMovie)


export default showtimeRouter