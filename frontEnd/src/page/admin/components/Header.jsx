import { Bell, Menu} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLoading } from '../../../LoadingContext'
import { branch } from '../../config'
import WidgetChat from './WidgetChat.jsx'

const Header = () => {
    const {userInfo} = useLoading()

    return  <header className="sticky top-0 z-40 h-16 w-full glass-header bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-gutter">
        <button className="md:hidden p-2 text-primary">
            <span className="material-symbols-outlined">
                <Menu size={20}/>
            </span>
        </button>
        <div className="flex items-center gap-4">
            {/* name này là tên chi nhánh */}
            <h2 className="font-headline-md text-headline-md font-bold text-primary">{userInfo?.name}</h2>
        </div>

        <div className="flex items-center gap-4">
            <span className="relative material-symbols-outlined p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all cursor-pointer" data-icon="notifications">
                <WidgetChat/>
            </span>
            
            <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold leading-tight">Admin {branch}</p>
                    <p className="text-[10px] text-secondary">Manager</p>
                </div>
                <Link to='/admin/profile'>
                    <img alt="Admin Profile" className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm" src={userInfo?.avatar}/>
                </Link>
            </div>
        </div>
    </header>
}

export default Header