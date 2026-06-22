import { sequelize,DataTypes } from "../index.js";

const TypeTheater = sequelize.define(
    'TypeTheater',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_name: DataTypes.STRING(30),
        description: {
            type:DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {
        tableName: "type_theater",
        timestamps: false,
    },
)

export default TypeTheater