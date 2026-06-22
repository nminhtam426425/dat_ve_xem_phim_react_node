import {Bell, MenuIcon} from 'lucide-react'
import {branch,apiUserService,customeFetch} from '../../config'
import { useEffect,useState } from 'react'

const Header = () => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const getInfo = async () => {
            try{
                const res = await customeFetch(apiUserService.baseURL+'/users','authen','GET')
                const res2 = await customeFetch(apiUserService.baseURL+'/branches/infoBranch','authen','GET')
                if(res.ok && res2.ok){
                    const data = await res.json()
                    const data2 = await res2.json()
                    setUser({...data, ...data2})
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getInfo()
    },[])

    return  <header className="bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm docked full-width top-0 sticky flex justify-between items-center w-full px-gutter h-16 z-50">
        <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-primary">
                <span className="material-symbols-outlined">
                    <MenuIcon size={20}/>
                </span>
            </button>
            <h2 className="font-headline-md text-headline-md font-bold text-primary">
                {/* name này là name của chi nhánh đang làm việc */}
                {user?.name}
            </h2>
        </div>

        <div className="flex items-center gap-4">
            <span className="relative material-symbols-outlined p-2 text-secondary hover:bg-surface-container-high rounded-full transition-all cursor-pointer" data-icon="notifications">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
            </span>
            
            <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold leading-tight">Staff {branch}</p>
                    <p className="text-[10px] text-secondary">Nhân viên</p>
                </div>
                <img alt="Admin Profile" className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm" src={user?.avatar}/>
            </div>
        </div>
    </header>
}

export default Header