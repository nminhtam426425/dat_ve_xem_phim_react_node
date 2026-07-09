import { sequelize,DataTypes } from "../index.js";

const Tickets = sequelize.define(
    'Tickets',
    {
        showtime_id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        seat_number: {
            type: DataTypes.STRING(10),
            primaryKey: true,
        },
        ticket_id: DataTypes.STRING(36),
        booking_id: DataTypes.STRING(36),
        is_scanned: DataTypes.BOOLEAN,
        scanned_at: DataTypes.DATE,
        expired_at: DataTypes.DATE,
        status: DataTypes.STRING(10)
    }, 
    {
        tableName: "tickets",
        timestamps: false,
    },
)

export default Tickets