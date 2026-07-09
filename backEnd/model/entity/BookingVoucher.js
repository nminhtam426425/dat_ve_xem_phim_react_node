import { sequelize,DataTypes } from "../index.js";

const BookingVoucher = sequelize.define(
    'BookingVoucher',
    {
        booking_id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        voucher_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, 
    {
        tableName: "booking_voucher",
        timestamps: false,
    },
)

export default BookingVoucher