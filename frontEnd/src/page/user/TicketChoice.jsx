import { useLocation } from "react-router-dom"
import {Header, ContentTicket, Footer} from "./components/index"
import { useEffect, useState } from "react"
import { customeFetch, apiUserService, getAccessToken, pusher} from "../config"
import Alert from "./components/modal/Alert"
import Voucher from "./components/modal/Voucher"
import ConfirmBook from "./components/modal/ConfirmBook"

const TicketChoice = () => {
    const location = useLocation()
    const movie = location?.state?.movie || null
    const showtime = location?.state?.showtime || null
    const [listChair, setListChair] = useState([])
    const [socketId, setSocketId] = useState(null)
    const [confirm, setConfirm] = useState(false)
    const [showVoucher, setShowVoucher] = useState(false)
    const [priceBooking, setPriceBooking] = useState(0)
    // giữ tiền lúc chưa áp mã
    const [valueBeforeDiscount, setValueBeforeDiscount] = useState(0)
    const [msg, setMsg] = useState('Đã đạt đến số vé tối đa !')
    // các voucher sử dụng
    const [useVoucher, setUseVoucher] = useState([])
    const [confirmBook, setConfirmBook] = useState(null)

    // kiểm tra xem nếu chưa đăng nhập thì gọi api lấy trạng thái vé tương ứng là không cần đăng nhập
    useEffect(() => {
        const getSeats = async () => {
            try{
                let tokenAccess = getAccessToken()
                let authen = 'authen'
                let url = '/showtimes/seats/'
                if(!tokenAccess){
                    authen = 'non-authen'
                    url = '/showtimes/seats/non-login/'
                }
               
                const res = await customeFetch(apiUserService.baseURL+url+`${showtime?.id}`,authen,'GET')
                if(res.ok){
                    const data = await res.json()
                    setListChair(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getSeats()
    },[showtime])

    useEffect(()=>{
        if(!showtime?.id) {
            console.log("ko co id")
            return
        }

        if (pusher.connection.state === 'connected') {
            setSocketId(pusher.connection.socket_id)
        } else {
            pusher.connection.bind('connected', () => {
                setSocketId(pusher.connection.socket_id)
            })
        }

        const channelName = `showtimes-${showtime?.id}`
        const channel = pusher.subscribe(channelName)

        channel.bind('booking_seat',(data)=>{
            const {seatId,type} = data
            if(type == 'book'){
                setListChair( pre => {
                    if (!pre) return pre
    
                    return {
                        ...pre,
                        list: pre.list.map(item => {
                            if (seatId.includes(item.seat_number)) 
                                return { ...item, status: 'booked' }
                            
                            return item
                        })
                    }
                })
            }
            else{
                setListChair( pre => {
                    if (!pre) return pre
    
                    return {
                        ...pre,
                        list: pre.list.map(item => {
                            if (seatId.includes(item.seat_number)) 
                                return { ...item, status: 'empty' }
                            
                            return item
                        })
                    }
                })
            }
        })

        return () => {
            channel.unbind_all()
            pusher.unsubscribe(channelName)
        }
        
    },[showtime])

    let propsOfContent = {
        movie,
        showtime,
        listChair,
        socketId,
        showVoucher,
        priceBooking,
        valueBeforeDiscount,
        useVoucher,
        setListChair,
        setConfirm,
        setShowVoucher,
        setPriceBooking,
        setValueBeforeDiscount,
        setMsg,
        setConfirmBook,
        setUseVoucher
    }

    return <>
        <Header/>
        <ContentTicket {...propsOfContent}/>
        <Alert confirm={confirm} setConfirm={setConfirm} message={msg} setConfirmBook={setConfirmBook}/>
        <Voucher 
            showVoucher={showVoucher} 
            setShowVoucher={setShowVoucher} 
            priceBooking={valueBeforeDiscount}
            priceAfterDiscount={priceBooking}
            setPriceBooking={setPriceBooking}
            useVoucher={useVoucher}
            setUseVoucher={setUseVoucher}/>
        <ConfirmBook confirm={confirmBook} setConfirm={setConfirmBook}/>
        <Footer/>
    </>
}

export default TicketChoice