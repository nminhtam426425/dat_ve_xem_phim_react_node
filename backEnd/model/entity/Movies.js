import { sequelize,DataTypes } from "../index.js";

const Movies = sequelize.define(
    'Movies',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:DataTypes.STRING(100),
        description: DataTypes.INTEGER,
        duration: DataTypes.INTEGER,
        release_date: DataTypes.DATE,
        poster_url: DataTypes.TEXT,
        pub_id_poster: DataTypes.TEXT,
        director: DataTypes.TEXT,
        actor: DataTypes.TEXT,
        trailer_url: DataTypes.TEXT,
        status: DataTypes.ENUM('showing', 'coming_soon', 'ended')
    }, 
    {
        tableName: "movies",
        timestamps: false,
    },
)

export default Movies