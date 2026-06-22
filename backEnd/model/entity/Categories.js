import { sequelize,DataTypes } from "../index.js";

const Categories = sequelize.define(
    'Categories',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name:DataTypes.STRING(100),
        age_permit: DataTypes.INTEGER
    }, 
    {
        tableName: "categories",
        timestamps: false,
    },
)

export default Categories