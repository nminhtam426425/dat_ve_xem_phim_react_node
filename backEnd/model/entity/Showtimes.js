import { sequelize,DataTypes } from "../index.js";

const Showtimes = sequelize.define(
    'Showtimes',
    {
        id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        movie_id: DataTypes.INTEGER,
        room_id: DataTypes.INTEGER,
        start_time: DataTypes.DATE,
        end_time: DataTypes.DATE,
        price: DataTypes.DOUBLE,
        max_tickets: DataTypes.INTEGER,
        limited_number_of_minutes: DataTypes.INTEGER,
        point: DataTypes.INTEGER
    }, 
    {
        tableName: "showtimes",
        timestamps: false,
    },
)

export default Showtimes