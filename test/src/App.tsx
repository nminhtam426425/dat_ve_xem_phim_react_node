import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Film, MapPin, Tag, Receipt, ChevronLeft, ChevronRight, 
  HelpCircle, ShieldCheck, Mail, MessageSquare, Compass, Info 
} from 'lucide-react';

import Navbar from './components/Navbar';
import GenreFilters from './components/GenreFilters';
import MovieCard from './components/MovieCard';
import MovieDetailModal from './components/MovieDetailModal';
import BookingSystem from './components/BookingSystem';
import CinemasTab from './components/CinemasTab';
import OffersTab from './components/OffersTab';
import MyTickets from './components/MyTickets';

import { MOVIES } from './data';
import { Movie, Ticket, ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('movies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Movies');
  const [sortBy, setSortBy] = useState<'rating' | 'title'>('rating');
  const [isDarkMode, setIsDarkMode] = useState(true); // Defaults to gorgeous dark mode as in screenshot
  
  // Modal / overlays state
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [bookingMovie, setBookingMovie] = useState<Movie | null>(null);
  
  // Persistent Booked Tickets state from localStorage
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Pagination page state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Fits our 8 detailed records beautifully list

  // Initial load of tickets
  useEffect(() => {
    const raw = localStorage.getItem('cinereserve_tickets');
    if (raw) {
      try {
        setTickets(JSON.parse(raw));
      } catch (err) {
        console.error('Failed to parse tickets', err);
      }
    }
  }, []);

  // Update page index if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, sortBy]);

  // Handle successful reservation ticket
  const handleBookingSuccess = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);
    // Switch to tickets tab automatically to let them admire their pass!
    setActiveTab('tickets');
  };

  // Cancel reservation
  const handleCancelTicket = (ticketId: string) => {
    const updated = tickets.filter(t => t.id !== ticketId);
    setTickets(updated);
    localStorage.setItem('cinereserve_tickets', JSON.stringify(updated));
  };

  // Movie filtering & sorting computations
  const getFilteredMovies = () => {
    let list = [...MOVIES];

    // 1. Text Search matching title or genres
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q))
      );
    }

    // 2. Genre Tags Filtering
    if (selectedGenre !== 'All Movies') {
      list = list.filter((m) => m.genres.includes(selectedGenre));
    }

    // 3. Sorting logic
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  };

  const filteredMovies = getFilteredMovies();
  const totalItems = filteredMovies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Paginated list
  const getPaginatedMovies = () => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredMovies.slice(startIdx, startIdx + itemsPerPage);
  };

  const paginatedMovies = getPaginatedMovies();

  // Color theme variables based on choice
  const backgroundClass = isDarkMode ? 'bg-black text-white' : 'bg-[#f9f9f9] text-[#1a1c1c]';
  const headerTextClass = isDarkMode ? 'text-white' : 'text-[#1a1c1c]';
  const subtitleTextClass = isDarkMode ? 'text-neutral-400' : 'text-neutral-600';
  const borderThemeClass = isDarkMode ? 'border-white/10' : 'border-black/10';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${backgroundClass}`}>
      {/* 1. Header/Navigation Controls */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        bookedCount={tickets.length}
      />

      {/* 2. Primary Layout Main stage */}
      <main className="flex-grow max-w-[1280px] mx-auto w-full px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'movies' && (
            <motion.div
              key="movies-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Slogan Intro section */}
              <header className="mb-12">
                <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${headerTextClass}`}>
                  Now Showing
                </h1>
                <p className={`text-sm md:text-md max-w-2xl font-medium leading-relaxed ${subtitleTextClass}`}>
                  Explore the latest blockbusters and cinematic masterpieces. Secure your seat at the most premium screens in the city.
                </p>
              </header>

              {/* Genre pill selections & Sorting choices */}
              <GenreFilters
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                isDarkMode={isDarkMode}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Responsive Movie listing Grid */}
              {paginatedMovies.length === 0 ? (
                <div className={`p-16 text-center rounded-2xl border ${borderThemeClass} ${isDarkMode ? 'bg-neutral-900/40' : 'bg-neutral-50'}`}>
                  <h3 className="text-xl font-bold mb-1">No Movies Match Your Criteria</h3>
                  <p className="text-xs text-neutral-400">Try checking spelling or choosing a different genre pill.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  <AnimatePresence mode="popLayout">
                    {paginatedMovies.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onBook={(m) => setBookingMovie(m)}
                        onSelect={(m) => setSelectedMovie(m)}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Pagination control list matching aesthetic of screenshot */}
              {totalPages > 1 && (
                <nav className="mt-20 flex justify-center items-center gap-2 select-none">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                      currentPage === 1
                        ? 'opacity-30 cursor-not-allowed'
                        : isDarkMode
                          ? 'border-white/10 text-neutral-400 hover:text-primary hover:border-primary'
                          : 'border-black/10 text-neutral-600 hover:text-primary hover:border-primary'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNo = idx + 1;
                    const isActive = pageNo === currentPage;
                    return (
                      <button
                        key={pageNo}
                        id={`page-btn-${pageNo}`}
                        onClick={() => setCurrentPage(pageNo)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                            : isDarkMode
                              ? 'border border-white/10 text-neutral-400 hover:bg-neutral-900'
                              : 'border border-black/10 text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {pageNo}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                      currentPage === totalPages
                        ? 'opacity-30 cursor-not-allowed'
                        : isDarkMode
                          ? 'border-white/10 text-neutral-400 hover:text-primary hover:border-primary'
                          : 'border-black/10 text-neutral-600 hover:text-primary hover:border-primary'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              )}
            </motion.div>
          )}

          {activeTab === 'cinemas' && (
            <motion.div
              key="cinemas-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
            >
              <CinemasTab isDarkMode={isDarkMode} />
            </motion.div>
          )}

          {activeTab === 'offers' && (
            <motion.div
              key="offers-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
            >
              <OffersTab isDarkMode={isDarkMode} />
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div
              key="tickets-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
            >
              <MyTickets
                tickets={tickets}
                onCancelTicket={handleCancelTicket}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. Global Decorative Clean Footer */}
      <footer className={`w-full mt-auto border-t transition-colors duration-300 ${isDarkMode ? 'bg-neutral-950 border-white/5' : 'bg-white border-black/5'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-10 max-w-[1280px] mx-auto gap-8">
          <div className="text-center md:text-left">
            <div className="text-lg font-black text-primary hover:scale-101 transition-transform inline-block select-none">
              CineReserve
            </div>
            <p className="text-xs text-neutral-400 mt-1.5 max-w-xs leading-relaxed">
              Premium movie booking experience for the true cinephile. Experience cinema grade laser projection, Atmos audio, and luxury loungers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-400 font-medium">
            <a href="#privacy" className="hover:text-primary transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Terms of Service
            </a>
            <a href="#help" className="hover:text-primary transition-colors flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Help Center
            </a>
            <a href="#contact" className="hover:text-primary transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Contact Us
            </a>
          </div>

          <div className="text-xs text-neutral-400 text-center md:text-right">
            © {new Date().getFullYear()} CineReserve. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 4. Bottom Navigation bar (Rendered on Mobile device screens to reflect screenshot spec) */}
      <div className={`md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-3.5 pb-safe z-40 border-t shadow-2xl transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-neutral-950/95 backdrop-blur-lg border-white/5' 
          : 'bg-white/95 backdrop-blur-lg border-black/5'
      }`}>
        <button
          onClick={() => setActiveTab('movies')}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            activeTab === 'movies' ? 'text-primary' : 'text-neutral-400'
          }`}
        >
          <Film className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1 uppercase">Movies</span>
        </button>

        <button
          onClick={() => setActiveTab('cinemas')}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            activeTab === 'cinemas' ? 'text-primary' : 'text-neutral-400'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1 uppercase">Cinemas</span>
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            activeTab === 'offers' ? 'text-primary' : 'text-neutral-400'
          }`}
        >
          <Tag className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1 uppercase">Offers</span>
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex flex-col items-center justify-center cursor-pointer relative ${
            activeTab === 'tickets' ? 'text-primary' : 'text-neutral-400'
          }`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-1 uppercase">Tickets</span>
          {tickets.length > 0 && (
            <span className="absolute -top-1.5 -right-3.5 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black">
              {tickets.length}
            </span>
          )}
        </button>
      </div>

      {/* 5. Dynamic Overlay Modal triggers */}
      <AnimatePresence>
        {selectedMovie && (
          <MovieDetailModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onBook={() => {
              setBookingMovie(selectedMovie);
              setSelectedMovie(null); // transition nicely
            }}
            isDarkMode={isDarkMode}
          />
        )}

        {bookingMovie && (
          <BookingSystem
            movie={bookingMovie}
            onClose={() => setBookingMovie(null)}
            onBookingSuccess={handleBookingSuccess}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
