import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Film, Star, Ticket, Play, User, Users, Volume2 } from 'lucide-react';
import { Movie } from '../types';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
  onBook: () => void;
  isDarkMode: boolean;
}

export default function MovieDetailModal({
  movie,
  onClose,
  onBook,
  isDarkMode
}: MovieDetailModalProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate video playback progress
  useEffect(() => {
    let interval: any;
    if (isPlayingTrailer) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1.2;
        });
      }, 200);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlayingTrailer]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      <div className={`relative w-full max-w-3xl rounded-2xl border overflow-hidden shadow-2xl transition-all z-10 ${
        isDarkMode 
          ? 'bg-neutral-950 border-white/10 text-white animate-fade-in' 
          : 'bg-white border-black/10 text-neutral-900 animate-fade-in'
      }`}>
        {/* Absolute Close icon */}
        <button 
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:scale-105 z-30 transition-all ${
            isDarkMode ? 'hover:bg-neutral-900 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-500 hover:text-primary'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cinematic Backdrop Hero Header */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-black flex items-end">
          {isPlayingTrailer ? (
            /* Immersive interactive trailer display */
            <div className="absolute inset-0 z-20 flex flex-col justify-between bg-black p-4">
              <div className="flex justify-between items-center z-30">
                <span className="bg-primary/95 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded">TRAILER MODE</span>
                <button 
                  onClick={() => setIsPlayingTrailer(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer"
                >
                  Close Player
                </button>
              </div>

              {/* Animated visualizer representing active cinematic projection */}
              <div className="flex flex-col items-center justify-center h-full relative">
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse duration-1000">
                  <div className="flex gap-1 items-center justify-center">
                    <span className="w-1 bg-primary h-4 animate-bounce" />
                    <span className="w-1 bg-primary h-6 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 bg-primary h-5 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-mono text-neutral-400">Streaming: Premium HD Projection</div>
              </div>

              {/* Video control row */}
              <div className="space-y-2 z-10">
                <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                  <div className="flex items-center gap-3">
                    <Play className="w-3.5 h-3.5 fill-current text-primary" />
                    <span>0:{(Math.floor(progress * 0.4)).toString().padStart(2, '0')} / 0:40</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Stereo 5.1</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Backdrop graphic fading out */
            <>
              <div className="absolute inset-0">
                <img 
                  src={movie.image} 
                  alt="" 
                  className="w-full h-full object-cover opacity-45 scale-105 filter blur-xs" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="p-6 md:p-8 relative z-10 flex gap-5 items-end">
                {/* Real poster frame */}
                <img 
                  src={movie.image} 
                  alt="" 
                  className="hidden sm:block w-28 md:w-36 rounded-xl shadow-2xl border border-white/10 aspect-[2/3] object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {movie.genres.map(g => (
                      <span key={g} className="bg-primary/90 text-white text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                        {g}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{movie.title}</h2>
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      {movie.rating.toFixed(1)} / 10
                    </span>
                    <span>18+</span>
                    <span>{movie.duration}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Info Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 leading-relaxed">
          {/* Main detailed narrative */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-2">Synopsis</h3>
              <p className="text-sm text-neutral-400 font-medium leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Production Stats */}
            <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border ${
              isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-neutral-50 border-black/5'
            }`}>
              <div className="text-xs">
                <span className="text-neutral-400 block mb-0.5 font-bold uppercase tracking-wider">Release Date</span>
                <span className="font-semibold text-inherit">{movie.releaseDate}</span>
              </div>
              <div className="text-xs">
                <span className="text-neutral-400 block mb-0.5 font-bold uppercase tracking-wider">Language</span>
                <span className="font-semibold text-inherit">English (Vietnamese Sub)</span>
              </div>
            </div>
          </div>

          {/* Side Info & Primary CTAs */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Director
                </h4>
                <p className="text-xs font-semibold">{movie.director}</p>
              </div>

              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  Cast Crew
                </h4>
                <ul className="text-xs text-neutral-400 space-y-1 font-medium list-disc ml-4">
                  {movie.cast.map(actor => (
                    <li key={actor}>{actor}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={onBook}
                id="modal-book-tickets-btn"
                className="w-full py-3 rounded-xl bg-primary hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-primary/25 active:scale-98"
              >
                <Ticket className="w-4 h-4" />
                BOOK TICKETS NOW
              </button>

              {!isPlayingTrailer && (
                <button
                  onClick={() => setIsPlayingTrailer(true)}
                  id="modal-watch-trailer-btn"
                  className="w-full py-3 rounded-xl border border-neutral-400 text-neutral-400 hover:text-primary hover:border-primary font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Play className="w-4 h-4" />
                  Play Official Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
