import { ArrowBigLeft, ArrowBigRight, ChevronRight, Star, PlayCircle, Ticket, BellRing } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../validate"
import Category from "./Category"
import MovieCard from "./MovieCard"

const datas = {
    trending: {
        id:'90',
        name:'Mưa đỏ',
        description: "Bộ phim về cuộc chiến 72 ngày đêm bảo vệ thành cổ trước bàn đàm phán Paris về chấm dứt chiến tranh ở Việt Nam.",
        poster_url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/bda5e6232709307.68a21568c92f9.jpg'
    },
    showing: [ {
        id:'1',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781576595/wipumvlssypyc4unhopo.jpg',
        score: 9.8, 
        name:'Tài',
        duration: 108,
        trailer_url: "https://youtu.be/HyaRaYwgQ-A?si=McZd1RBC0ejzYn0r"
    },
    {
        id:'2',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577052/tw6r4ges4lu20gpcjcnb.jpg',
        score: 9.8, 
        name:'Always you',
        duration: 108,
        trailer_url: "https://youtu.be/A5slMlYAIXQ?si=dx1dQWS_xKQzH6X7" 
    },
    {
        id:'3',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577077/aykksx2dgpgavpya2xsx.jpg',
        score: 9.8, 
        name:'Thanh gươm diệt quỷ - Chuyến tàu vô tận',
        duration: 108,
        trailer_url: "https://youtu.be/sAU6Istwz6c?si=CloaDFtlpimHUH_M" 
    },
    {
        id:'4',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577108/yazobphz9qfzmonjyrlf.jpg',
        score: 9.8, 
        name:'Tôi thấy hoa vàng trên cỏ xanh',
        duration: 108,
        trailer_url: "https://youtu.be/wmjiCP6R-7I?si=pLxCw7cqDhLK_JYO" 
    },
    {
        id:'5',
        poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577297/xkwxfkalapgomhihpy9n.jpg',
        score: 9.0, 
        name:'Địa đạo',
        duration: 108,
        trailer_url: "https://youtu.be/HyaRaYwgQ-A?si=2lhqGKk41-61I__U"
    }],
    coming_soon: [
        {
            id:'6',
            poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577345/jhym7b2qzhy12lrvzuhb.png',
            name: 'Nobita và Lâu đài dưới đáy biển',
            release_date: '2026-10-10'
        },
        {
            id:'7',
            poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577381/sq1tnltqbc8ovgmkpks0.png',
            name: 'Train To Busan',
            release_date: '2026-10-10'
        },
        {
            id:'8',
            poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781577412/oq8e5b5pa8kcgx665csh.jpg',
            name: 'Vô hạn thành',
            release_date: '2026-10-10'
        },
        {
            id:'9',
            poster_url: 'https://res.cloudinary.com/dq8bb1xdl/image/upload/v1781671502/i4pwk3ddvfnyhfoztxa7.jpg',
            name: 'Dòng thời gian đen tối',
            release_date: '2026-10-10'
        },
    ]
}
const ContentHome = ({setTrailer}) => {
    const navigate = useNavigate()
    const goToListByCategory = (idCagory) => {
        navigate('/danh-sach',{state: {idMovie: idCagory}})
    }

    return <>
        <main className="bg-zinc-950">
            <section className="mx-auto relative h-[700px] w-[full] flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Main Featured Movie" className="w-full h-full object-fit" src={datas.trending.poster_url == "" ? null : datas.trending.poster_url}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background2 via-background2/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background2 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 md:px-12 pb-24">
                    <div className="max-w-2xl space-y-6">
                        <div className="flex items-center space-x-3">
                            <span className="bg-primary-container px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-white">Trending Now</span>
                            <span className="text-zinc-400 font-label-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-red-600 text-sm" data-icon="star">
                                    <Star size={20}/>
                                </span> 10.0 Rating
                            </span>
                        </div>

                        <h1 className="font-headline-xl text-white">{datas.trending.name}</h1>
                        <p className="text-zinc-300 font-body-lg line-clamp-3">
                            {datas.trending.description}
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4">
                            <button 
                                className="bg-primary-container hover:bg-red-700 text-white font-label-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-all active:scale-95"
                                onClick={()=>goToListByCategory(datas.trending.id)}>
                                <span className="material-symbols-outlined" data-icon="confirmation_number">
                                    <Ticket size={20}/>
                                </span>
                                                            Mua vé
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-label-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-all active:scale-95">
                                <span className="material-symbols-outlined" data-icon="play_circle">
                                    <PlayCircle size={20}/>
                                </span>
                                                            Xem trailer
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
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {
                        datas?.showing?.map( item => <MovieCard key={item.id} data={item} setTrailer={setTrailer}/>)
                    }
                </div>
            </section>
        
            <section className="py-section-gap px-4 md:px-12 max-w-[1280px] mx-auto bg-zinc-950/50 rounded-3xl border border-zinc-900/50">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-headline-lg text-white">Sắp chiếu</h2>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-red-600 hover:text-red-600 transition-colors">
                            <span className="material-symbols-outlined" data-icon="arrow_back">
                                <ArrowBigLeft size={20}/>
                            </span>
                        </button>
                        <button className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-red-600 hover:text-red-600 transition-colors">
                            <span className="material-symbols-outlined" data-icon="arrow_forward">
                                <ArrowBigRight size={20}/>
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        datas?.coming_soon?.map( item => 
                            <div className="space-y-4" key={item?.id}>
                                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900">
                                    <img alt="Soon 1" className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500" src={item.poster_url == "" ? null : item.poster_url}/>
                                </div>
                                <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-white font-label-bold">{item.name}</h4>
                                    <p className="text-zinc-500 text-xs">{formatDate(item.release_date)}</p>
                                </div>
                                <button className="text-red-600">
                                    <span className="material-symbols-outlined" data-icon="notifications">
                                        <BellRing size={20}/>
                                    </span>
                                </button>
                            </div>
                        </div>
                        )
                    }
                </div>
            </section>
        </main>
    </>
}

export default ContentHome