import { useState } from 'react';
import { Search, Film, MapPin, Tag, Receipt, User, Moon, Sun, Laptop } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  bookedCount: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  bookedCount
}: NavbarProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 text-white' 
        : 'bg-white/80 backdrop-blur-xl border-b border-black/10 text-neutral-900 shadow-sm'
    }`}>
      <div className="flex justify-between items-center px-6 py-4 max-w-[1280px] mx-auto">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('movies')}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-logo"
        >
          <div className="bg-primary hover:scale-105 transition-all text-white p-2 rounded-lg flex items-center justify-center font-bold">
            <Film className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-primary">
            CineReserve
          </span>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            id="tab-movies"
            onClick={() => setActiveTab('movies')}
            className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 ${
              activeTab === 'movies'
                ? 'text-primary border-primary'
                : 'text-neutral-500 border-transparent hover:text-primary'
            }`}
          >
            <Film className="w-4 h-4" />
            Movies
          </button>

          <button
            id="tab-cinemas"
            onClick={() => setActiveTab('cinemas')}
            className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 ${
              activeTab === 'cinemas'
                ? 'text-primary border-primary'
                : 'text-neutral-500 border-transparent hover:text-primary'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Cinemas
          </button>

          <button
            id="tab-offers"
            onClick={() => setActiveTab('offers')}
            className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 ${
              activeTab === 'offers'
                ? 'text-primary border-primary'
                : 'text-neutral-500 border-transparent hover:text-primary'
            }`}
          >
            <Tag className="w-4 h-4" />
            Offers
          </button>

          <button
            id="tab-tickets"
            onClick={() => setActiveTab('tickets')}
            className={`font-semibold pb-1 border-b-2 transition-all text-sm flex items-center gap-1.5 relative ${
              activeTab === 'tickets'
                ? 'text-primary border-primary'
                : 'text-neutral-500 border-transparent hover:text-primary'
            }`}
          >
            <Receipt className="w-4 h-4" />
            My Tickets
            {bookedCount > 0 && (
              <span className="absolute -top-1.5 -right-3 bg-primary text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold animate-pulse">
                {bookedCount}
              </span>
            )}
          </button>
        </div>

        {/* Controls: Search, Theme, Profile */}
        <div className="flex items-center space-x-4">
          {/* Quick Search */}
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

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to Cinematic Premium Light Theme' : 'Switch to Gallery Dark Theme'}
            className={`p-2 rounded-full cursor-pointer hover:scale-105 transition-all ${
              isDarkMode ? 'hover:bg-neutral-800 text-yellow-400' : 'hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Profile Menu Actions */}
          <div className="relative">
            <button
              id="profile-toggle"
              onClick={() => setShowProfile(!showProfile)}
              className={`p-1.5 rounded-full hover:scale-105 transition-all cursor-pointer flex items-center justify-center ${
                isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
              }`}
            >
              <User className="w-6 h-6 text-primary" />
            </button>

            {showProfile && (
              <div className={`absolute right-0 mt-3 w-64 rounded-xl border p-4 shadow-xl transition-all z-50 ${
                isDarkMode 
                  ? 'bg-neutral-950 border-white/10 text-white shadow-black/80' 
                  : 'bg-white border-black/10 text-neutral-900 shadow-neutral-200'
              }`}>
                <div className="flex items-center gap-3 border-b pb-3 mb-3 border-inherit">
                  <div className="bg-primary/25 rounded-full p-2">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">GUEST USER</h4>
                    <span className="text-xs text-neutral-400">nminhtam425@gmail.com</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Rank:</span>
                    <span className="text-primary font-bold">CinePro Member</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Points:</span>
                    <span className="font-semibold text-inherit">1,240 pts</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    setActiveTab('tickets');
                  }}
                  className="w-full mt-4 py-2 font-semibold text-xs rounded-lg bg-primary hover:brightness-110 transition-all text-white cursor-pointer"
                >
                  Manage My Bookings ({bookedCount})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
