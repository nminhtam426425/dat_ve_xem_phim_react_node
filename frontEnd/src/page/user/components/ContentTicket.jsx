import { useState } from "react"
import {AlarmCheck, Armchair, ArrowRight, Calendar, ChevronRight, Clock, Ticket} from "lucide-react"
import { formatVND2, formatDate } from "../../validate"

// test render phòng chiếu
const test = (seat, count, type) => {
    let temp = []
    if(type != 'Sweetbox'){
        for(let i = 1; i <= count; i++ ){
            temp.push({
                seat_number: seat+i,
                status:'da ban',
                type
            })
        }
    }
    else{
        for(let i = 1; i <= count; i+=2 ){
            temp.push({
                seat_number: `${seat+i}-${seat+(i+1)}`,
                status:'chua ban',
                type
            })
        }
    }
    return temp
    
} 
let tempCount = 10
const chairRoom1 = {
    room_id: 1,
    count: tempCount,
    list: [
        ...test('A',tempCount, 'Standard'),
        ...test('B',tempCount, 'Standard'),
        ...test('C',tempCount, 'Standard'),
        ...test('D',tempCount, 'Standard'),
        ...test('E',tempCount, 'VIP'),
        ...test('F',tempCount, 'VIP'),
        ...test('J',tempCount, 'VIP'),
        ...test('H',tempCount, 'Sweetbox')
    ]
}

const showtime = {
    id:'1',
    name:'Tài',
    poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781576595/wipumvlssypyc4unhopo.jpg',
    start: '2026-06-20 19:00:00',
    price:90000,
    Categories: [
        {
            id: '1', name:'Hài hước'
        },
        {
            id: '2', name:'Hành động'
        }
    ] 
}

const calculatorPrice = (count, price) => {
    if(!count || !price) return "0đ"
    return formatVND2(price*count)
}

const ContentTicket = () => {
    const [chairChosen, setChairChosen] = useState([])
    const payment = () => {
        console.log(chairChosen)
    }

    return <main className="bg-background2 font-body-md">
        <div className="w-[full] max-w-[1280px] mx-auto px-gutter py-8 flex flex-col lg:flex-row gap-8">
            <div className="flex-grow flex flex-col items-center">
                <div className="flex items-center justify-center mb-12 space-x-4 w-full">
                    <div className="flex items-center text-primary-container">
                        <span className="p-2 rounded-full bg-primary-container text-xs mr-2 text-white">01</span>
                        <span className="text-sm font-label-bold">CHỌN GHẾ</span>
                    </div>
                    <div className="w-12 h-px bg-zinc-800"></div>
                    <div className="flex items-center text-zinc-500">
                        <span className="p-2 rounded-full border border-zinc-500 text-xs mr-2">02</span>
                        <span className="text-sm font-label-bold">THANH TOÁN</span>
                    </div>
                    <div className="w-12 h-px bg-zinc-800"></div>
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
                        
                        <Theater list={chairRoom1.list} count={tempCount} chairChosen={chairChosen} setChairChosen={setChairChosen}/>

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
                        <span className="text-white">Đôi</span>
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
                        <img className="w-24 h-36 bg-surface-container rounded-lg bg-cover bg-center flex-shrink-0" src="https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781576595/wipumvlssypyc4unhopo.jpg"/>
                        <div className="flex flex-col justify-start">
                            <h4 className="text-white font-headline-md leading-tight mb-1">{showtime.name}</h4>
                            <p className="text-white text-sm">{showtime.Categories.map(item => item.name).join(', ')}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    <Calendar size={20}/> </span> Ngày
                            </span>
                            <span className="text-white font-semibold">{formatDate(showtime.start)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                <Clock/></span> Suất chiếu
                            </span>
                            <span className="text-white font-semibold">19:30</span>
                        </div>

                        {/* <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">location_on</span> Rạp
                                                    </span>
                            <span className="text-white font-semibold">CinemaStar Landmark 81</span>
                        </div> */}

                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    <Armchair size={20}/></span> Ghế đã chọn
                                </span>
                            <span className="text-white font-bold">{chairChosen.join(', ')}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                    <Ticket size={20}/>
                                </span> Voucher
                            </span>
                            <span className="text-white font-bold flex hover:underline">
                                <button>Chọn ngay</button>
                                <ChevronRight size={20}/>
                            </span>
                        </div>


                        <div className="flex justify-between items-center">
                            <span className="text-on-surface-variant-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">
                                <AlarmCheck size={20}/></span> Thời gian giữ chỗ
                            </span>
                            <span className="text-white font-bold">05:00</span>
                        </div>
                    </div>
                    <div className="h-px bg-outline-variant w-full"></div>

                    <div className="flex justify-between items-end">
                        <span className="text-white uppercase tracking-wider">Tạm tính</span>
                        <span className="text-white text-3xl font-bold">{calculatorPrice(chairChosen.length, showtime.price)}</span>
                    </div>

                    <button 
                        className={`w-full text-white font-headline-md py-4 rounded-lg transition-all shadow-lg shadow-primary-container/20 flex items-center justify-center gap-2
                            ${chairChosen.length == 0 ? 'bg-inverse-primary cursor-not-allowed' : 'bg-primary-container hover:bg-inverse-primary'}`}
                        disabled={chairChosen.length == 0 ? true : false}
                        onClick={payment}
                        >
                            Tiếp tục thanh toán
                        <span className="material-symbols-outlined"><ArrowRight size={20}/></span>
                    </button>
                </div>
            </aside>
        </div>
    </main>
}

const Theater = ({list, count, chairChosen, setChairChosen}) => {
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
            objRender.map( (item, index) => <RowTheater key={index} list={item.listRender} chairChosen={chairChosen} setChairChosen={setChairChosen}/>)
        }
    </>
}

// Tạo mỗi hàng ghế 
const RowTheater = ({list, chairChosen, setChairChosen}) => {
    let typeCssColorChair = {
        Standard: 'standard',
        VIP: 'vip',
        Sweetbox: 'sweetbox'
    }
    const hanleChoseTicket = (e) => {
        let value = e.target.dataset.custome
        if(chairChosen.includes(value))
            setChairChosen(pre => pre.filter(item => item != value))
        else
            setChairChosen(pre => [...pre, value])
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
                            ${item.status === 'da ban' 
                                ? 'bg-outline-variant/30 cursor-not-allowed text-black' 
                                : chairChosen.includes(item.seat_number)
                                    ? 'bg-primary text-white' 
                                    : `bg-seat-${typeCssColorChair[item.type]} hover:ring-2 ring-primary ring-offset-2 text-white`
                            }`}
                        title={item.seat_number}
                        disabled={item.status === 'da ban'}
                        onClick={hanleChoseTicket}
                        data-custome={item.seat_number}
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