import { Camera, LogOut, Pencil, Ticket, TrendingUp, User } from "lucide-react"

const ContentProfileUser = () => {
    return <main className="w-full bg-background2">
        <section className="relative h-[400px] w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img className="w-full h-full object-cover opacity-60" data-alt="avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-5nnYu-alz9XEoqtoKIMsYujdtbfVkYoxQdT9wGiEqb4SlYm6BdSkKDoRhprm2jbkU83nkCYXaugGqV5tCwIVsUkzBFOGbpdUo6GICN7ykzl_Md0WZqc9Vo9vKdLpVgkgVYLQ5ktZF-JzoG2oidvpo5aoaag7bHvEFAyIjLA9FpkKJa1tZ3Hnw0wWYZHMr7iAXpbZG5f0FlzLIzDTh3-kY4XAzJ1WTQRMGFQ_I1dOe-Qif0ryWIdesRk2KGQs9Q_AP2mtG9uuYHs"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background2 via-background2/60 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-container-max mx-auto px-gutter h-full flex flex-col justify-end pb-12">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-zinc-900 shadow-xl overflow-hidden bg-zinc-900">
                            <img alt="Profile Avatar" className="w-full h-full object-cover" src={null}/>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-primary text-on-primary rounded-full shadow-lg hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined">
                                <Camera size={20}/>
                            </span>
                        </button>
                    </div>
                    <div className="text-center md:text-left pb-2">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="font-headline-xl text-headline-xl text-white">Nguyễn Minh Quân</h1>
                        </div>
                        <p className="font-body-lg text-secondary mt-1">quan.nm@cinereserve.vn • Thành viên từ tháng 10, 2023</p>
                    </div>
                </div>
            </div>
        </section>

        <div className="max-w-container-max mx-auto px-gutter py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                <aside className="w-full lg:w-72 flex flex-col gap-2">
                    <button className="flex items-center gap-4 px-6 py-4 rounded-xl bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all">
                        <span className="material-symbols-outlined" data-weight="fill">
                            <User size={20}/>
                        </span>
                        <span className="font-label-bold">Thông tin cá nhân</span>
                    </button>

                    <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-error-container/20 transition-all">
                        <span className="material-symbols-outlined">
                            <Ticket size={20}/>
                        </span>
                        <span className="font-label-bold">Lịch sử đặt vé</span>
                    </button>

                    <div className="mt-4 pt-4 border-t border-outline-variant/30">
                        <button className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-error-container/20 transition-all w-full">
                            <span className="material-symbols-outlined">
                                <LogOut size={20}/>
                            </span>
                            <span className="font-label-bold">Đăng xuất</span>
                        </button>
                    </div>
                </aside>

                <section className="flex-1 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-zinc-900 border border-outline-variant/10 flex flex-col gap-2">
                            <span className="text-white font-label-bold uppercase text-[12px]">Tổng chi tiêu</span>
                            <span className="font-headline-md text-primary">2.450.000đ</span>
                            <div className="flex items-center gap-1 text-[12px] text-green-400 font-bold">
                                <span className="material-symbols-outlined text-[16px]">
                                    <TrendingUp size={20}/>
                                </span>
                                12% tháng này
                            </div>
                        </div>
                        <div className="p-6 rounded-xl bg-zinc-900 border border-outline-variant/10 flex flex-col gap-2">
                            <span className="text-white font-label-bold uppercase text-[12px]">Số vé đã xem</span>
                            <span className="font-headline-md text-white">24 Vé</span>
                            <div className="flex items-center gap-1 text-[12px] text-white font-bold">
                                Hạng: Bạch Kim
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-zinc-900 border border-outline-variant/10 flex flex-col gap-2">
                            <span className="text-white font-label-bold uppercase text-[12px]">Điểm thưởng</span>
                            <span className="font-headline-md text-white">1.280 Pts</span>
                            <div className="flex items-center gap-1 text-[12px] text-primary font-bold">
                                Đổi quà ngay
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-zinc-900 border border-outline-variant/20 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline-md text-white">Thông tin cá nhân</h2>
                            <button className="flex items-center gap-2 px-4 py-2 border border-secondary text-white rounded-lg font-label-bold hover:border-primary hover:text-primary transition-all">
                            <span className="material-symbols-outlined text-[18px]">
                                <Pencil size={20}/>
                            </span>
                                Chỉnh sửa
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Họ và tên</label>
                                <p className="font-body-lg text-primary border-b border-outline-variant/10 pb-2">Nguyễn Minh Quân</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Email</label>
                                <p className="font-body-lg text-primary border-b border-outline-variant/10 pb-2">quan.nm@cinereserve.vn</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Số điện thoại</label>
                                <p className="font-body-lg text-primary border-b border-outline-variant/10 pb-2">+84 908 123 456</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-label-bold text-white uppercase">Ngày sinh</label>
                                <p className="font-body-lg text-primary border-b border-outline-variant/10 pb-2">15 / 08 / 1995</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-headline-md text-white">Hoạt động gần đây</h3>
                        <div className="space-y-3">
                            <div className="flex items-center p-4 rounded-xl bg-zinc-900 border border-outline-variant/10 hover:border-primary/50 transition-all cursor-pointer">
                            <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                            <img className="w-full h-full object-cover" data-alt="A striking movie poster featuring a futuristic city skyline in vibrant neon blues and pinks, designed with a high-end minimalist editorial style. The composition is balanced and professional, utilizing soft light-mode shadows and crisp typography. The atmosphere is one of high-tech cinematic immersion, blending modern design with a premium entertainment feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8LOy8ePykoxdgYiGeyhWS9SoV1vnt-LfvDFTXF-HhnOCEh0dBc4UUgx-TaFZvTyfyHgDfhTz12o__xeQK3seizdfeO6rSXifpQK9IdLNX0VI8oh05ahscwdCZWL4df9gfaaKVkeLYA44OLuV6OjOIfYXEhzoEzkoTra2JwajnfB4CJMLBckS9r5IkbXpnpGAPTg5ilcxy75YexXn3gpkhGFxXYhYXKwlZZXNh4JMoBaDzFbw2UvnSuui8fVhU-EECvTxd8vOpqC8"/>
                            </div>
                            <div className="ml-6 flex-1">
                            <h4 className="font-label-bold text-white">Dune: Part Two</h4>
                            <p className="text-[13px] text-secondary">Rạp 04 • Ghế H12, H13 • 19:30, 24/05/2024</p>
                            <span className="mt-1 inline-block px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-[11px] font-bold">ĐÃ HOÀN THÀNH</span>
                            </div>
                            <div className="text-right">
                            <p className="font-label-bold text-white">240.000đ</p>
                            <button className="text-primary text-[12px] font-label-bold hover:underline">Chi tiết</button>
                            </div>
                            </div>

                            <div className="flex items-center p-4 rounded-xl bg-zinc-900 border border-outline-variant/10 hover:border-primary/50 transition-all cursor-pointer">
                                <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
                                    <img className="w-full h-full object-cover" data-alt="A professional movie poster showcasing a dramatic close-up of an actor's face, bathed in high-contrast cinematic lighting with a sophisticated monochromatic palette and deep red accents. The style is modern and minimalist, reflecting a gallery-quality editorial layout. The background is clean and bright, maintaining a light-mode aesthetic while emphasizing the emotional intensity of the subject." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtXddVhIA9SBA1SSg0n4Lekv68fBNTiTl9Yl7rDJ9pXl3Q_ovzi8wvHLsoqakCEC6izplpeYscB5QAmzUHuhZ8NJWvH_wlOA1SItlmgMWq1emhOyIN1GCORfG_ukaQp_gcZ3uSRq5yjR9Yru48UCaZ-9uduIJwwwvpw_fPOBrfv-w87VItowb_c1Du4jxUgpMfAk3_5xhc-DnBwVnVCihIT71c05Jvt3DnOgvkKdDigooyiznFH6bKlid2wKBsBKKW-zvCDfE5Wh8"/>
                                </div>

                                <div className="ml-6 flex-1">
                                    <h4 className="font-label-bold text-white">Oppenheimer</h4>
                                    <p className="text-[13px] text-secondary">IMAX • Ghế J08 • 14:00, 18/05/2024</p>
                                    <span className="mt-1 inline-block px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-[11px] font-bold">ĐÃ HOÀN THÀNH</span>
                                </div>

                                <div className="text-right">
                                    <p className="font-label-bold text-white">180.000đ</p>
                                    <button className="text-primary text-[12px] font-label-bold hover:underline">Chi tiết</button>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-3 rounded-xl border-2 border-dashed border-zinc-800 text-secondary font-label-bold hover:bg-zinc-900 hover:text-white transition-all">
                            Xem tất cả lịch sử
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </main>
}

export default ContentProfileUser