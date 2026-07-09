import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {AlarmCheck, Armchair, ArrowRight, Calendar, ChevronRight, Clock, Ticket, ArrowBigLeft, TicketPercent} from "lucide-react"
import {toast} from 'sonner'
import { formatVND2, formatDate } from "../../validate"
import { customeFetch, apiUserService, getAccessToken, setTmpId, getTmpId } from "../../config"
import TimerAlram from "./TimerAlram"
import {useLoading} from '../../../LoadingContext'

const calculatorPrice = (chairChosen, price) => {
    if(!chairChosen || !price) return "0đ"
    price = Number(price)
    let amount = 0

    for(let i of chairChosen){
        if(i.type == 'Standard')
            amount += price
        else if (i.type == 'VIP')
            amount += (price+ 10000)
        else 
            amount += (price*2)
    }

    return amount
}

const ContentTicket = ({
    movie, showtime, listChair, socketId, setConfirm, setShowVoucher, 
    priceBooking, setPriceBooking ,valueBeforeDiscount, setValueBeforeDiscount, setMsg, useVoucher}) => {

    const navigate = useNavigate()
    const [chairChosen, setChairChosen] = useState([])
    const {showLoading, hideLoading} = useLoading()

    const payment =  async () => {
        let dataForApi = {
            showtime_id: showtime.id,
            price_at_booking: priceBooking,
            role: 'user',
            useVoucher: useVoucher
        }
        console.log(useVoucher)
        showLoading("Đang xử lý, vui lòng chờ !")
        try{
            const res = await customeFetch(apiUserService.baseURL+'/bookings/payment','authen','POST',JSON.stringify(dataForApi))
            if(res.ok){
                toast.success("Đã đặt vé thành công, vé đã được lưu trong lịch sử vé của bạn !")
                navigate('/user/history')
            }
        }
        catch(err){
            console.log(err)
        }
        hideLoading()
    }

    const backToShowtime = () => {
        navigate('/chi-tiet', {state: {idMovie: movie?.id}})
    }

    useEffect(()=>{
        setValueBeforeDiscount(calculatorPrice(chairChosen, showtime?.price))
        setPriceBooking(calculatorPrice(chairChosen, showtime?.price))
    },[chairChosen])

    return <main className="bg-background2 font-body-md">
        <div className="w-[full] max-w-[1280px] mx-auto px-gutter py-8 flex flex-col lg:flex-row gap-8">
            <div className="flex-grow flex flex-col items-center">
                <div className="flex items-center justify-center mb-12 space-x-4 w-full">
                    <div className="flex items-center text-primary-container">
                        <button 
                            className={`p-2 md:mr-8 md:p-4 rounded-full text-sx mr-2 text-primary bg-white cursor ${chairChosen.length > 0 ? 'cursor-not-allowed' : ''}`} 
                            title="Quay lại"
                            disabled={chairChosen.length > 0 ? true : false}
                            onClick={backToShowtime}>
                            <ArrowBigLeft size={20} className="text-shite"/>
                        </button>
                    </div>

                    <div className="flex items-center text-primary-container">
                        <span className="p-2 rounded-full bg-primary-container text-xs mr-2 text-white">01</span>
                        <span className="text-sm font-label-bold">CHỌN GHẾ</span>
                    </div>

                    <div className="w-12 h-[5px] bg-zinc-800"></div>
                    <div className="flex items-center text-zinc-500">
                        <span className="p-2 rounded-full border border-zinc-500 text-xs mr-2">02</span>
                        <span className="text-sm font-label-bold">THANH TOÁN</span>
                    </div>

                    <div className="w-12 h-[5px] bg-zinc-800"></div>
                    <div className="flex items-center text-zinc-500">
                        <span className="p-2 rounded-full border border-zinc-500 text-xs mr-2">03</span>
                        <span className="text-sm font-label-bold">NHẬN VÉ</span>
                    </div>
                </div>

                <div className="w-full max-w-[800px] mb-2 text-center">
                    <h3 className="text-surface-tint font-label-bold mb-4 uppercase tracking-[0.2em]">MÀN HÌNH</h3>
                    <div className="screen-curve-2 mb-4"></div>
                    <div className="w-full h-12 bg-gradient-to-b from-primary-container/10 to-transparent blur-xl"></div>
                </div>

                <div className="seat-grid flex flex-col gap-3 items-center">
                    <div className="space-y-4" id="grid-container">
                        
                        <Theater 
                            list={listChair?.list || []} 
                            count={listChair?.count} 
                            chairChosen={chairChosen} 
                            setChairChosen={setChairChosen} 
                            showtime={showtime} 
                            socketId={socketId}
                            setConfirm={setConfirm}/>

                    </div>
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-seat-standard"></div>
                        <span className="text-white">Thường</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-seat-vip"></div>
                        <span className="text-white">VIP</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-5 rounded-lg bg-seat-sweetbox border border-pink-500/50"></div>
                        <span className="text-white">Cặp Đôi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-primary-container"></div>
                        <span className="text-white">Đang chọn</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-outline-variant/30"></div>
                        <span className="text-white">Đã đặt</span>
                    </div>
                </div>
            </div>

            <aside className="w-full lg:w-96">
                <div className="glass-panel p-6 rounded-xl flex flex-col gap-6 sticky top-8">
                    <div className="flex gap-4 border-b border-outline-variant pb-6">
                        <img className="w-24 h-36 bg-surface-container rounded-lg bg-cover bg-center flex-shrink-0" src={movie?.poster_url == "" ? null :movie?.poster_url }/>
                        <div className="flex flex-col justify-start">
                            <h4 className="text-white font-headline-md leading-tight mb-1">{movie?.title}</h4>
                            <p className="text-white text-sm">{movie?.Categories?.map(item => item.name).join(', ')}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    <Calendar size={20}/> </span> Ngày
                            </span>
                            <span className="text-white font-semibold">{formatDate(showtime?.start_time)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                <Clock/></span> Suất chiếu
                            </span>
                            <span className="text-white font-semibold">{showtime?.start_time?.substring(11,16)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    <Armchair size={20}/></span> Ghế đã chọn
                                </span>
                            <span className="text-white font-bold">{chairChosen.map(item => item.seat_number).join(', ')}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    <Ticket size={20}/>
                                </span> Voucher
                            </span>
                            <span className="text-white font-bold flex hover:underline">
                                <button onClick={()=>setShowVoucher(true)}>Chọn ngay</button>
                                <ChevronRight size={20}/>
                            </span>
                        </div>

                        {
                            (valueBeforeDiscount != priceBooking)&&<div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2 text-red-500">
                                <span className="material-symbols-outlined text-lg">
                                    <TicketPercent size={20}/>
                                </span> Đã giảm
                            </span>
                                <span className="text-white font-bold flex mr-2">
                                    <span className="text-red-500">-{(valueBeforeDiscount - priceBooking)/1000}K</span>
                                </span>
                            </div>
                        }

                        <div className={`flex justify-between items-center ${chairChosen.length > 0 ? 'bg-primary/50 py-2 rounded-lg' : ''}`}>
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                <AlarmCheck size={20}/></span> Thời gian giữ chỗ còn lại: 
                            </span>
                            <TimerAlram 
                                showtime={showtime} 
                                chairChosen={chairChosen} 
                                setChairChosen={setChairChosen}
                                socketId={socketId}
                                setMsg={setMsg}
                                setConfirm={setConfirm}/>
                        </div>
                    </div>
                    <div className="h-px bg-outline-variant w-full"></div>

                    <div className="flex justify-between items-end">
                        <span className="text-white uppercase tracking-wider">Tạm tính</span>
                        <span className="text-white text-3xl font-bold">{formatVND2(priceBooking)}</span>
                    </div>

                    <button 
                        className={`w-full text-white font-headline-md py-4 rounded-lg transition-all shadow-lg shadow-primary-container/20 flex items-center justify-center gap-2
                            ${chairChosen.length == 0 ? 'bg-inverse-primary cursor-not-allowed' : 'bg-primary-container hover:bg-inverse-primary'}`}
                        disabled={chairChosen.length == 0 ? true : false}
                        onClick={()=>payment()}
                        >
                            Tiếp tục thanh toán
                        <span className="material-symbols-outlined"><ArrowRight size={20}/></span>
                    </button>
                </div>
            </aside>
        </div>
    </main>
}

const Theater = ({list, count, chairChosen, setChairChosen ,showtime ,socketId, setConfirm }) => {
    if(!list || !count) return 
    let length = calculatorNumberOfRow(list, count)
    let objRender = []
    let index = 0
    for(let i = 0; i < length; i++){
        let typeRoom = list[index].type
        if(typeRoom == 'Sweetbox'){
            let nextIndex = index + (count/2) 
            objRender.push({
                listRender: list.slice(index, nextIndex)
            })
            index += count/2
        }
        else{
            objRender.push({
                listRender: list.slice(index, index + count)
            })
            index += count
        }
    }
    return <>
        {
            objRender.map( (item, index) => 
                <RowTheater 
                    key={index} 
                    list={item.listRender} 
                    chairChosen={chairChosen} 
                    setChairChosen={setChairChosen} 
                    showtime={showtime} 
                    socketId={socketId}
                    setConfirm={setConfirm}/>
            )
        }
    </>
}

// Tạo mỗi hàng ghế 
const RowTheater = ({list, chairChosen, setChairChosen, showtime, socketId, setConfirm}) => {
    //const {showLoading, hideLoading} = useLoading()
    let typeCssColorChair = {
        Standard: 'standard',
        VIP: 'vip',
        Sweetbox: 'sweetbox'
    }

    // chỉ áp dụng cho object có dạng key: value (với value là dữ liễu khác đối tượng, mảng)
    const containValue = (list, value, key) => {
        if(!list || !value || !key) return false
        for(let i of list){
            if(i[key] == value)
                return true
        }
        return false
    } 

    const hanleChoseTicket = async (item) => {
        let seatId = item.seat_number
        //showLoading("Đang xử lý, vui lòng chờ !")
        try{
            let containSeatId = containValue(chairChosen,seatId,'seat_number')
            let url = '/bookings'
            let authen = 'authen'
            let tmpToken = getAccessToken()
            let tempIdUser = getTmpId()
            let body = {
                seat_number: seatId,
                showtime_id: showtime?.id,
                socket_id: socketId
            }

            if(!tmpToken){
                url = '/bookings/non-login'
                authen = 'non-authen'
                body = {
                    seat_number: seatId,
                    user_id: !tempIdUser ? "" : tempIdUser,
                    showtime_id: showtime?.id,
                    socket_id: socketId
                }
            }

            if(containSeatId)
                url += '/unbook'

            if(chairChosen.length == showtime?.max_tickets && !containSeatId)
                setConfirm(true)
            else{
                const res = await customeFetch(apiUserService.baseURL+url,
                    authen,
                    'POST',
                    JSON.stringify(body)
                )
    
                if(res.ok){
                    const data = await res.json()
                    if(!tempIdUser)
                        setTmpId(data.tmpIdUser)
                    
                    if(containSeatId)
                        setChairChosen(pre => pre.filter(item => item.seat_number != seatId))
                    else
                        setChairChosen(pre => [...pre, item]) 
                }
            }
            //hideLoading()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="flex items-center gap-2 md:gap-8 w-full justify-center md:justify-start overflow-x-auto py-2">
            <span className="w-4 text-center font-bold text-seat-sweetbox text-sm shrink-0">
                {list[0]?.seat_number?.charAt(0)}
            </span>
            <div className="flex gap-1 flex-wrap md:flex-nowrap justify-center">
                {list?.map((item, index) => (
                    <button 
                        key={index}
                        className={`h-6 w-6 text-[10px] md:h-8 md:text-[14px] rounded-md md:rounded-lg flex items-center justify-center  shrink-0 transition-all
                            ${item.type === 'Sweetbox' 
                                ? 'w-12 md:w-[68px]' 
                                : 'w-6 md:w-8'
                            } 
                            ${item.status === 'booked' 
                                ? 'bg-outline-variant/30 cursor-not-allowed text-black' 
                                : containValue(chairChosen,item.seat_number,'seat_number')
                                    ? 'bg-primary text-white' 
                                    : `bg-seat-${typeCssColorChair[item.type]} hover:ring-2 ring-primary ring-offset-2 text-white`
                            }`}
                        title={item.seat_number}
                        disabled={item.status == 'booked'}
                        onDoubleClick={()=>{}}
                        onClick={()=>hanleChoseTicket(item)}
                        data-custome={item}
                    >
                        <span className="hidden md:inline" data-custome={item.seat_number}>{item.seat_number}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// trả về số hàng ghế, vì nếu loại Sweetbox thì chỉ bằng 1 / 2 ghế VIP và Standard ở mỗi hàng
const calculatorNumberOfRow = (listChair, count) => {
    let reulst = 0
    let length = listChair.length
    for(let i = 0; i <  length;){
        reulst++
        if(listChair[i].type == 'Sweetbox')
            i+=(count/2)
        else 
            i+=count
    }
    return reulst
}

export default ContentTicket