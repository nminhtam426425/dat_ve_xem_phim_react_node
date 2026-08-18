import { sequelize,DataTypes,Transaction,QueryTypes } from "./connect.js"
import User from './entity/User.js'
import Branches from "./entity/Branches.js"
import BranchStaff from "./entity/BranchStaff.js"
import Vouchers from "./entity/Vouchers.js"
import VoucherOfUser from "./entity/VoucherOfUser.js"
import Showtimes from "./entity/Showtimes.js"
import Bookings from "./entity/Bookings.js"
import Tickets from "./entity/Tickets.js"
import Movies from "./entity/Movies.js"
import Categories from "./entity/Categories.js"
import MovieCategory from "./entity/MovieCategory.js"
import MovieTheater from "./entity/MovieTheater.js"
import Seats from "./entity/Seats.js"
import TypeTheater from "./entity/TypeTheater.js"
import BookingVoucher from './entity/BookingVoucher.js'
import MovieTrending from "./entity/MovieTrending.js"
import ForgetPass from "./entity/ForgotPass.js"
import ContentConver from "./entity/ContentConver.js"
import Conversations from "./entity/Conversations.js"

// bracnhes N-N users
Branches.belongsToMany(User,{through: BranchStaff, foreignKey: 'branch_id',otherKey: 'user_id'})
User.belongsToMany(Branches,{through: BranchStaff, foreignKey: 'user_id',otherKey: 'branch_id'})

// branches 1 - N rooms
Branches.hasMany(MovieTheater,{foreignKey: 'branch_id'})
MovieTheater.belongsTo(Branches, {foreignKey: 'branch_id'})

// type_theater 1 - N movie_theater
TypeTheater.hasMany(MovieTheater, {foreignKey: 'type_id'})
MovieTheater.belongsTo(TypeTheater, {foreignKey: 'type_id'})

// rooms 1- N seats
MovieTheater.hasMany(Seats,{foreignKey: 'room_id'})
Seats.belongsTo(MovieTheater,{foreignKey: 'room_id'})

// users N-N vouchers
User.belongsToMany(Vouchers,{through: VoucherOfUser, foreignKey: 'user_id',otherKey: 'voucher_id'})
Vouchers.belongsToMany(User,{through: VoucherOfUser, foreignKey: 'voucher_id',otherKey: 'user_id'})


// showtimes 1-N bookings
Showtimes.hasMany(Bookings,{foreignKey: 'showtime_id'})
Bookings.belongsTo(Showtimes,{foreignKey: 'showtime_id'})

// movies N-N categories
Movies.belongsToMany(Categories,{through: MovieCategory, foreignKey: 'movie_id',otherKey: 'category_id'})
Categories.belongsToMany(Movies,{through: MovieCategory, foreignKey: 'category_id',otherKey: 'movie_id'})

// movies 1 - N showtimes 
Movies.hasMany(Showtimes, {foreignKey: 'movie_id'})
Showtimes.belongsTo(Movies, {foreignKey: 'movie_id'})

// rooms 1 - N showtimes
MovieTheater.hasMany(Showtimes, {foreignKey: 'room_id'})
Showtimes.belongsTo(MovieTheater, {foreignKey: 'room_id'})

//users 1-N bookings (user or staff)
User.hasMany(Bookings, { foreignKey: 'user_id', as: 'CustomerBookings' })
Bookings.belongsTo(User, { foreignKey: 'user_id', as: 'Customer' })

User.hasMany(Bookings, { foreignKey: 'staff_id', as: 'StaffBookings' })
Bookings.belongsTo(User, { foreignKey: 'staff_id', as: 'Staff' })

// showtimes 1-N tickets
Showtimes.hasMany(Tickets,{foreignKey: 'showtime_id'})
Tickets.belongsTo(Showtimes,{foreignKey: 'showtime_id'})

// bookings N-N vouchers
Bookings.belongsToMany(Vouchers,{through: BookingVoucher, foreignKey: 'booking_id',otherKey: 'voucher_id'})
Vouchers.belongsToMany(Bookings,{through: BookingVoucher, foreignKey: 'voucher_id',otherKey: 'booking_id'})

// bookings 1-N tickets
Bookings.hasMany(Tickets,{foreignKey: 'booking_id'})
Tickets.belongsTo(Bookings,{foreignKey: 'booking_id'})

// movie 1 - 1 movie_trending
Movies.hasMany(MovieTrending,{foreignKey: 'movie_id'})
MovieTrending.belongsTo(Movies,{foreignKey: 'movie_id'})

// user 1 - N forgetPass
User.hasMany(ForgetPass,{foreignKey: 'user_id'})
ForgetPass.belongsTo(User,{foreignKey: 'user_id'})

User.hasMany(Conversations, { foreignKey: 'user_id', as: 'ConverUser' })
Conversations.belongsTo(User, { foreignKey: 'user_id', as: 'Customer' })

User.hasMany(Conversations, { foreignKey: 'admin_id', as: 'ConverAdmin' })
Conversations.belongsTo(User, { foreignKey: 'admin_id', as: 'Admin' })

Conversations.hasMany(ContentConver, {foreignKey: 'conver_id', as: 'Messages'})
ContentConver.belongsTo(Conversations,{foreignKey: 'conver_id', as: 'Conversations'})

export {
    sequelize,
    DataTypes,
    QueryTypes,
    Transaction,
    User,
    Branches,
    BranchStaff,
    Showtimes,
    Vouchers,
    Tickets,
    Bookings,
    VoucherOfUser,
    MovieCategory,
    Movies,
    Categories,
    MovieTheater,
    Seats,
    TypeTheater,
    MovieTrending,
    ForgetPass,
    BookingVoucher,
    ContentConver,
    Conversations
}