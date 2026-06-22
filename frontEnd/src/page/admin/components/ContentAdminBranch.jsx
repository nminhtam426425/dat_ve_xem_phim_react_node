import {TrendingUp, DollarSign,Ticket, User2, TrendingDown, Percent, UserPlus, ShoppingCart} from "lucide-react"
import ChartAdminBranch from "./ChartAdminBranch"

const ContentAdminBranch = () => {
    return <>
         <div className="p-8 space-y-8 max-w-container-max mx-auto w-full">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary-container/10 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="payments">
                                <DollarSign size={20}/>
                            </span>
                        </div>
                        
                        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">
                                <TrendingUp size={20}/>
                            </span>+12.5%
                        </span>
                    </div>

                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Doanh thu tuần</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">1.250.000.000đ</h3>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-secondary-container rounded-lg text-on-secondary-container group-hover:bg-on-secondary-container group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="confirmation_number">
                                <Ticket size={20}/>
                            </span>
                        </div>

                        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">
                                <TrendingUp size={20}/>
                            </span>+8.2%
                        </span>
                    </div>
                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Số vé đã bán</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">8.420</h3>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed group-hover:bg-on-tertiary-fixed group-hover:text-white transition-all">
                            <span className="material-symbols-outlined" data-icon="group">
                                <User2 size={20}/>
                            </span>
                        </div>
                        <span className="flex items-center text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_up">
                                <TrendingUp size={20}/>
                            </span>+4.1%
                        </span>
                    </div>

                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Khách hàng mới</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">1.150</h3>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-surface-container-highest rounded-lg text-on-surface group-hover:bg-primary-container group-hover:text-white transition-all">
                             <span className="material-symbols-outlined" data-icon="percent">
                                <Percent size={20}/>
                             </span>
                        </div>  
                        <span className="flex items-center text-xs font-bold text-error bg-error/5 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs mr-1" data-icon="trending_down">
                                <TrendingDown size={20}/>
                            </span>-2.4%
                        </span>
                    </div>

                    <p className="text-secondary font-label-bold text-sm mb-1 uppercase tracking-wider">Tỷ lệ lấp đầy</p>
                    <h3 className="font-headline-md text-headline-md text-on-surface">68.5%</h3>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-headline-md text-lg font-bold text-on-surface">Xu hướng doanh thu tuần</h3>
                            <p className="text-sm text-secondary">Từ ngày 07/06/2026 - 14/06/2026</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="bg-primary text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-sm">Tuần</button>
                            <button className="bg-surface-container text-secondary text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-outline-variant/20 transition-all">Tháng</button>
                        </div>
                    </div>

                    <ChartAdminBranch />
                </div>

                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-headline-md text-lg font-bold text-on-surface">Phim nổi bật</h3>
                        <button className="text-primary text-xs font-bold hover:underline">Tất cả</button>
                    </div>

                    <div className="space-y-5 flex-grow overflow-y-auto pr-2">
                        <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                            <img alt="Dune: Part Two" className="w-12 h-16 rounded-md object-cover shadow-sm" data-alt="A cinematic vertical movie poster for a science fiction epic, showing a vast desert landscape under a double sun, featuring a lone figure in an advanced survival suit. The colors are dominated by warm oranges and deep browns with high-contrast shadows. The aesthetic is modern, sleek, and highly detailed, fitting a premium cinema management UI." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtWkFxhozVODwjhy9w99mGF9WgvNlu8QHPJY0Xy8WmSO1bpER4k9ZlUHVGjcN0V_dq6WDyuFoq2QH_PIY9q4NPcKbqxvYG_i8meGQxObSCJ2r4aZaJlYOVcrL108X6-3MM7_8oWvTGa0Z7IBIeQcOO2dtsOM4iEhpBaQTNRFDOirirglZIMA2vC-tHXqCef3pR5AjOJMz0hh9IA0G0gHIoHmJrij-SSyP1FFS-iBTfzaf6jc9BhcIW1S3z1IUUF6RP_VPG-2kBVUY"/>
                            
                            <div className="flex-grow">
                                <p className="font-bold text-sm leading-tight text-on-surface">Dune: Part Two</p>
                                <p className="text-xs text-secondary mt-0.5">Phòng 04 • 2D Phụ đề</p>
                            </div>

                            <div className="text-right">
                                <p className="font-black text-primary text-sm">Bán hết</p>
                                <p className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 rounded">95%</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                            <img alt="Godzilla x Kong" className="w-12 h-16 rounded-md object-cover shadow-sm" data-alt="A vibrant movie poster depicting two giant legendary monsters clashing in a futuristic cityscape filled with neon lights. The visual style is explosive and dynamic, featuring vibrant teals and hot pinks against dark city shadows. The image has a sharp, high-resolution finish suitable for a gallery-style digital interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBss_LTXJw3jyeWRczyZsd2jQWx7_J5k-KUqdOT4GuUjaR10RbnbZD2XTfMtrn9_Ia2Kpg9HTrEiyi2N71LDjZeZ2QKGg_kyG4MrNfcETvGhtM338GfZ8gUWyCCHGnpipF4wtlQgPX8abv0ybLKHRB2GdgXQmYctrxFTPt1s9CSXJ3cSGrBlj_kGsi6VFd1tYqZmh5juTDmx-ZxXzB6fB9NuitQ3TN9BMq3IKheGfbeWObTpkM5uk1FsBSpdOod6OBqDyBEPzgGCbo"/>
                            
                            <div className="flex-grow">
                                <p className="font-bold text-sm leading-tight text-on-surface">Godzilla x Kong</p>
                                <p className="text-xs text-secondary mt-0.5">Phòng 01 • IMAX 3D</p>
                            </div>

                            <div className="text-right">
                                <p className="font-black text-primary text-sm">Bán hết</p>
                                <p className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 rounded">82%</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                            <img alt="Kung Fu Panda 4" className="w-12 h-16 rounded-md object-cover shadow-sm" data-alt="A playful and colorful movie poster for an animated martial arts film, showing a charismatic panda character in a heroic pose amidst a lush ancient Chinese village setting. The lighting is warm and bright, emphasizing a light-mode friendly palette of rich greens, golds, and soft reds. The style is polished and professional animation key art." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqoVc4k_nW2E2iLAT-4m0XrT8eLUYMZKl1QD397sstOM_9tDoC0SHCCtF3B5ms9I6pVyhB9oJDyAqAeSbvoeytOJZJWzegTQnYHTLiUCjdda6wcI_FFeapGR0bM37JLi44312OVAUlhf7LlpZgPC3-p7a-uJY5Yrz0mcaaKe1hfM1VaCQXXlkgl95btVrSYYXJe0Bkf2JNvlymPoNV7C_TXWI1OFjF0UlqULQtC6G-vzQHEKF18E8xhwv21PYdL2V3BhS03UTcBXA"/>
                            
                            <div className="flex-grow">
                                <p className="font-bold text-sm leading-tight text-on-surface">Kung Fu Panda 4</p>
                                <p className="text-xs text-secondary mt-0.5">Phòng 06 • 2D Lồng tiếng</p>
                            </div>
                            
                            <div className="text-right">
                                <p className="font-black text-primary text-sm">Bán hết</p>
                                <p className="text-[10px] text-on-secondary-container font-bold bg-secondary-container px-1.5 rounded">45%</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center p-3 rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                            <img alt="Civil War" className="w-12 h-16 rounded-md object-cover shadow-sm" data-alt="An intense and dramatic movie poster showing a gritty, near-future urban conflict scene. The composition is focused and powerful, utilizing a desaturated color palette with striking points of red. The mood is serious and editorial, captured with professional cinematography aesthetics and high-end photographic detail for a modern UI context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrVd3IY5UEkAyr7C6E-7U4WPtpZB_GzI9YnZZyJ3b1AAAoRTnLOM-z_tLFSj22mQ-hgCmWimp2kIH1WYvfW7Wmc4xko7SNb2n9rncfQSOaambMrPTi6uyUyaRFaAvSUnToM8zhj27E-W0wcooV0fbOZEynbz9ODiOT1ziUdvt8Lnjevy4Yf_sI_5QgDvTUJnumYpemya5O_rNyivL8BrNoycGddlRj700AxHTRSfN_tZ8R1GsZASJ8WRNbCMIRkpnSpaeX3pZRefk"/>
                            
                            <div className="flex-grow">
                                <p className="font-bold text-sm leading-tight text-on-surface">Civil War</p>
                                <p className="text-xs text-secondary mt-0.5">Phòng 02 • 2D Phụ đề</p>
                            </div>

                            <div className="text-right">
                                <p className="font-black text-primary text-sm">Bán hết</p>
                                <p className="text-[10px] text-error font-bold bg-error-container/30 px-1.5 rounded">100%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6">Phim doanh thu cao nhất</h3>
                    
                    <div className="space-y-6">
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div><span className="text-xs font-bold inline-block py-1 px-2 rounded-full text-on-primary-container bg-primary-container uppercase">Dune: Part Two</span></div>
                                <div className="text-right font-label-bold text-primary">450.000.000đ</div>
                            </div>

                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-surface-container-high">
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary" style={{width: '85%'}}></div>
                            </div>
                        </div>

                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div><span className="text-xs font-bold inline-block py-1 px-2 rounded-full text-on-secondary-container bg-secondary-container uppercase">Godzilla x Kong</span></div>
                                <div className="text-right font-label-bold text-on-surface">320.000.000đ</div>
                            </div>

                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-surface-container-high">
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-tertiary" style={{width: '65%'}}></div>
                            </div>
                        </div>

                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div><span className="text-xs font-bold inline-block py-1 px-2 rounded-full text-secondary bg-surface-container uppercase">Kung Fu Panda 4</span></div>
                                <div className="text-right font-label-bold text-on-surface">210.000.000đ</div>
                            </div>

                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-surface-container-high">
                                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-outline" style={{width: '40%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-sm">
                    <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6">Hoạt động gần đây</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 pb-4 border-b border-outline-variant/10">
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined" data-icon="shopping_cart">
                                    <ShoppingCart size={20}/>
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-on-surface"><span className="font-bold">Nguyễn Văn A</span> vừa đặt 4 vé <span className="font-bold">Dune: Part Two</span></p>
                                <p className="text-xs text-secondary mt-1">2 phút trước • Qua App Mobile</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 pb-4 border-b border-outline-variant/10">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined" data-icon="person_add">
                                    <UserPlus size={20}/>
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-on-surface"><span className="font-bold">Trần Thị B</span> đã đăng ký thành viên mới</p>
                                <p className="text-xs text-secondary mt-1">15 phút trước • Tại quầy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default ContentAdminBranch