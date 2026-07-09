import { sequelize,DataTypes } from "../index.js";

const VoucherOfUser = sequelize.define(
    'VoucherOfUser',
    {
        user_id: {
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        voucher_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        is_use: DataTypes.BOOLEAN
    }, 
    {
        tableName: "voucher_of_user",
        timestamps: false,
    },
)

export default VoucherOfUser