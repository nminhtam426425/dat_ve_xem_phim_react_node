import {ArrowLeft, Pencil,Trash2} from "lucide-react"
import { useEffect, useState } from "react"
import { customeFetch, apiUserService } from "../../config"

const ContentDetailTicket = ({listChair, showtime, setShowtime}) => {
    const [movie, setMovie] = useState(null)
    const [detailTicket, setDetailTicket] = useState([])

    useEffect(()=>{
        const getDatas = async () => {
            try{
                const [res, res1] = await Promise.all(
                    [
                        customeFetch(apiUserService.baseURL+`/movies/detail/${showtime.movie_id}`,'non-authen','GET'),
                        customeFetch(apiUserService.baseURL+`/bookings/detail/${showtime.id}`,'authen','GET')
                    ]
                )

                if(res.ok && res1.ok){
                    const [data, data1] = await Promise.all([res.json(), res1.json()])
                    setMovie(data)
                    setDetailTicket(data1)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        if(showtime == null) return
        getDatas()
    },[showtime])

    return <div className="max-w-container-max mx-auto w-full p-6">
         <header className="flex flex-row items-center gap-4 mb-8">
            <span className="cursor-pointer mr-2" onClick={()=>setShowtime(null)}>
                <ArrowLeft size={24}/>
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Xem chi tiết đặt vé</h1>
        </header>

        <div className="w-[1200px] overflow-x-auto rounded-2xl border border-outline-variant/30 bg-white shadow-lg">
            <div className="w-full flex">
                <section className="flex flex-col p-6 bg-surface overflow-x-scroll scrollbar-hide">
                    <div className="flex justify-between items-start mb-10">
                        <div className="flex gap-4">
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
                        <div className="space-y-4 overflow-x-auto" id="grid-container">
                            
                            <Theater list={listChair?.list} count={listChair?.count} />

                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="p-4 bg-surface-container-low rounded-2xl flex gap-8 items-center border border-outline-variant/20">
                        <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-md bg-seat-standard"></div>
                                    <span className="text-sm font-semibold text-secondary">(Thường {showtime?.price/1000}K)</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-md bg-seat-vip shadow-md shadow-amber-200"></div>
                                    <span className="text-sm font-semibold text-secondary">(VIP {(Number(showtime?.price) + 10000)/1000}K)</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-6 rounded-md bg-seat-sweetbox shadow-md shadow-pink-200"></div>
                                    <span className="text-sm font-semibold text-secondary">(Ghế Đôi {showtime?.price*2/1000}K)</span>
                                </div>
                        </div>
                    </div>
                </section>

                <aside className="flex-1 bg-surface-container-low border-l border-outline-variant/30 flex flex-col wrap">
                    <div className="p-6 bg-white border-b border-outline-variant/30">
                        <h3 className="font-label-bold text-on-surface-variant uppercase tracking-widest text-[11px] mb-4">Chi tiết suât chiếu</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-20 rounded bg-surface-container overflow-hidden">
                                    <img className="w-full h-full object-cover" src={movie?.poster_url}/>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-on-surface text-sm">{showtime.name}</p>
                                    <p className="text-[12px] text-on-surface text-sm">Đã bán: {showtime.sold} vé</p>
                                    <p className="text-[12px] text-secondary">Suất: {showtime?.startTime} • {listChair?.name_theater}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table className="w-full text-left bg-white overflow-y-scroll">
                        <thead className="bg-surface-container-low text-secondary text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">Số ghế</th>
                                <th className="px-6 py-4">Tên người đặt</th>
                                <th className="px-6 py-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                            {
                                detailTicket.length > 0 
                                ?
                                detailTicket?.map( (item, index) => 
                                    <tr key={index} className="hover:bg-surface-container-low/50 transition-colors group">
                                        <td className="px-6 py-5 text-on-surface">{item?.data?.seat_number}</td>
                                        {
                                            item?.data?.customer == null 
                                            ?
                                            <td className="px-1 py-2 text-on-surface">Nhân viên: {item?.data?.staff?.fullname}</td>
                                            :
                                            <td className="px-1 py-2 text-on-surface">Khách hàng: {item?.data?.customer?.fullname}</td>
                                        }
                                        
                                         <td className="px-1 py-2 text-right">
                                            {/* <div className="flex justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    className="p-2 hover:bg-surface-container rounded-lg text-secondary"
                                                    onClick={()=>{}}>
                                                    <span className="material-symbols-outlined">
                                                        <Pencil size={20}/>
                                                    </span>
                                                </button>
                                                <button 
                                                    className="p-2 hover:bg-error-container rounded-lg text-error"
                                                    onClick={()=>{}}>
                                                    <span className="material-symbols-outlined">
                                                        <Trash2 size={20}/>
                                                    </span>
                                                </button>
                                            </div> */}
                                        </td> 
                                    </tr>
                                )
                                : 
                                <tr>
                                    <td className="px-6 py-4" colSpan={3}>
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </aside>
            </div>
        </div>
    </div>
}

const Theater = ({list, count}) => {
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
                    list={item.listRender} />)
        }
    </>
}

// Tạo mỗi hàng ghế 
const RowTheater = ({list, chairChosen}) => {
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


export default ContentDetailTicket