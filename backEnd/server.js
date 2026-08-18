import express from 'express'
import 'dotenv/config'
import {routerUser, 
    routerBranch, 
    routerMovie, 
    routerShowtime, 
    routerVoucher,
    routerAuthen,
    routerTest,
    routerBooking,
    routerCategory,
    routerPayment,
    routerChat
} from './router/index.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const server = express()
server.set('trust proxy', 1);
server.use(express.json())
server.use(
    cors(
        {
            origin: process.env.FE || 'http://localhost:5173',
            credentials: true
        }
    )
)
server.use(cookieParser())
server.use('/users',routerUser)
server.use('/branches',routerBranch)
server.use('/movies',routerMovie)
server.use('/showtimes',routerShowtime)
server.use('/vouchers',routerVoucher)
server.use('/auth',routerAuthen)
server.use('/testGmail',routerTest)
server.use('/bookings',routerBooking)
server.use('/categories',routerCategory)
server.use('/payments',routerPayment)
server.use('/chats',routerChat)

server.get('/',(req,res)=>{
    res.status(200).json("Hello world !")
})
server.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server is running at http://${process.env.HOST}:${process.env.PORT}`);
})

const tempFC = () => {
    setInterval(()=>{
        console.log("hehe is running");
    },1000)
}
