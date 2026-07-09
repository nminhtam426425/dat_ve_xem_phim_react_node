import { Link, useLocation } from "react-router-dom"
import {QrCode,LogOut,CalculatorIcon,HomeIcon} from 'lucide-react'
import {branch} from "../../index"
import {useLogout} from '../../config'

const links = [
    // { id:1, label: 'Home', path: '/staff', icon: HomeIcon },
    { id:2, label: 'Bán vé', path: '/staff/ticket', icon: CalculatorIcon },
    { id:3, label: 'Quét mã vé', path: '/staff/qr-code', icon: QrCode },
];

const AsideMobile = ({setShowAside, showAside}) => {
    const location = useLocation()
    const logout = useLogout()
    return <aside className={`fixed left-0 top-0 h-full bg-surface border-r border-outline-variant/50 shadow-md flex flex-col py-base gap-2 
        overflow-hidden transition-all duration-300 ease-out z-[99]
        ${showAside ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}
        >
        <div className="pl-4 mb-4">
            <h1 className="font-headline-sm font-black text-primary-container text-2xl tracking-tight">{branch}</h1>
            <p className="text-secondary text-xs uppercase tracking-widest font-bold mt-1">Hệ thống nhân viên</p>
            <span className="close" onClick={()=>setShowAside(false)}>&times;</span>
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
            <button 
                className="w-full text-on-primary px-4 py-3 rounded-lg flex items-center gap-3 transition-all text-error hover:translate-x-1 duration-200 bg-primary-container" 
                to="/logout"
                onClick={logout}>
                <span className="material-symbols-outlined" data-icon="logout">
                    <LogOut size={20} />
                </span>
                <span className="font-label-bold text-label-bold">Đăng xuất</span>
            </button>
        </div>
    </aside>
}

export default AsideMobile