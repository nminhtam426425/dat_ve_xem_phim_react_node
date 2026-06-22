import { sequelize,DataTypes } from "../index.js";

const User = sequelize.define(
    'User',
    {
        id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        fullname:DataTypes.STRING(100),
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true,
            }
        },
        username: {
            type:DataTypes.STRING(100),
            unique: true
        },
        password:DataTypes.TEXT,
        phone: DataTypes.STRING(10),
        avatar: DataTypes.TEXT,
        role: DataTypes.ENUM('user', 'staff', 'admin', 'super_admin'),
        reward_points: DataTypes.INTEGER,
        is_activating: DataTypes.INTEGER,
        created_at: DataTypes.DATE
    }, 
    {
        tableName: "users",
        timestamps: false,
    },
)

export default User