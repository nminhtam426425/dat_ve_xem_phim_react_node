import { sequelize,DataTypes } from "../index.js";

const MovieTrending = sequelize.define(
    'MovieTrending',
    {
        movie_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        background_url: DataTypes.TEXT,
        pub_id_bg: DataTypes.TEXT,
    }, 
    {
        tableName: "movie_trending",
        timestamps: false,
    },
)

export default MovieTrending