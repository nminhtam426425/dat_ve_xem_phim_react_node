import {ChevronDown, Clock} from "lucide-react"
import { useState, useEffect } from "react"
import { customeFetch, apiUserService } from "../../../config"
import {formatVND2} from "../../../validate"
import {useLoading} from "../../../../LoadingContext"
import { toast } from "sonner"

const getDuration = (arr, id) => {
    if(!arr) return 0
    let result = 0
    for(let i of arr){
        if(i.id == id){
            result = i.duration
            break
        }
    }
    return result
}

const getTitle = (arr, id) => {
    if(!arr) return 0
    let result = 0
    for(let i of arr){
        if(i.id == id){
            result = i.title
            break
        }
    }
    return result
}

const addMinutes = (date, minutes) => {
    if(!minutes) return ""
    return new Date(date.getTime() + minutes * 60 * 1000);
}

const formatHourAndMinute = (time) => {
    //hàm này dùng để format giờ và phút về đúng định dạng HH:mm
    if(typeof time != 'object') return ""
    let hour = time.getHours()
    let minute = time.getMinutes()
    minute = (minute < 10) ? `0${minute}` : minute
    hour = (hour < 10) ? `0${hour}` : hour
    return `${hour}:${minute}`
}

const handleAddShowtimeAfterBE = (pre, idRoom ,onDateSelect ,theaterState, idNew, titleMovie) => {
    if (!pre) return []

    return pre.map(room => {
        if (room.room_id == idRoom) {
            console.log(room)
            return {
                ...room,
                showtimes: [
                    ...(room.showtimes || []), 
                    {
                        id: idNew,
                        name: titleMovie,
                        startTime: `${onDateSelect} ${theaterState.startTime}`,
                        endTime: `${onDateSelect} ${theaterState.endTime}`,
                        sold: 0,
                    }
                ]
            }
        }
        return room
    })
}

