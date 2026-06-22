import { sequelize,DataTypes } from "../index.js";

const BranchStaff = sequelize.define(
    'BranchStaff',
    {
        branch_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, 
    {
        tableName: "branch_staff",
        timestamps: false,
    },
)

export default BranchStaff