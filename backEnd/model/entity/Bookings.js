import { sequelize,DataTypes } from "../index.js";

const Bookings = sequelize.define(
    'Bookings',
    {
        id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        user_id: DataTypes.STRING(36),
        staff_id: DataTypes.STRING(36),
        showtime_id: DataTypes.STRING(36),
        booking_date: DataTypes.DATE,
        payment_status: DataTypes.ENUM('pending', 'paid', 'cancelled'),
        price_at_booking: DataTypes.DOUBLE
    }, 
    {
        tableName: "bookings",
        timestamps: false,
    },
)

export default Bookings