import { Sequelize,DataTypes, Transaction } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306, 
        logging: console.log, // Bật logging để xem các câu truy vấn SQL
        timezone: '+07:00',
        dialectOptions: {
            // Option bổ sung giúp đồng bộ múi giờ hoàn toàn giữa Node.js và MySQL
            dateStrings: true,
            typeCast: true
        }
    }
);

export {sequelize,DataTypes,Transaction}