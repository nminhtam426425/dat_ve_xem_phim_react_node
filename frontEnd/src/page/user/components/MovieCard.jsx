import {PlayCircle, Ticket} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const convertDuration = (duration) => {
    if(!duration) return ""
    return `${Math.floor(duration/60)} giờ ${duration%60} phút`
}

const MovieCard = ({data, setTrailer}) => {
    const navigate = useNavigate()
    // cho mobile khi click hiện 2 button đặt vé và xem traler
    const [isClick, setIsClick] = useState(false)

    const goToDetail = (idMovie) => {
        navigate('/chi-tiet',{state:{idMovie}})
    }
    
    return  <div className="group movie-card" key={data.id} onClick={()=>setIsClick(pre => !pre)}>
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 md:group-hover:-translate-y-2 bg-surface-container">
            <img alt="Movie Poster" className="w-full h-full object-cover" src={data.poster_url == "" ? null : data.poster_url}/>

            <div className={`
                    absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 transition-all duration-300
                    ${isClick 
                    ? 'opacity-100'
                    : 'hidden opacity-0'} md:flex md:opacity-0 md:group-hover:opacity-100`}>
                <button 
                    className="w-full mb-3 py-3 rounded-lg bg-primary text-on-primary font-bold text-label-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    onClick={()=>goToDetail(data.id)}>
                    <span className="material-symbols-outlined text-[14px] md:text-[16px]" data-icon="confirmation_number">
                        <Ticket size={20}/>
                    </span>Đặt vé
                </button>
                <button 
                    className="w-full py-3 rounded-lg border-2 border-white text-white font-bold text-label-bold flex items-center justify-center gap-1 sm:gap-2 hover:bg-white/10 transition-colors"
                    onClick={()=>setTrailer(data.trailer_url)}>
                    <span className="material-symbols-outlined text-[10px] md:text-[20px]" data-icon="play_circle">
                        <PlayCircle size={20}/>
                    </span><span className="material-symbols-outlined text-[12px] md:text-[14px]">Xem trailer</span>
                </button>
            </div>
        </div>

        <div className="mt-4">
            <h3 className="text-headline-md text-white text-[12px] truncate">{data.title}</h3>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-label-sm text-secondary tracking-widest uppercase">{convertDuration(data.duration)}</span>
            </div>
        </div>
    </div>
}

export default MovieCard