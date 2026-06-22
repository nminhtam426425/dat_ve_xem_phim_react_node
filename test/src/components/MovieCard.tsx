import { motion } from 'motion/react';
import { Star, Ticket, Play } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onBook: (movie: Movie) => void;
  onSelect: (movie: Movie) => void;
  isDarkMode: boolean;
}

export default function MovieCard({ movie, onBook, onSelect, isDarkMode }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      layout
      transition={{ duration: 0.4 }}
      className="group flex flex-col justify-between h-full"
      id={`movie-card-${movie.id}`}
    >
      {/* Poster Frame */}
      <div className={`relative aspect-[2/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-400 cursor-pointer ${
        isDarkMode ? 'bg-neutral-900 border border-white/5' : 'bg-neutral-100 border border-black/5'
      }`}>
        <img
          src={movie.image}
          alt={`${movie.title} Movie Poster`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          id={`movie-img-${movie.id}`}
          onClick={() => onSelect(movie)}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook(movie);
            }}
            id={`book-btn-${movie.id}`}
            className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-lg shadow-primary/30"
          >
            <Ticket className="w-4 h-4" />
            Book Tickets
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
            id={`details-btn-${movie.id}`}
            className="w-full py-2.5 rounded-xl border border-white/40 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/15 active:scale-98 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white text-transparent" />
            Watch Trailer & Details
          </button>
        </div>

        {/* Rating Badge on top-left of image */}
        <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-white/10">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-xs font-extrabold text-white">{movie.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Info labels below */}
      <div className="mt-4 flex-grow flex flex-col justify-end">
        <h3 
          onClick={() => onSelect(movie)}
          className={`text-lg font-extrabold hover:text-primary transition-colors cursor-pointer truncate ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}
          id={`movie-title-${movie.id}`}
        >
          {movie.title}
        </h3>
        <p className="text-[11px] text-neutral-400 font-extrabold tracking-widest uppercase mt-1">
          {movie.genre} • {movie.duration}
        </p>
      </div>
    </motion.div>
  );
}
