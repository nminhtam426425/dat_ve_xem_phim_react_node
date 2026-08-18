import {UserController} from '../controller/index.js'
import express from 'express'
// const test = async (req,res) => {
//     try{
//         const mailOptions = {
//             from: "nminhtam425@gmail.com",
//             to: "nminhtam426425@gmail.com",
//             subject: "Test API Email",
//             text: "Xin chào, đây là email gửi tự động từ NodeJS API!",
//             attachments: [
//                 {
//                   filename: "logo.png",
//                   path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0R0KswnhNi-1bsU96g79bF4IafZtcrAVzg&s"
//                 }
//               ]
//             }
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Lỗi khi gửi mail:", error);
//             } else {
//                 console.log("Email đã được gửi:", info.response);
//             }
//         });
//         res.status(200).json({message: "Gửi mail thành công !"})
//     }
//     catch(err){
//         res.status(400).json({message: err.message})
//     }
// }
const routerTest = express.Router()

routerTest.get('/',()=>{})

export default routerTest