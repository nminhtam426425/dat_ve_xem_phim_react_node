import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {Film, MapPin, Tag, Search, User, TextAlignJustify, X} from 'lucide-react'
import { branch, getAccessToken } from '../../config'
import { useLoading } from '../../../LoadingContext'

export default function Navbar({searchQuery, setSearchQuery}) {
    const location = useLocation()
    const {userInfo} = useLoading()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] =  useState(location?.pathname)
    const [isDarkMode] =  useState(true)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const listNav = [
      {
        toPath: '/danh-sach',
        activeTab: 'movies',
        id: '',
        icon: Film,
        content: 'Danh sách phim'
      },
      {
        toPath: '/thong-tin-rap',
        activeTab: '/thong-tin-rap',
        id: 'tab-cinemas',
        icon: MapPin,
        content: 'Thông tin về rạp chiếu'
      },
      {
        toPath: '/doi-thuong',
        activeTab: '/doi-thuong',
        id: 'tab-exchange',
        icon: Tag,
        content: 'Đổi thưởng'
      }
    ]

    const goToProfile = () => {
        navigate(`/${userInfo.role}/profile`)
    }
  
    return (
        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-zinc-950 backdrop-blur-xl border-b border-white/10 text-white' 
            : 'bg-white/80 backdrop-blur-xl border-b border-black/10 text-neutral-900 shadow-sm'}`}>
          <div className={`flex justify-between items-center px-6 py-4 max-w-[1500px] mx-auto relative ${isMenuOpen ? '' : 'overflow-hidden'}`}>
            <Link 
              to="/"
              className="flex items-center gap-2 cursor-pointer group"
              id="brand-logo">
              <span className="text-2xl font-extrabold tracking-tighter text-primary">
                {branch}
              </span>
            </Link>
    
            <div className="hidden md:flex items-center space-x-6">
              {
                listNav.map((item, index) => 
                (
                  <Link
                    key={item.id || index}
                    to={item.toPath}
                    onClick={() => setActiveTab(item.activeTab)}
                    className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                      activeTab === item.activeTab
                        ? 'text-primary border-primary'
                        : 'text-neutral-500 border-transparent hover:text-primary'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.content}
                  </Link>
                ))
              }
            </div>
    
            <div className="flex items-center space-x-4">
              {
                (location.pathname == '/' || location.pathname == '/danh-sach')
                && 
                <div className={`hidden lg:flex items-center px-3 py-1.5 rounded-full border transition-all ${
                  isDarkMode 
                    ? 'bg-neutral-900/50 border-white/10 hover:border-white/25 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary' 
                    : 'bg-neutral-100 border-black/10 hover:border-black/25 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                }`}>
                  <Search className="w-4.5 h-4.5 text-neutral-400 mr-2" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Tìm tên phim, đạo diễn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0 text-sm w-44 placeholder:text-neutral-400 text-inherit"
                  />
                </div>
              }
             
              {
                userInfo && getAccessToken()
                ?
                <>
                  <button 
                      className="flex items-center gap-3 pl-2"
                      onClick={()=>goToProfile()}>
                      <div className="text-right hidden sm:block">
                          <p className="text-sm text-secondary-100">Xin chào</p>
                          <p className="text-[14px] font-bold leading-tight">{userInfo?.fullname}</p>
                      </div>
                      <img alt="Admin Profile" className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm" src={userInfo?.avatar}/>
                  </button>
                </>
                :
                <Link to="/login">
                <button
                  id="profile-toggle"
                  className={`p-1.5 rounded-full hover:scale-105 transition-all cursor-pointer flex items-center justify-center ${
                    isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                  }`}
                >
                  <User className="w-6 h-6 text-primary" />
                </button>
              </Link>
             }
            </div>

            <div className='absolute right-0 bg-zinc-950 md:hidden h-[100%]'>
              <div className='relative left-[70%] h-[100%] w-[60px] flex items-center'>
                <button 
                  onClick={()=>setIsMenuOpen(true)}
                  >
                  <TextAlignJustify size={20}/>
                </button>
              </div>

              <div className='h-[1200px] bg-zinc-950 overflow-hidden p-2 transition-all duration-500 ease-in-out relative right-0 top-[-100%]'
                style={{
                  right: isMenuOpen ? '0' : '-300px', 
                  opacity: isMenuOpen ? 1 : 1
                }}>
                <button 
                  className='relative left-[80%]'
                  onClick={()=>setIsMenuOpen(false)}
                  >
                  <X size={20}/>
                </button>

                {
                    (location.pathname == '/' || location.pathname == '/danh-sach')
                    && 
                    <div className={`flex items-center px-3 py-1.5 rounded-full border transition-all ${
                      isDarkMode 
                        ? 'bg-neutral-900/50 border-white/10 hover:border-white/25 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary' 
                        : 'bg-neutral-100 border-black/10 hover:border-black/25 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
                    }`}>
                      <Search className="w-4.5 h-4.5 text-neutral-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Tìm tên phim, đạo diễn..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none focus:ring-0 text-sm w-44 placeholder:text-neutral-400 text-inherit"
                      />
                    </div>
                } 

                {
                  listNav.map((item, index) => 
                    (
                      <Link
                        key={item.id + index}
                        to={item.toPath}
                        onClick={() => setActiveTab(item.activeTab)}
                        className={`mt-2 font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                          activeTab === item.activeTab
                            ? 'text-primary border-primary'
                            : 'text-neutral-500 border-transparent hover:text-primary'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.content}
                      </Link>
                  ))
                }

              {
                userInfo && getAccessToken()
                ?
                <>
                  <button 
                      className="flex items-center gap-3 pl-2"
                      onClick={()=>goToProfile()}>
                      <div className="text-right">
                          <p className="text-sm text-secondary-100">Xin chào</p>
                          <p className="text-[14px] font-bold leading-tight">{userInfo?.fullname}</p>
                      </div>
                      <img alt="Admin Profile" className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm" src={userInfo?.avatar}/>
                  </button>
                </>
                :
                <Link to="/login">
                <button
                  id="profile-toggle"
                  className={`p-1.5 rounded-full hover:scale-105 transition-all cursor-pointer flex items-center justify-center ${
                    isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                  }`}
                >
                  <User className="w-6 h-6 text-primary" />
                </button>
                </Link>
              }
              </div>
            </div>
          </div>
        </nav>
    )
  }