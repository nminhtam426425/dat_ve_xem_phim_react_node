import { Link, useLocation } from "react-router-dom"
import { User,Film,LayoutDashboardIcon,LogOut,Clapperboard,TicketCheck,Theater}from 'lucide-react'
import {branch} from "../../index"
import { useLogout } from "../../config"
const links = [
    { id: 1, label: 'Dasshboard', path: '/admin', icon: LayoutDashboardIcon },
    { id: 2, label: 'Phim', path: '/admin/movie', icon: Film },
    { id: 3, label: 'Lịch chiếu', path: '/admin/showtime', icon: Clapperboard },
    { id: 4, label: 'Nhân sự', path: '/admin/account', icon: User },
    { id: 5, label: 'Voucher', path: '/admin/voucher', icon: TicketCheck },
    { id: 6, label: 'Phòng chiếu', path: '/admin/theater', icon: Theater }
];

const Aside = () => {
    const logout = useLogout()
    const location = useLocation()
    return <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant/50 shadow-md z-50 flex flex-col py-base gap-2 hidden md:flex">
        <div className="pl-4 mb-4">
            <h1 className="font-headline-sm font-black text-primary-container text-2xl tracking-tight">{branch}</h1>
            <p className="text-secondary text-xs uppercase tracking-widest font-bold mt-1">Hệ thống quản trị</p>
        </div>

        <nav className="flex-1 space-y-1">
            {links.map((link) => (
                <Link
                    key={link.id}
                    to={link.path}
                    className={` px-4 py-3 mx-2 rounded-lg flex items-center gap-3 transition-all hover:translate-x-1 duration-200 active:scale-[0.98] ${
                        location.pathname === link.path
                        ? 'bg-primary-container shadow-lg shadow-primary-container/20 text-on-primary'
                        : 'text-secondary-fixed-dim hover:bg-surface-container'
                    }`}>
                    <span className="material-symbols-outlined">
                        <link.icon size={20} />
                    </span>
                    <span className="font-label-bold text-label-bold">{link.label}</span>
                </Link>
            ))}
        </nav>

        <div className="px-2 mt-auto pb-4 space-y-1 border-t border-outline-variant/30 pt-4">
            {/* <button className="w-full bg-surface-variant text-on-surface-variant font-label-bold text-label-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-outline-variant/20 transition-colors">
                Xuất báo cáo
            </button> */}
            {/* <Link className="text-secondary-fixed-dim hover:bg-surface-container px-4 py-3 rounded-lg flex items-center gap-3 transition-all" to="#">
                <span className="material-symbols-outlined" data-icon="help">help</span>
                <span className="font-label-bold text-label-bold">Hỗ trợ</span>
            </Link> */}
            <button 
                className="w-full text-on-primary px-4 py-3 rounded-lg flex items-center gap-3 transition-all text-error hover:translate-x-1 duration-200 bg-primary-container"
                onClick={logout}>
                <span className="material-symbols-outlined" data-icon="logout">
                    <LogOut size={20} />
                </span>
                <span className="font-label-bold text-label-bold">Đăng xuất</span>
            </button>
        </div>
    </aside>
}

export default Aside