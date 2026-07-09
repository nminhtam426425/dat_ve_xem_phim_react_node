import { useEffect, useMemo, useState } from 'react'
import { customeFetch, apiUserService,pusher } from '../../config'
import { formatVND2, getHourString, calculatorPrice } from '../../validate' 
import TicketDownloader from './TicketDownloader'

const ContentTicket = ({datas, categories, earnPoint, setEarnPoint, userEarnPoint, setUserEarnPoint}) => {
    const [showtimeChose, setShowtimeChose] = useState(null)
    const [cateChose, setCateChose] = useState('all')
    const [listChair, setListChair] = useState([])
    const [chairChosen, setChairChosen] = useState([])
    const [socketId, setSocketId] = useState(null)

    useEffect( ()=>{
        if(showtimeChose!=null){
            const getSeats = async () => {
                try{
                    const res = await customeFetch(apiUserService.baseURL+`/showtimes/seats/${showtimeChose?.showtime?.id}`,'authen','GET')
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
        }
    },[showtimeChose])

    useEffect( ()=>{
        if(!showtimeChose?.showtime?.id) return 

        if (pusher.connection.state === 'connected') {
            setSocketId(pusher.connection.socket_id)
        } else {
            pusher.connection.bind('connected', () => {
                setSocketId(pusher.connection.socket_id)
            })
        }

        const channelName = `showtimes-${showtimeChose?.showtime?.id}`
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
        
    },[showtimeChose])

    const dataRender = useMemo(()=>{
        return datas.filter( (item) => {
            let passCate = cateChose == 'all' || item.Categories.some( item => item.id == cateChose)
            return passCate
        })
    },[cateChose, datas])

    const choseMovieUI = (itemMovie, itemShowtime) => {
        if(!itemMovie) return ""
        setShowtimeChose({
            movie: itemMovie,
            showtime: itemShowtime
        })
        setChairChosen([])
    }

    const choseCateUI = (id) => {
        if(!id) return null
        setCateChose(id)
        setShowtimeChose(null)
    }
    
    return <>
        <main className="flex overflow-hidden h-[calc(100vh-64px)]">
            <section className="w-1/3 min-w-[360px] w-[400px] border-r border-outline-variant/30 flex flex-col bg-surface-container-lowest">
                <div className="p-6 border-b border-outline-variant/30 bg-surface-bright">
                    <h3 className="font-headline-md text-on-surface mb-4">Phim đang chiếu</h3>
                    <div className="flex gap-2 flex-wrap">
                        <button 
                            onClick={()=>choseCateUI('all')}
                            className={`px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap ${cateChose == 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container text-secondary'}`}>
                            Tất cả
                        </button>
                        {
                            categories?.map( (item,index) => 
                                <button key={item.id+index}
                                    className={`px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap ${cateChose == item?.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-secondary hover:bg-surface-container-high transition-colors'}`}
                                    onClick={()=>choseCateUI(item?.id)}>{item?.name}
                                </button>
                            )
                        }
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {
                        dataRender.length > 0 
                        ?
                        dataRender?.map( item =>  
                            <div 
                                key={item.id}
                                className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all hover:shadow-md ${showtimeChose?.movie?.id == item?.id ? ' bg-primary-container/5 border border-primary/20 shadow-sm' : 'bg-white border border-outline-variant/20 hover:border-primary/20'}`}>
                                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                    <img className="w-full h-full object-cover" src={(item?.poster_url == "" ? null : item.poster_url)}/>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-label-bold text-on-surface truncate">{item?.title}</h4>
                                    <p className="text-[11px] text-secondary-fixed-dim uppercase mb-2">{item?.Categories[0].name} • {item?.duration}'</p>
                                    <div className="grid grid-cols-3 gap-2">
                                    {
                                        item?.Showtimes.map( itemShowtime => 
                                            <button 
                                                key={itemShowtime?.id}
                                                disabled={chairChosen.length == 0 ? false : true}
                                                className={`py-2 text-[11px] font-bold rounded ${(showtimeChose?.showtime?.id == itemShowtime.id) ? 'bg-primary-container text-on-primary shadow-sm' : 'bg-surface-container text-on-secondary-fixed hover:bg-surface-container-high'} ${chairChosen.length == 0 ? '' : 'cursor-not-allowed'}`}
                                                onClick={()=>choseMovieUI(item, itemShowtime, listChair?.name_theater)}
                                                >{getHourString(itemShowtime?.start_time)}
                                            </button>
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        'Không có dữ liệu'
                    }
                </div>
            </section>

            {(showtimeChose)&& <section className="flex-1 flex flex-col p-6 bg-surface overflow-x-auto scrollbar-hide">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h3 className="font-headline-md text-on-surface">Chọn chỗ ngồi</h3>
                        <p className="text-secondary text-label-md">{listChair?.name}</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-primary shadow-sm"></div>
                            <span className="text-[12px] text-secondary">Đang chọn</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-secondary/20"></div>
                            <span className="text-[12px] text-secondary">Đã bán</span>
                        </div>
                    </div>
                </div>
                <hr/>

                <div className="flex flex-col items-center mt-6 mb-12">
                    <div className="w-[100%] h-12 screen-curve flex items-center justify-center ">
                        <span className="text-xs font-bold tracking-[0.5em] text-secondary mt-2">MÀN HÌNH</span>
                    </div>
                </div>

                <div className="seat-grid flex flex-col gap-3 items-center">
                    <div className="space-y-4" id="grid-container">
                        
                        <Theater 
                            list={listChair?.list} 
                            count={listChair?.count} 
                            chairChosen={chairChosen} 
                            setChairChosen={setChairChosen} 
                            showtimeChose={showtimeChose?.showtime}
                            socketId={socketId}
                            setUserEarnPoint={setUserEarnPoint}/>

                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="p-4 bg-surface-container-low rounded-2xl flex gap-8 items-center border border-outline-variant/20">
                    <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-seat-standard"></div>
                                <span className="text-sm font-semibold text-secondary">(Thường {showtimeChose?.showtime?.price/1000}K)</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-md bg-seat-vip shadow-md shadow-amber-200"></div>
                                <span className="text-sm font-semibold text-secondary">(VIP {(Number(showtimeChose?.showtime?.price) + 10000)/1000}K)</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-6 rounded-md bg-seat-sweetbox shadow-md shadow-pink-200"></div>
                                <span className="text-sm font-semibold text-secondary">(Ghế Đôi {showtimeChose?.showtime?.price*2/1000}K)</span>
                            </div>
                    </div>
                </div>
            </section>}
            
            {(showtimeChose)&& <aside className="w-80 bg-surface-container-low border-l border-outline-variant/30 flex flex-col wrap">
                <div className="p-6 bg-white border-b border-outline-variant/30">
                    <h3 className="font-label-bold text-on-surface-variant uppercase tracking-widest text-[11px] mb-4">Chi tiết hóa đơn</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-16 h-20 rounded bg-surface-container overflow-hidden">
                                <img className="w-full h-full object-cover" src={showtimeChose?.movie?.poster_url}/>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-on-surface text-sm">{showtimeChose?.movie?.name}</p>
                                <p className="text-[12px] text-secondary">Suất: {getHourString(showtimeChose?.showtime?.start_time)} • {listChair?.name_theater}</p>
                                <p className="text-[12px] font-bold text-primary mt-1">{chairChosen.length}x Vé</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-secondary">Ghế đã chọn</span>
                            <span className="font-bold text-on-surface">{chairChosen.map(item => item.seat_number).join(', ')}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-secondary">Đơn giá</span>
                            <span className="font-bold text-on-surface">{formatVND2(calculatorPrice(chairChosen, showtimeChose?.showtime?.price))}</span>
                        </div>

                        <div className="text-sm flex-col items-end">
                            <div className="flex items-center gap-3 cursor-pointer select-none">
                                <input 
                                    id="points" 
                                    type="radio" 
                                    value={earnPoint}
                                    checked={userEarnPoint == null ? false : true}
                                    onChange={()=>setEarnPoint(pre => !pre)}
                                    className="w-4 h-4 text-blue-600 accent-blue-600 order-2 cursor-pointer"
                                />
                                <label htmlFor="points" className="font-medium text-gray-700 order-1">
                                    Tích điểm
                                </label>
                               
                            </div>
                            <div className="flex items-center gap-3 cursor-pointer select-none">
                                <input 
                                    id="not_points" 
                                    type="radio" 
                                    value={earnPoint}
                                    checked={userEarnPoint == null ? true : false}
                                    readOnly
                                    className="w-4 h-4 text-blue-600 accent-blue-600 order-2 cursor-pointer"
                                    />
                                <label htmlFor="not_points" className="font-medium text-gray-700 order-1">
                                    Không Tích điểm
                                </label>
                            </div>
                        </div>
                        {
                            userEarnPoint &&  <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary">Khách hàng</span>
                                <span className="font-bold text-on-surface">{userEarnPoint?.fullname}</span>
                            </div>
                        }
                       
                    </div>
                </div>

                <div className="p-6 bg-white border-t border-outline-variant/30 space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                    <div className="flex justify-between items-end">
                        <span className="text-secondary font-medium">Tổng tiền tạm tính</span>
                        <span className="font-headline-md text-primary leading-none">{formatVND2(calculatorPrice(chairChosen, showtimeChose?.showtime?.price))}</span>
                    </div>

                    <TicketDownloader 
                        ticketData={showtimeChose} 
                        chairChosen={chairChosen} 
                        nameTheater={listChair?.name_theater} 
                        setShowtimeChose={setShowtimeChose}
                        setChairChosen={setChairChosen}
                        userEarnPoint={userEarnPoint}
                        setUserEarnPoint={setUserEarnPoint}/>

                </div>
            </aside>}
        </main>
    </>
}   

const Theater = ({list, count, chairChosen, setChairChosen, showtimeChose, socketId, setUserEarnPoint}) => {
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
                    showtimeChose={showtimeChose} 
                    socketId={socketId}
                    setUserEarnPoint={setUserEarnPoint}
                    />)
        }
    </>
}

// Tạo mỗi hàng ghế 
const RowTheater = ({list, chairChosen, setChairChosen, showtimeChose, socketId, setUserEarnPoint}) => {
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
        try{
            let containSeatId = containValue(chairChosen,seatId,'seat_number')
            let url = '/bookings'
            if(containSeatId)
                url += '/unbook'
            const res = await customeFetch(apiUserService.baseURL+url,
                'authen',
                'POST',
                JSON.stringify({
                    seat_number: seatId, 
                    showtime_id: showtimeChose?.id,
                    socket_id: socketId
                })
            )

            if(res.ok){
                if(containSeatId)
                    setChairChosen(pre => {
                        let newState = pre.filter(item => item.seat_number != seatId)
                        if(newState.length == 0)
                            setUserEarnPoint(null)
                        return newState
                    })
                else
                    setChairChosen(pre => [...pre, item]) 
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return <div className="flex items-center gap-8">
        <span className="w-1 text-center font-bold text-seat-sweetbox text-sm">{list[0]?.seat_number?.charAt(0)}</span>
        
        <div className="flex gap-1">
            {
                list?.map( (item, index) => 
                    <button key={index}
                        className={`h-8 rounded-lg text-[14px] flex items-center justify-center text-white 
                            ${item.type == 'Sweetbox' ? 'w-[68px]' : 'w-8'}
                            ${item.status == 'booked' ? ' bg-secondary/20 text-secondary/40 cursor-not-allowed' : 'cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all'}
                            ${containValue(chairChosen,item.seat_number,'seat_number')? 'bg-primary text-secondary' : `bg-seat-${typeCssColorChair[item.type]}`}`}
                        title={item.seat_number}
                        disabled={item.status == 'booked'}
                        onClick={()=>hanleChoseTicket(item)}
                        id={item.id}
                        >{item.seat_number}
                    </button>)
                }
        </div>
    </div>
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