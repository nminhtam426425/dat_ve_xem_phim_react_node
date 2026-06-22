import { sequelize,DataTypes } from "../index.js";

const Notifications = sequelize.define(
    'Notifications',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: DataTypes.STRING(36),
        title: DataTypes.STRING(255),
        message: DataTypes.TEXT,
        is_read: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE
    }, 
    {
        tableName: "notifications",
        timestamps: false,
    },
)

export default Notifications