import { sequelize,DataTypes } from "../index.js";

const User = sequelize.define(
    'User',
    {
        id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        fullname:DataTypes.STRING(100),
        email: DataTypes.STRING(100),
        username: {
            type:DataTypes.STRING(50),
            unique: true
        },
        password:DataTypes.TEXT,
        phone: DataTypes.STRING(10),
        avatar: DataTypes.TEXT,
        pub_id_avatar: DataTypes.TEXT,
        role: DataTypes.ENUM('user', 'staff', 'admin', 'super_admin'),
        reward_points: DataTypes.INTEGER,
        is_activating: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        birthday: DataTypes.DATE
    }, 
    {
        tableName: "users",
        timestamps: false,
    },
)

export default User