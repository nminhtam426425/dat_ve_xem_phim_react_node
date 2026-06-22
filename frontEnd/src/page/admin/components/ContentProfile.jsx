import { Calendar, Camera, IdCardLanyard, Mail, Phone, User, History, Lock } from "lucide-react"
import { branch,customeFetch, apiUserService } from "../../config"
import { useState, useEffect } from "react"

const ContentProfile = () => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const getInfo = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/users','authen','GET')
                if(res.ok){
                    const data = await res.json()
                    setUser(data)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getInfo()
    },[])

    return <div className="flex flex-col md:flex-row gap-12 p-6">
        <aside className="w-full md:w-72 shrink-0">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-sm sticky top-24">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-all duration-300">
                            <img 
                                alt="Avatar Preview" 
                                className="w-full h-full object-cover" 
                                src={user?.avatar}/>
                        </div>

                        <label className="absolute bottom-0 right-0 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer" for="avatar-upload">
                            <span className="material-symbols-outlined" >
                                <Camera size={20} />
                            </span>
                            <input accept="image/*" className="hidden" id="avatar-upload" type="file"/>
                        </label>
                    </div>

                    <h2 className="text-xl font-bold text-on-surface">Admin {branch}</h2>
                    <p className="text-sm text-secondary font-medium uppercase tracking-widest mt-1">Quản trị viên</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg transition-all duration-150" href="#">
                        <span className="material-symbols-outlined" data-icon="person">
                            <User size={20}/>
                        </span>
                        <span className="text-label-bold">Hồ sơ cá nhân</span>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-secondary-container/50 rounded-lg transition-all duration-150" href="#">
                        <span className="material-symbols-outlined" data-icon="lock">
                            <Lock size={20}/>
                        </span>
                        <span className="text-label-bold">Đổi mật khẩu</span>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-secondary-container/50 rounded-lg transition-all duration-150" href="#">
                        <span className="material-symbols-outlined" data-icon="history">
                            <History size={20}/>
                        </span>
                        <span className="text-label-bold">Lịch sử hoạt động</span>
                    </div>
                </div>
            </div>
        </aside>
        <section className="flex-grow">
            <div className="mb-8">
                <h1 className="text-headline-lg text-on-surface mb-2">Cập nhật thông tin cá nhân</h1>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/20 shadow-sm">
                <form className="space-y-6" method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="fullname">Họ tên</label>
                            
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                    <IdCardLanyard size={20}/>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                    id="fullname" 
                                    name="fullname" 
                                    placeholder="Nhập họ và tên" 
                                    type="text" 
                                    value={user?.fullname}/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="dob">Ngày sinh</label>
                            
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                    <Calendar size={20}/>
                                </span>
                                <input className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" id="dob" name="dob" type="date" value="1995-05-15"/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="phone">Số điện thoại</label>
                            
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                    <Phone size={20}/>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                    id="phone" 
                                    name="phone" 
                                    placeholder="0123 456 789" 
                                    type="tel" 
                                    value={user?.phone}/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-label-bold text-on-surface-variant uppercase tracking-wider" for="email">Email</label>
                            
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                                    <Mail size={20}/>
                                </span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-surface rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 text-body-md" 
                                    id="email" 
                                    name="email" 
                                    placeholder="email@example.com"
                                    type="email" 
                                    value={user?.email}/>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-end gap-4">
                        <button className="px-12 py-3 rounded-lg bg-primary-container text-on-primary font-bold shadow-lg hover:brightness-110 transition-all active:scale-95" type="submit">
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </div>
}

export default ContentProfile