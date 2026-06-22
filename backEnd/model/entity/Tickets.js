import { sequelize,DataTypes } from "../index.js";

const Tickets = sequelize.define(
    'Tickets',
    {
        ticket_id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        seat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        booking_id: DataTypes.STRING(36),
        showtime_id: DataTypes.STRING(36),
        is_scanned: DataTypes.BOOLEAN,
        scanned_at: DataTypes.DATE
    }, 
    {
        tableName: "tickets",
        timestamps: false,
    },
)

export default Tickets