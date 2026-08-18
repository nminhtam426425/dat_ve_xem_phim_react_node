import { sequelize,DataTypes } from "../index.js";

const Conversations = sequelize.define(
    'Conversations',
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id:DataTypes.STRING(36),
        user_id:DataTypes.STRING(36),
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    }, 
    {
        tableName: "conversations",
        timestamps: false,
    },
)

export default Conversations