import { Link, useLocation } from "react-router-dom"
import { User,Film,LayoutDashboardIcon,LogOut,Clapperboard,TicketCheck,Theater, ChevronDown, ChevronUp, MapPinned}from 'lucide-react'
import {branch} from "../../index"
import { useLogout } from "../../config"
import { useState } from "react";
const links = [
    { id: 1, label: 'Dasshboard', path: '/admin', icon: LayoutDashboardIcon },
    { 
        id: 2, 
        label: 'Thông tin phim', 
        icon: Film ,
        subMenu: [
            { id: 7, label: 'Danh sách phim', path: '/admin/movie' },
            { id: 8, label: 'Thể loại phim', path: '/admin/categories' }
        ]
    },
    { 
        id: 3, 
        label: 'Lịch chiếu',
        icon: Clapperboard ,
        path: '/admin/showtime',
    },
    { id: 4, label: 'Nhân sự', path: '/admin/account', icon: User },
    { id: 5, label: 'Voucher', path: '/admin/voucher', icon: TicketCheck },
    { 
        id: 6, 
        label: 'Phòng chiếu', 
        icon: Theater,
        subMenu: [
            { id: 9, label: 'Danh sách phòng chiếu', path: '/admin/theater' },
            { id: 10, label: 'Thể loại phòng chiếu', path: '/admin/type-theater' }
        ] 
    },
    { id: 11, label: 'Trang thông tin', path: '/admin/about-us', icon: MapPinned },
]

const Aside = () => {
    const logout = useLogout()
    const location = useLocation()
    const [showSubMenu, setShowSubMenu] = useState({
        2: false,
        6: false
    }) 

    const handleShowsSUbMenu = (id) => {
        setShowSubMenu(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    return <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-outline-variant/50 shadow-md z-50 flex flex-col py-base gap-2 hidden md:flex">
        <div className="pl-4 mb-4">
            <h1 className="font-headline-sm font-black text-primary-container text-2xl tracking-tight">{branch}</h1>
            <p className="text-secondary text-xs uppercase tracking-widest font-bold mt-1">Hệ thống quản trị</p>
        </div>

        <nav className="flex-1 space-y-1">
            {links.map((link) => (
                <>
                    <Link
                        key={link.id}
                        to={link.subMenu ? '#' : link.path}
                        onClick={() => handleShowsSUbMenu(link.id)}
                        className={`px-4 py-3 mx-2 rounded-lg flex items-center gap-3 transition-all hover:translate-x-1 duration-200 active:scale-[0.98] ${
                            location.pathname === link.path || (link.subMenu && link.subMenu.some(subLink => subLink.path === location.pathname))
                            ? 'bg-primary-container shadow-lg shadow-primary-container/20 text-on-primary'
                            : 'text-secondary-fixed-dim hover:bg-surface-container'
                        }`}>
                        <span className="material-symbols-outlined">
                            <link.icon size={20} />
                        </span>
                        <span className="font-label-bold text-label-bold">{link.label}</span>
                        {link.subMenu && (
                            <span className="ml-auto">
                                {showSubMenu[link.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </span>
                        )}
                    </Link>
                    {
                        link.subMenu && (
                            <div className={`submenu-transition mx-2 space-y-1" id="reviews-submenu ${showSubMenu[link.id] ? "submenu-open" : ""}`}>
                            {
                                link.subMenu.map(subLink => (
                                    <Link 
                                        key={subLink.id}
                                        to={subLink.path}
                                        className="flex items-center gap-3 text-secondary hover:bg-secondary-container/50 rounded-lg px-4 py-2 ml-6 my-1 transition-all cursor-pointer active:opacity-80">
                                        
                                        <span className="text-sm font-medium">{subLink.label}</span>
                                    </Link>
                                ))
                            }
                            </div>
                        )
                    }
                </>
            ))}
        </nav>

        <div className="px-2 mt-auto pb-4 space-y-1 border-t border-outline-variant/30 pt-4">
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