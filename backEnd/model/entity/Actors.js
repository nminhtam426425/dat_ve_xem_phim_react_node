import { sequelize,DataTypes } from "../index.js";

const Actors = sequelize.define(
    'Actors',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name:DataTypes.STRING(100),
        role: DataTypes.ENUM('actor','director')
    }, 
    {
        tableName: "actor",
        timestamps: false,
    },
)

export default Actors