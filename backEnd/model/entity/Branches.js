import { sequelize,DataTypes } from "../index.js";

const Branches = sequelize.define(
    'Branches',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(255),
        address: DataTypes.STRING(255),
        is_activating: DataTypes.INTEGER,
        map_url: DataTypes.TEXT
    }, 
    {
        tableName: "branches",
        timestamps: false,
    },
)

export default Branches