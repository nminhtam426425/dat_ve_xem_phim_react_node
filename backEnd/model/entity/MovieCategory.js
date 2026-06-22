import { sequelize,DataTypes } from "../index.js";

const MovieCategory = sequelize.define(
    'MovieCategory',
    {
        movie_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        category_id: DataTypes.INTEGER
    }, 
    {
        tableName: "movie_category",
        timestamps: false,
    },
)

export default MovieCategory