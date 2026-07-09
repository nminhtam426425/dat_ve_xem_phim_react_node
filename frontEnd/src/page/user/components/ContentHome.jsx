import { ChevronRight, Star, PlayCircle, Ticket } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Category from "./Category"
import MovieCard from "./MovieCard"
import MovieComing from "./MovieComing"
import Gallery from "./Gallery"

const ContentHome = ({setTrailer, dataRender, trending}) => {
    const navigate = useNavigate()

    const goToListByCategory = (idCagory) => {
        navigate('/danh-sach',{state: {idMovie: idCagory}})
    }

    const goToDetail = (idMovie) => {
        navigate('/chi-tiet',{state:{idMovie}})
    }
    
    return <>
        <main className="bg-zinc-950">
            <section className="mx-auto relative h-[-300px] md:h-[700px] w-[full] flex items-end overflow-hidden p-2 md:px-12 max-w-[1280px] mx-auto">
                <div className="absolute inset-0 z-0">
                    <img alt="Main Featured Movie" className="w-full h-full object-fit" src={trending.background_url == "" ? null : trending.background_url}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background2 via-background2/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background2 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto w-full md:pb-24">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex items-center space-x-3">
                            <span className="bg-primary-container px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-white">Trending Now</span>
                            <span className="text-zinc-400 font-label-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-red-600 text-sm" data-icon="star">
                                    <Star size={20}/>
                                </span> 10.0 Rating
                            </span>
                        </div>

                        <h1 className="font-headline-xl text-white">{trending.title}</h1>
                        <p className="text-zinc-300 font-body-lg line-clamp-3">
                            {trending.description}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4">
                            <button 
                                className="bg-primary-container hover:bg-red-700 text-white font-label-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-all active:scale-95"
                                onClick={()=>goToDetail(trending.id)}>
                                <span className="material-symbols-outlined" data-icon="confirmation_number">
                                    <Ticket size={20}/>
                                </span>Mua vé
                            </button>
                            <button 
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-label-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-all active:scale-95"
                                onClick={()=>setTrailer(trending.trailer_url)}>
                                <span className="material-symbols-outlined" data-icon="play_circle">
                                    <PlayCircle size={20}/>
                                </span>Xem trailer
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        
            <div className="px-4 md:px-12 max-w-[1280px] mx-auto">
                <Category type="router"/>
            </div>
        
            <section className="py-section-gap px-4 md:px-12 max-w-[1280px] mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="font-headline-lg text-white">Đang chiếu</h2>
                    </div>
                    <button 
                        className="text-red-600 font-label-bold flex items-center gap-1 hover:underline" 
                        onClick={()=>goToListByCategory('none')}> Xem tất cả <span className="material-symbols-outlined text-sm" data-icon="chevron_right">
                            <ChevronRight size={20}/>
                        </span>
                    </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {
                        dataRender?.map( item => <MovieCard key={item.id} data={item} setTrailer={setTrailer}/>)
                    }
                </div>
            </section>
        
            <section className="py-section-gap px-4 md:px-12 max-w-[1280px] mx-auto bg-zinc-950/50 rounded-3xl border border-zinc-900/50">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-headline-lg text-white">Sắp chiếu</h2>
                </div>

                <Gallery datas={dataRender?.coming_soon} typElement="movieComing"/>
            </section>
        </main>
    </>
}

export default ContentHome