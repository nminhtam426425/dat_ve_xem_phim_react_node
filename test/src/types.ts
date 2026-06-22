export interface Movie {
  id: string;
  title: string;
  genre: string;
  genres: string[];
  duration: string;
  rating: number;
  image: string;
  synopsis: string;
  director: string;
  cast: string[];
  releaseDate: string;
  trailerUrl?: string;
  accentColor?: string;
}

export interface Showtime {
  id: string;
  time: string;
  type: '2D' | '3D' | 'IMAX';
  price: number;
}

export interface BookingDate {
  dayName: string;
  dayNumber: number;
  month: string;
  fullDate: string;
}

export interface Seat {
  id: string; // e.g., "A1"
  row: string; // e.g., "A"
  number: number; // e.g., 1
  isReserved: boolean;
  type: 'standard' | 'premium' | 'vip';
}

export interface Ticket {
  id: string;
  movie: Movie;
  seats: string[];
  date: string;
  time: string;
  totalPrice: number;
  cinemaName: string;
  bookingTime: string;
}

export type ActiveTab = 'movies' | 'cinemas' | 'offers' | 'tickets';
