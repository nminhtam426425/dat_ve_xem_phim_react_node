import { ArrowRight, Calendar, Clock, MapPin, PlayCircle, Star } from "lucide-react"

const showtime = [
    {
        name: 'Phòng chiếu 1'
    },
    {

    }
]
const ContentDetail = () => {
    return <main className="bg-background2">
         <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4 top-24">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
                        <img alt="Movie Poster" className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A high-contrast movie poster for a dramatic sci-fi film featuring a solitary figure standing on a neon-lit futuristic street. The lighting is dominated by deep reds and cool blues, reflecting off wet pavement. The overall mood is mysterious and cinematic, with a dark charcoal background that integrates perfectly with a premium dark-themed UI. Subtle atmospheric fog and glowing geometric elements add depth and a sophisticated digital art style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAykN8_eaDQWFEfBBWg96hCUl54tvKJJEH4-vYI20jo_yjHf-0t-k_9JngIHWrbJN_imLgj0rQ9BKiyIrFmZOrZqu9qLve9SyhiJi_RhtB1KKYw4qG2mssP0FFYsyR459LhYkUvmTp0Kf19TdzQ1wf1nUz4os0gDWZdWPXvTIOG5wtOFoPBngh9z0RQus31DiY9-pJyEWdJBY1xET_C3_pfSzGFq5OI-HrAmwtvuQLvI3r3uAXveq8NGS-v1mb3XqKSD95qb2opfks"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-primary-container text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">Đang chiếu</span>
                            <span className="flex items-center gap-1 text-primary font-bold"><span className="material-symbols-outlined text-sm">
                                <Star size={20}/>
                            </span> 8.9/10</span>
                        </div>
                        <h1 className="font-headline-xl text-headline-xl text-white">Tên phim</h1>
                        <div className="flex flex-wrap gap-4 text-zinc-400 font-body-md">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-zinc-500">
                                <Clock size={20}/>
                            </span>THời lượng</span>
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-zinc-500">
                                <Calendar size={20}/></span> 24 Oct, 2024</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-zinc-500 font-label-bold uppercase">The Story</h3>
                        <p className="font-body-md text-zinc-300 leading-relaxed max-w-none">
                                                    Nội dung phim</p>
                        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-zinc-500 font-label-sm uppercase">Director</p>
                                <p className="text-white font-medium">Đạo diễn</p>
                            </div>
                            <div>
                                <p className="text-zinc-500 font-label-sm uppercase">Cast</p>
                                <p className="text-white font-medium">Diễn viên chính</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row gap-4 items-center">
                        <button className="bg-primary-container hover:bg-red-700 text-white font-headline-md py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center gap-3 w-full md:w-auto justify-center shadow-2xl shadow-red-900/20">
                            Book Tickets Now
                            <span className="material-symbols-outlined">
                                <ArrowRight size={20}/>
                            </span>
                        </button>
                        <button className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-headline-md py-4 px-12 rounded-xl transition-all active:scale-95 flex items-center gap-3 w-full md:w-auto justify-center">
                        <span className="material-symbols-outlined">
                            <PlayCircle size={20}/>
                        </span>
                                Watch Trailer
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
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl bg-primary-container text-white border border-primary-container">
                            <span className="text-xl font-bold">18/6</span>
                            <span className="text-[10px] font-medium opacity-80 uppercase">Năm</span>
                        </button>

                        <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <span className="text-xl font-bold">19/6</span>
                            <span className="text-[10px] font-medium opacity-80 uppercase">Sáu</span>
                        </button>

                        <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <span className="text-xl font-bold">20/6</span>
                            <span className="text-[10px] font-medium opacity-80 uppercase">Bảy</span>
                        </button>

                        <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 transition-colors">
                            <span className="text-xl font-bold">21/6</span>
                            <span className="text-[10px] font-medium opacity-80 uppercase">Chủ nhật</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="glass-panel-2 p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="min-w-[240px] space-y-1">
                            <h4 className="text-white font-headline-md">Tên rạp</h4>
                            <p className="text-zinc-500 font-label-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">
                                <MapPin size={20}/>  
                            </span>Vị trí</p>
                        </div>

                        <div className="flex-1 flex flex-wrap gap-3">
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">10:30 AM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">13:45 PM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">16:30 PM</button>
                            
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">10:45 PM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">16:30 PM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">20:00 PM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">22:45 PM</button>
                        
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-zinc-500 font-label-sm uppercase">Loại phòng chiếu</span>
                            <div className="flex gap-2 mt-1">
                                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-1 rounded">IMAX</span>
                                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-1 rounded">ATMOS</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="glass-panel-2 p-6 rounded-2xl flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="min-w-[240px] space-y-1">
                            <h4 className="text-white font-headline-md">Tên rạp</h4>
                            <p className="text-zinc-500 font-label-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">
                                <MapPin size={20}/>    
                            </span>Vị trí</p>
                        </div>

                        <div className="flex-1 flex flex-wrap gap-3">
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">11:00 AM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">14:15 PM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">17:30 PM</button>
                            <button className="px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-primary hover:text-primary transition-all font-medium">21:15 PM</button>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-zinc-500 font-label-sm uppercase">Loại phòng chiếu</span>
                            <div className="flex gap-2 mt-1">
                                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-1 rounded">2D</span>
                                <span className="bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-1 rounded">3D</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
}

export default ContentDetail