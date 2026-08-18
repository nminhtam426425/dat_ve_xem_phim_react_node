import {v2 as cloudinary} from 'cloudinary'
import  Pusher from 'pusher'
import nodemailer from 'nodemailer'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
})

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nminhtam425@gmail.com",
      pass: process.env.APP_PASSWORD
    }
})

export { cloudinary, pusher, transporter}