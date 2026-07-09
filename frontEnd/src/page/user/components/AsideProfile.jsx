import { LogOut, Ticket, User, HistoryIcon, Lock } from "lucide-react"
import { useLogout } from "../../config"
import { useLocation, useNavigate } from "react-router-dom"

const AsideProfile = ({setShowFormChangePass}) => {
    const logout = useLogout()
    const location = useLocation()
    const navigate = useNavigate()

    const goToPage = (path) => {
        navigate(path)
    }
    return <>
        <aside className="w-full lg:w-72 flex flex-col gap-2">
            <button 
                onClick={()=>goToPage('/user/profile')}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-lg shadow-primary/20 transition-all ${location.pathname == "/user/profile" ? "bg-primary text-on-primary" : "text-white hover:bg-error-container/20"}`}>
                <span className="material-symbols-outlined" data-weight="fill">
                    <User size={20}/>
                </span>
                <span className="font-label-bold">Thông tin cá nhân</span>
            </button>

            <button
                onClick={()=>goToPage('/user/history')} 
                className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-lg shadow-primary/20 transition-all ${location.pathname == "/user/history" ? "bg-primary text-on-primary" : "text-white hover:bg-error-container/20"}`}>
                <span className="material-symbols-outlined">
                    <HistoryIcon size={20}/>
                </span>
                <span className="font-label-bold">Lịch sử đặt vé</span>
            </button>

            <button
                onClick={()=>goToPage('/user/my-voucher')} 
                className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-lg shadow-primary/20 transition-all ${location.pathname == "/user/my-voucher" ? "bg-primary text-on-primary" : "text-white hover:bg-error-container/20"}`}>
                <span className="material-symbols-outlined">
                    <Ticket size={20}/>
                </span>
                <span className="font-label-bold">Voucher của tôi</span>
            </button>

            <div className="mt-4 pt-4 border-t border-outline-variant/30">
                <button 
                    onClick={()=>setShowFormChangePass({})}
                    className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-primary transition-all w-full"
                    >
                    <span className="material-symbols-outlined">
                        <Lock size={20}/>
                    </span>
                    <span className="font-label-bold">Đổi mật khẩu</span>
                </button>
            </div>

            <div className="mt-4 pt-4 border-t border-outline-variant/30">
                <button 
                    className="flex items-center gap-4 px-6 py-4 rounded-xl text-white hover:bg-primary transition-all w-full"
                    onClick={logout}>
                    <span className="material-symbols-outlined">
                        <LogOut size={20}/>
                    </span>
                    <span className="font-label-bold">Đăng xuất</span>
                </button>
            </div>
        </aside>
    </>
} 

export default AsideProfile