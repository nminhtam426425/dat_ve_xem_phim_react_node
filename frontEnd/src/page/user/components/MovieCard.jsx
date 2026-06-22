import {PlayCircle, Star, Ticket} from "lucide-react"
import { useNavigate } from "react-router-dom"


const convertDuration = (duration) => {
    if(!duration) return ""
    return `${Math.floor(duration/60)}H ${duration%60}M`
}

const MovieCard = ({data, setTrailer}) => {
    const navigate = useNavigate()
    const goToDetail = (idMovie) => {
        navigate('/chi-tiet',{state:{idMovie}})
    }
    return  <div className="group movie-card" key={data.id}>
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 bg-surface-container">
            <img alt="Movie Poster" className="w-full h-full object-cover" src={data.poster_url == "" ? null : data.poster_url}/>

            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    className="w-full mb-3 py-3 rounded-lg bg-primary text-on-primary font-bold text-label-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    onClick={()=>goToDetail(data.id)}>
                    <span className="material-symbols-outlined text-[20px]" data-icon="confirmation_number">
                        <Ticket size={20}/>
                    </span>Đặt vé
                </button>
                <button 
                    className="w-full py-3 rounded-lg border-2 border-white text-white font-bold text-label-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    onClick={()=>setTrailer(data.trailer_url)}>
                    <span className="material-symbols-outlined text-[20px]" data-icon="play_circle">
                        <PlayCircle size={20}/>
                    </span>Xem trailer
                </button>
            </div>

            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-primary text-[16px]">
                    <Star size={20}/>
                </span>
                <span className="text-label-bold text-white">{data.score}</span>
            </div>
        </div>

        <div className="mt-4">
            <h3 className="text-headline-md text-white text-[12px] truncate">{data.name}</h3>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-label-sm text-secondary tracking-widest uppercase">{convertDuration(data.duration)}</span>
            </div>
        </div>
    </div>
}

export default MovieCard