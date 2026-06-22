import { sequelize,DataTypes } from "../index.js";

const Seats = sequelize.define(
    'Seats',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: DataTypes.INTEGER,
        seat_number: DataTypes.STRING(10),
        type: DataTypes.STRING(10)
    }, 
    {
        tableName: "seats",
        timestamps: false,
    },
)

export default Seats