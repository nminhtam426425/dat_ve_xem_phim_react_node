import { sequelize,DataTypes } from "../index.js"

const ContentConver = sequelize.define(
    'ContentConver',
    {
        id:{
            type: DataTypes.STRING(36),
            primaryKey: true
        },
        conver_id:DataTypes.INTEGER,
        sender_id:DataTypes.STRING(36),
        message_text:DataTypes.TEXT,
        is_read: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE
    }, 
    {
        tableName: "content_conver",
        timestamps: false,
    },
)

export default ContentConver