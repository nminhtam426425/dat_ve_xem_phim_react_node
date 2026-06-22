import { sequelize,DataTypes } from "../index.js";

const Feedbacks = sequelize.define(
    'Feedbacks',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.STRING(36),
        showtime_id: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        is_hide: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
    }, 
    {
        tableName: "feedbacks",
        timestamps: false,
    },
)

export default Feedbacks