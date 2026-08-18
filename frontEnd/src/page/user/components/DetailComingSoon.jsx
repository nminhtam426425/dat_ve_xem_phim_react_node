import { Calendar, Clock, PlayCircle } from "lucide-react"
import { formatDate } from "../../validate"

const checkDateRelease = (date) => {
    if(!date) return ""
    let tempDate = new Date()
    let release = new Date(date)
    if(tempDate - release >= 0)
        return "Đang chiếu tại rạp"
    let temp = formatDate(date)
    return "Khởi chiếu tại rạp vào ngày: "+temp
}

const DetailComingSoon = ({movie, setTrailer}) => {
    const convertDuration = (duration) => {
        if(!duration) return ""
        return `${Math.floor(duration/60)} giờ ${duration%60} phút`
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
                            <span className="bg-primary-container text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">Sắp chiếu</span>
                           
                        </div>
                        <h1 className="font-headline-xl text-headline-lg text-white">{movie?.title}</h1>
                        <div className="flex flex-wrap gap-4 text-zinc-400 font-body-md">
                            <span className="flex items-center gap-2 text-white font-medium uppercase"><span className="text-white font-medium uppercase">
                                <Clock size={20}/>
                            </span>Thời lượng: {convertDuration(movie?.duration)}</span>
                            <span className="flex items-center gap-2 text-white font-medium uppercase"><span className="text-white font-medium uppercase">
                                <Calendar size={20}/></span>{checkDateRelease(movie?.release_date)}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-white font-medium uppercase"> Nội dung phim</h3>
                        <textarea 
                            className="w-full font-body-md text-zinc-300 leading-relaxed max-w-none border rounded-lg p-2" 
                            rows={6}
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

                    <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row gap-4 items-center" >
                        {/* <button 
                            className="bg-primary-container hover:bg-red-700 text-white font-headline-md py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center gap-3 w-full md:w-auto justify-center shadow-2xl shadow-red-900/20"
                            onClick={scrollToElement}>
                            Đặt vé ngay
                            <span className="material-symbols-outlined">
                                <ArrowRight size={20}/>
                            </span>
                        </button> */}
                        <button 
                            className="border border-red-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-headline-md py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center gap-3 w-full md:w-auto justify-center"
                            onClick={()=>setTrailer(movie?.trailer_url)}>
                            <span className="material-symbols-outlined">
                                <PlayCircle size={20}/>
                            </span>Xem Trailer
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>
}

export default DetailComingSoon