import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {Film, MapPin, Tag, Search, User} from 'lucide-react'
import { branch, getAccessToken } from '../../config'
import { useLoading } from '../../../LoadingContext'

export default function Navbar({searchQuery, setSearchQuery}) {
    const location = useLocation()
    const {userInfo} = useLoading()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] =  useState(location?.pathname)
    const [isDarkMode] =  useState(true)

    const goToProfile = () => {
        navigate(`/${userInfo.role}/profile`)
    }
  
    return (
        <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-zinc-950 backdrop-blur-xl border-b border-white/10 text-white' 
            : 'bg-white/80 backdrop-blur-xl border-b border-black/10 text-neutral-900 shadow-sm'}`}>
          <div className="flex justify-between items-center px-6 py-4 max-w-[1500px] mx-auto">
           
            <Link 
              to="/"
              className="flex items-center gap-2 cursor-pointer group"
              id="brand-logo">
              <span className="text-2xl font-extrabold tracking-tighter text-primary">
                {branch}
              </span>
            </Link>
    
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to='/danh-sach'
                id="tab-movies"
                onClick={() => setActiveTab('movies')}
                className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                  activeTab === '/danh-sach'
                    ? 'text-primary border-primary'
                    : 'text-neutral-500 border-transparent hover:text-primary'
                }`}
              >
                <Film className="w-4 h-4" />
                Danh sách phim
              </Link>
    
              <Link
                to="/thong-tin-rap"
                id="tab-cinemas"
                onClick={() => setActiveTab('/thong-tin-rap')}
                className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                  activeTab === '/thong-tin-rap'
                    ? 'text-primary border-primary'
                    : 'text-neutral-500 border-transparent hover:text-primary'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Thông tin về rạp chiếu
              </Link>
    
              <Link
                to="/doi-thuong"
                id="tab-offers"
                onClick={() => setActiveTab('/doi-thuong')}
                className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 cursor-pointer ${
                  activeTab === '/doi-thuong'
                    ? 'text-primary border-primary'
                    : 'text-neutral-500 border-transparent hover:text-primary'
                }`}
              >
                <Tag className="w-4 h-4" />
                Đổi thưởng
              </Link>
    
             
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
                    placeholder="Search movies..."
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
          </div>
        </nav>
    );
  }