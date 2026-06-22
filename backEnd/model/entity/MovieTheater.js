import { sequelize,DataTypes } from "../index.js";

const MovieTheater = sequelize.define(
    'MovieTheater',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(255),
        branch_id: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        type_id: DataTypes.INTEGER,
        count_per_row: DataTypes.INTEGER,
        countStandard: DataTypes.INTEGER,
        countVIP: DataTypes.INTEGER,
        countSweetbox: DataTypes.INTEGER
    }, 
    {
        tableName: "movie_theaters",
        timestamps: false,
    },
)

export default MovieTheater