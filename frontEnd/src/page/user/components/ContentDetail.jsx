import { ArrowRight, Calendar, Clock, MapPin, PlayCircle, Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { formatDate } from "../../validate"
import { useNavigate, Link } from "react-router-dom"
import Gallery from "./Gallery"
import { customeFetch, apiUserService } from "../../config"

const checkDateRelease = (date) => {
    if(!date) return ""
    let tempDate = new Date()
    let release = new Date(date)
    if(tempDate - release >= 0)
        return "Đang chiếu tại rạp"
    return formatDate(date)
}

const formatShowtimeInfo = (showtime) => {
    if(!showtime) return ""
    return `${showtime.start_time.substr(11, 5)} - ${showtime.price/1000}K` 
}
const ContentDetail = ({movie, setTrailer, dateChosen, setDateChosen, showtimeOfMovie}) => {
    const navigate = useNavigate()
    const targetShowtime = useRef(null)
    const [movieByCates, setMovieByCates] = useState([])

    const goToTicket = (showtime, movie) => {
        navigate('/chon-ghe',{state:{showtime, movie}})
    }

    useEffect(()=>{
        const getDatasGallery = async () => {
            try{
                let idCates = movie?.Categories?.map(item => item.id) || []
                if(idCates.length >= 1){
                    const res = await customeFetch(
                        apiUserService.baseURL+'/showtimes/movies/cates',
                        'non-authen',
                        'POST',
                        JSON.stringify(idCates)
                    )
                    if(res.ok){
                        const data = await res.json()
                        setMovieByCates(data.filter(item => item.id != movie?.id))
                    }
                }
            }   
            catch(err){
                console.log(err)
            }
        }
        getDatasGallery()
    },[movie])

    const scrollToElement = () => {
        if (targetShowtime.current) {
            targetShowtime.current.scrollIntoView(
                { 
                    behavior: 'smooth'
                }
            )
        }
    }

    return <main className="bg-background2">
         <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4 top-24">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
                        <img alt="Movie Poster" className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105" src={movie?.poster_url == "" ? null : movie?.poster_url}/>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-primary-container text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">Đang chiếu</span>
                            <span className="flex items-center gap-1 text-primary font-bold"><span className="material-symbols-outlined text-sm">
                                <Star size={20}/>
                            </span> {movie?.score || 10.0}/10.0</span>
                        </div>
                        <h1 className="font-headline-xl text-headline-lg text-white">{movie?.title}</h1>
                        <div className="flex flex-wrap gap-4 text-zinc-400 font-body-md">
                            <span className="flex items-center gap-2 text-white font-medium uppercase"><span className="text-white font-medium uppercase">
                                <Clock size={20}/>
                            </span>Thời lượng: {movie?.duration}'</span>
                            <span className="flex items-center gap-2 text-white font-medium uppercase"><span className="text-white font-medium uppercase">
                                <Calendar size={20}/></span>{checkDateRelease(movie?.release_date)}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white font-medium uppercase"> Nội dung phim</h3>
                        <textarea 
                            className="w-full font-body-md text-zinc-300 leading-relaxed max-w-none border rounded-lg p-2" 
                            rows="6"
                            value={movie?.description || '1 bộ phim dựa trên câu chuyện không có thật về 1 loài có thật....'}
                            readOnly>
                        </textarea>
                        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-white font-medium uppercase">Đạo diễn</p>
                                <p className="text-zinc-500 font-label-sm">{movie?.director}</p>
                            </div>
                            <div>
                                <p className="text-white font-medium uppercase">Diễn viên chính</p>
                                <p className="text-zinc-500 font-label-sm">{movie?.actor}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row gap-4 items-center"  ref={targetShowtime}>
                        <button 
                            className="bg-primary-container hover:bg-red-700 text-white font-headline-md py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center gap-3 w-full md:w-auto justify-center shadow-2xl shadow-red-900/20"
                            onClick={scrollToElement}>
                            Đặt vé ngay
                            <span className="material-symbols-outlined">
                                <ArrowRight size={20}/>
                            </span>
                        </button>
                        <button 
                            className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-headline-md py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center gap-3 w-full md:w-auto justify-center"
                            onClick={()=>setTrailer(movie?.trailer_url)}>
                            <span className="material-symbols-outlined">
                                <PlayCircle size={20}/>
                            </span>Xem Trailer
                        </button>
                    </div>
                </div>
            </section>
        
            <section className="mt-section-gap space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="font-headline-lg text-headline-lg text-white">Chọn suất chiếu</h2>
                        <p className="text-zinc-500 font-body-md">Chọn rạp chiếu&nbsp;</p>
                    </div>
                    
                    <DateSelector dateChosen={dateChosen} setDateChosen={setDateChosen}/>
                    
                </div>

                <div className="space-y-4" >
                    {
                        showtimeOfMovie.length == 0
                        ?
                        <span className="text-white">Không có suất chiếu ngày {formatDate(dateChosen)}</span>
                        :
                        showtimeOfMovie?.map(item => 
                            <div className="glass-panel-2 p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center border hover:border-primary">
                                 <div className="min-w-[240px] space-y-1">
                                    <h4 className="text-white font-headline-md">{item?.name}</h4>
                                    <p className="text-zinc-500 font-label-sm flex items-center gap-1">
                                        <Link 
                                            to="/thong-tin-rap"
                                            target="_blank"
                                            className="material-symbols-outlined text-sm flex">
                                            <span><MapPin size={20}/></span> Vị trí
                                        </Link>
                                    </p>
                                </div>

                                <div className="flex-1 flex flex-wrap gap-3">
                                    {
                                        item?.Showtimes?.map(item => 
                                            <button 
                                                key={item.id}
                                                className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium"
                                                onClick={()=>goToTicket(item, movie)}>
                                                    {formatShowtimeInfo(item)}
                                            </button>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-zinc-300 font-label-sm uppercase">Loại phòng chiếu</span>
                                    <div className="flex gap-2 mt-1">
                                        <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-1 rounded">{item?.TypeTheater?.type_name}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>

            <section className="mt-section-gap space-y-8">
                <Gallery datas={movieByCates} typElement="movieCard"/>
            </section>
        </div>
    </main>
}

const DateSelector = ({dateChosen, setDateChosen}) => {
    const getNextFourDays = ()=> {
        const days = []
        const daysOfWeek = ['CNhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

        for (let i = 0; i < 4; i++) {
            let current = new Date() 
            days.push({
                fullDate: current.setDate(current.getDate() + i), 
                dayLabel: daysOfWeek[current.getDay()], 
                dateNumber: current.getDate()+'/'+(current.getMonth()+1), 
                id: current.toISOString().split('T')[0] 
            })
        }
        return days
    }

    const [date] = useState(getNextFourDays())

    return <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {
            date.map(item => <>
                <button 
                    key={item.id+'abc'}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl border 
                    ${item.id == dateChosen
                        ? 'bg-primary-container text-white border-primary-container' 
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 transition-colors'}`
                    }
                    onClick={()=>setDateChosen(item.id)}>
                    <span className="text-xl font-bold">{item.dateNumber}</span>
                    <span className="text-[10px] font-medium opacity-80 uppercase">{item.dayLabel}</span>
                </button>
            </>)
        }

    </div>
}

export default ContentDetail