import { sequelize,DataTypes } from "../index.js"

const ForgetPass = sequelize.define(
    'ForgetPass',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: DataTypes.STRING(36),
        code_reset: DataTypes.STRING(8),
        expired_date: DataTypes.DATE,
        created_at: DataTypes.DATE,
    }, 
    {
        tableName: "forget_pass",
        timestamps: false,
    },
)

export default ForgetPass