const FromShowtime = ({setDataItem, dataItem, setDatas, onDateSelect}) => {
    const {showLoading, hideLoading} = useLoading()
    const [idTheater, setIdTheater] = useState("0")
    const [typeVND, setTypeVND] = useState(null)
    const [idMovie, setIdMovie] = useState("0")
    const [dataForm, setDataForm] = useState({})
    const [movieDuration, setMovieDuration]= useState(null)
    const [showtime, setShowtime] = useState({
        startTime: "",
        endTime:"",
        price: 0,
        max_tickets: 4,
        point: 1
    })

    useEffect(()=>{
        if(dataItem){
           
        }
        else{
            setShowtime({
                startTime: "",
                endTime:"",
                price: 0,
                max_tickets: 4,
                point: 1
            })
        }
        setIdMovie("0")
        setIdTheater("0")
    },[dataItem])

    useEffect(()=>{
        const getDataForm = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/movies/showtime','authen','GET')
                const res2 = await customeFetch(apiUserService.baseURL+'/branches/theaters','authen','GET')
                if(res.ok && res2.ok){
                    const data1 = await res.json()
                    const data2 = await res2.json()
                    setDataForm(
                        {
                            movies: data1,
                            theaters: data2,
                        }
                    )
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getDataForm()
    },[])

    const handleChangeSelect = (e) => {
        const {id, value} = e.target
        if(id){
            setIdMovie(value)
            setMovieDuration(getDuration(dataForm.movies, value))
            if(showtime.startTime){
                let endOfShowtime = addMinutes(new Date(`${onDateSelect} ${showtime.startTime}`), getDuration(dataForm.movies, value))
                setShowtime(pre => ({
                    ...pre,
                    endTime: formatHourAndMinute(endOfShowtime)
                }))
            }
        }
        else
            setIdTheater(value)
    }

    const handleOnChangeTime = (e) => {
        const { id, value } = e.target
        setShowtime(pre => {
            const nextState = { ...pre, [id]: value }
    
            if (movieDuration) {
                let endOfShowtime = null
    
                if (id === 'startTime') {
                    endOfShowtime = addMinutes(new Date(`${onDateSelect} ${value}`), movieDuration)
                    nextState.endTime = formatHourAndMinute(endOfShowtime)
                } 
               
            }
            return nextState
        })
    }

    const closeModal = (e) => {
        setDataItem(null)
    }

    const handleAddShowtime = async (e) => {
        e.preventDefault()
        showLoading()
        try{
            let method = 'POST'
            let dataForApi = {}
            if(dataItem.id){
                method = 'PUT'
            }
            else{
                dataForApi = {
                    distance_minutes: 5,
                    movie_id:Number(idMovie),
                    room_id:Number(idTheater),
                    start_time: `${onDateSelect} ${showtime.startTime}`,
                    price: Number(showtime.price),
                    max_tickets: showtime.max_tickets,
                    point: showtime.point,
                }
            }
            console.log(dataForApi)
            const res = await customeFetch(apiUserService.baseURL+'/showtimes','authen',method,JSON.stringify(dataForApi))
            if(res.ok){
                const data = await res.json()
                if(data.id){
                    setDatas( pre => {
                        return handleAddShowtimeAfterBE(pre, idTheater, onDateSelect ,showtime, data.id, getTitle(dataForm.movies, idMovie))
                    })
                    toast.success("Thêm suất chiếu thành công !")
                }
                else
                    toast.error(data.message)
            }
            else{
                const data = await res.json()
                toast.error(data.message)
            }   
            setDataItem(null)
        }
        catch(err){
            console.log(err)
        }
        hideLoading()
    }
    console.log(idMovie, idTheater)
    return <>
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-y-auto modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form className="p-8 space-y-8 min-w-[300px] w-[600px]" method="POST" onSubmit={handleAddShowtime}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-on-surface uppercase tracking-wider">Chọn phim đang chiếu</label>

                        <div className="relative">
                            <select 
                                id="movies"
                                value={idMovie}
                                onChange={handleChangeSelect}
                                className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none">
                                <option value="0">Chọn một bộ phim</option>
                                {
                                    dataForm?.movies?.map( item => <option key={item.id} value={item.id}>{`${item.title} - ${item.duration}'`}</option>)
                                }
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                                <ChevronDown size={20}/>
                            </span>
                        </div>
                        <p className="text-[11px] text-secondary">Phim phải được kích hoạt trong danh sách quản lý.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-on-surface uppercase tracking-wider">Phòng chiếu</label>
                        
                        <div className="relative">
                            <select 
                                value={idTheater}
                                onChange={handleChangeSelect}
                                className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none">
                                <option value="0">Chọn phòng</option>
                                {
                                    dataForm?.theaters?.map( item => <option key={item.id} value={item.id}>{item.name} - {item.TypeTheater?.type_name}</option>)
                                }
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
                                <ChevronDown size={20}/>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-low/50 p-6 rounded-xl space-y-6">
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">
                            <Clock size={20}/>
                        </span>Thời gian trình chiếu
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest">Ngày chiếu</label>
                            <input
                                className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                type="date"
                                id="date"
                                readOnly
                                value={onDateSelect}/>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest">Bắt đầu</label>
                            <input 
                                className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                                type="time"
                                id="startTime"
                                value={showtime?.startTime}
                                onChange={handleOnChangeTime}/>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest">Kết thúc (Dự kiến)</label>
                            <input 
                                className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                                type="time"
                                id="endTime"
                                value={showtime?.endTime}
                                readOnly
                                />
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-low/50 p-6 border-t border-outline-variant/20 flex items-center justify-start gap-4">
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest">Giá cho suất chiếu</label>
                        <input 
                            className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            type={typeVND == 'price' ? "number" : "text"}
                            id="price"
                            value={(typeVND == 'price') ? showtime?.price || "" : formatVND2(showtime?.price)}
                            onFocus={()=>setTypeVND('price')}
                            onBlur={()=>setTypeVND(null)}
                            onChange={handleOnChangeTime}
                            />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest">Số vé tối đa</label>
                        <input 
                            className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            type="number"
                            id="max_tickets"
                            value={showtime?.max_tickets}
                            onChange={handleOnChangeTime}
                            />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[11px] font-bold text-secondary uppercase tracking-widest">Điểm thưởng</label>
                        <input 
                            className="w-full bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            type="number"
                            id="point"
                            value={showtime?.point}
                            onChange={handleOnChangeTime}
                            />
                    </div>
                </div>

                <div className="pt-8 border-t border-outline-variant/20 flex items-center justify-end gap-4">
                    <button 
                        className="px-8 py-3 rounded-lg text-secondary font-bold hover:bg-surface-container transition-colors" 
                        type="button"
                        onClick={closeModal}>Hủy
                    </button>
                    <button className="px-10 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all" type="submit">
                                                    Lưu suất chiếu
                    </button>
                </div>
            </form>
        </div>
    </>
}

export default FromShowtime