import { GENRES } from '../data';

interface GenreFiltersProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  isDarkMode: boolean;
  sortBy: 'rating' | 'title';
  setSortBy: (sort: 'rating' | 'title') => void;
}

export default function GenreFilters({
  selectedGenre,
  setSelectedGenre,
  isDarkMode,
  sortBy,
  setSortBy
}: GenreFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-2">
      {/* Scrollable Genres */}
      <div className="overflow-x-auto hide-scrollbar flex gap-2.5 pb-1">
        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre;
          return (
            <button
              key={genre}
              id={`filter-${genre.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 rounded-full font-semibold text-xs transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                  : isDarkMode
                    ? 'bg-neutral-900 border border-white/5 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    : 'bg-neutral-100 border border-black/5 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* Sorting Toggles */}
      <div className="flex items-center gap-2 self-end md:self-auto">
        <span className="text-xs text-neutral-400 font-medium">Sort by:</span>
        <div className={`p-1 rounded-lg flex gap-1 ${
          isDarkMode ? 'bg-neutral-900' : 'bg-neutral-100'
        }`}>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
              sortBy === 'rating'
                ? 'bg-primary text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Highest Rating
          </button>
          <button
            onClick={() => setSortBy('title')}
            className={`px-3 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
              sortBy === 'title'
                ? 'bg-primary text-white shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Alphabetical
          </button>
        </div>
      </div>
    </div>
  );
}
