import { sequelize,DataTypes } from "../index.js";

const Vouchers = sequelize.define(
    'Vouchers',
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type:DataTypes.STRING(50),
            unique: true
        },
        min_order_value: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        max_discount_value: DataTypes.INTEGER,
        point_cost: DataTypes.INTEGER,
        expiry_date: DataTypes.DATE,
        usage_limit: DataTypes.INTEGER,
        remain_usage: DataTypes.INTEGER,
        type: DataTypes.ENUM('student','new_account','holiday','birthday','redeem','normal'),
        discount_type: DataTypes.ENUM('percentage','fixed_amount')
    }, 
    {
        tableName: "vouchers",
        timestamps: false,
    },
)

export default Vouchers