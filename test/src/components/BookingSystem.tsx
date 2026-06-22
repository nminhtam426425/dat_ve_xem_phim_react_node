import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Armchair, TicketCheck, X, CreditCard, Sparkles, Receipt } from 'lucide-react';
import { Movie, Showtime, BookingDate, Seat, Ticket } from '../types';
import { SHOWTIMES } from '../data';

interface BookingSystemProps {
  movie: Movie;
  onClose: () => void;
  onBookingSuccess: (ticket: Ticket) => void;
  isDarkMode: boolean;
}

// Generate next 7 days for booking
const generateBookingDates = (): BookingDate[] => {
  const dates: BookingDate[] = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    dates.push({
      dayName: daysOfWeek[futureDate.getDay()],
      dayNumber: futureDate.getDate(),
      month: months[futureDate.getMonth()],
      fullDate: futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  }
  return dates;
};

// Seed seat occupancy based on movie + time to simulate real system
const generateSeats = (movieId: string, timeId: string): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsCount = 10;
  const seats: Seat[] = [];

  // Seed standard pseudo-randomness based on IDs
  const combinedSeed = (movieId + timeId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  rows.forEach((row) => {
    for (let num = 1; num <= seatsCount; num++) {
      const id = `${row}${num}`;
      // Simulate simple seat tiers
      let type: 'standard' | 'premium' | 'vip' = 'standard';
      if (row === 'C' || row === 'D') type = 'premium';
      if (row === 'E' || row === 'F') type = 'vip';

      // 30% of seats are occupied based on seed
      const isReserved = ((combinedSeed * num + row.charCodeAt(0)) % 10) < 3;

      seats.push({
        id,
        row,
        number: num,
        isReserved,
        type
      });
    }
  });

  return seats;
};

export default function BookingSystem({
  movie,
  onClose,
  onBookingSuccess,
  isDarkMode
}: BookingSystemProps) {
  const dates = generateBookingDates();
  
  const [selectedDate, setSelectedDate] = useState<BookingDate>(dates[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime>(SHOWTIMES[2]); // Default afternoon
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState<Ticket | null>(null);

  // Generate seats when date or showtime changes
  useEffect(() => {
    setSeats(generateSeats(movie.id, selectedShowtime.id + selectedDate.dayNumber));
    setSelectedSeats([]); // reset seats
  }, [movie.id, selectedShowtime, selectedDate]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.isReserved) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatColorClass = (seat: Seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    if (seat.isReserved) {
      // Reserved/Occupied: charcoal with low opacity as requested
      return isDarkMode 
        ? 'bg-neutral-800 text-neutral-600 border border-transparent scale-95 opacity-20 cursor-not-allowed' 
        : 'bg-neutral-300 text-neutral-400 border border-transparent scale-95 opacity-30 cursor-not-allowed';
    }
    if (isSelected) {
      // Selected: Cinema Red as requested
      return 'bg-primary text-white border-primary scale-110 shadow-md shadow-primary/30';
    }
    // Available: Light Gray as requested
    return isDarkMode
      ? 'bg-neutral-700/50 hover:bg-neutral-600 text-white border border-white/5 hover:scale-105'
      : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700 border border-black/5 hover:scale-105';
  };

  const calculateTotal = () => {
    return selectedSeats.length * selectedShowtime.price;
  };

  const handleConfirmReservation = () => {
    if (selectedSeats.length === 0) return;

    setIsCheckingOut(true);

    // Simulate standard ticket issuance after 1.5s delay
    setTimeout(() => {
      const ticket: Ticket = {
        id: 'T-' + Math.floor(100000 + Math.random() * 900000),
        movie,
        seats: [...selectedSeats].sort(),
        date: selectedDate.fullDate,
        time: selectedShowtime.time,
        totalPrice: calculateTotal(),
        cinemaName: 'CineReserve Royal Plaza',
        bookingTime: new Date().toLocaleString()
      };

      // Store in local storage
      const existingTicketsRaw = localStorage.getItem('cinereserve_tickets');
      const existingTickets: Ticket[] = existingTicketsRaw ? JSON.parse(existingTicketsRaw) : [];
      localStorage.setItem('cinereserve_tickets', JSON.stringify([ticket, ...existingTickets]));

      setIssuedTicket(ticket);
      setIsCheckingOut(false);
    }, 1500);
  };

  const handleFinish = () => {
    if (issuedTicket) {
      onBookingSuccess(issuedTicket);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => !issuedTicket && onClose()} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      <div className={`relative w-full max-w-4xl rounded-2xl border overflow-hidden shadow-2xl transition-all z-10 ${
        isDarkMode 
          ? 'bg-neutral-950 border-white/10 text-white' 
          : 'bg-white border-black/10 text-neutral-900'
      }`}>
        {/* Interactive Close icon */}
        {!issuedTicket && (
          <button 
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:scale-105 transition-all ${
              isDarkMode ? 'hover:bg-neutral-900 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-500 hover:text-primary'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          {!issuedTicket ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              classKey="selection-screen"
              className="grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Grid Seat Board & Screen */}
              <div className="lg:col-span-8 p-6 lg:p-8 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-inherit">
                <div className="w-full">
                  <div className="mb-4">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest">Cinema Hall 04</span>
                    <h2 className="text-xl font-extrabold truncate">{movie.title}</h2>
                  </div>

                  {/* Cinema Screen shape */}
                  <div className="relative w-full flex flex-col items-center mb-10 mt-6 select-none">
                    <div className="w-[85%] h-1.5 bg-gradient-to-r from-primary via-red-500 to-primary rounded-full shadow-lg shadow-primary/40" />
                    <span className="text-[10px] text-neutral-400 font-extrabold tracking-[0.3em] uppercase mt-2">SCREEN</span>
                  </div>

                  {/* Seats Grid */}
                  <div className="flex flex-col gap-2.5 items-center justify-center overflow-x-auto py-4">
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((rowLetter) => {
                      const rowSeats = seats.filter(s => s.row === rowLetter);
                      return (
                        <div key={rowLetter} className="flex items-center gap-1.5 min-w-max">
                          <span className="w-5 text-center text-xs font-bold text-neutral-400 select-none mr-2">{rowLetter}</span>
                          <div className="flex gap-2">
                            {rowSeats.map((seat) => {
                              const isSelected = selectedSeats.includes(seat.id);
                              return (
                                <button
                                  key={seat.id}
                                  id={`seat-${seat.id}`}
                                  onClick={() => handleSeatClick(seat.id)}
                                  disabled={seat.isReserved}
                                  title={`Seat ${seat.id}`}
                                  className={`w-7 h-7 rounded-md text-[9px] font-bold flex items-center justify-center transition-all cursor-pointer ${getSeatColorClass(seat)}`}
                                >
                                  {seat.number}
                                </button>
                              );
                            })}
                          </div>
                          <span className="w-5 text-center text-xs font-bold text-neutral-400 select-none ml-2">{rowLetter}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Seat Color Legend (Monochromatic scale) */}
                  <div className="flex justify-center gap-6 mt-8 border-t pt-5 border-inherit text-xs font-medium text-neutral-400">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-xs ${isDarkMode ? 'bg-neutral-700/50 border border-white/5' : 'bg-neutral-200 border border-black/5'}`} />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-xs bg-primary" />
                      <span className="text-primary font-bold">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-xs opacity-30 ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
                      <span>Occupied</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Date,stime, total cost configuration */}
              <div className={`lg:col-span-4 p-6 lg:p-8 flex flex-col justify-between ${
                isDarkMode ? 'bg-neutral-900/40' : 'bg-neutral-50/50'
              }`}>
                <div>
                  {/* Select Date */}
                  <div className="mb-6">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      Select Date
                    </h3>
                    <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
                      {dates.map((date) => {
                        const isSelect = selectedDate.dayNumber === date.dayNumber;
                        return (
                          <button
                            key={date.dayNumber}
                            id={`date-${date.dayNumber}`}
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center p-2 rounded-xl border min-w-14 cursor-pointer transition-all ${
                              isSelect
                                ? 'bg-primary border-primary text-white scale-105'
                                : isDarkMode
                                  ? 'bg-neutral-950 border-white/5 text-neutral-300 hover:bg-neutral-900'
                                  : 'bg-white border-black/5 text-neutral-600 hover:bg-neutral-100'
                            }`}
                          >
                            <span className="text-[10px] font-bold uppercase">{date.dayName}</span>
                            <span className="text-md font-extrabold mt-0.5">{date.dayNumber}</span>
                            <span className="text-[8px] opacity-70 mt-0.5">{date.month}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Showtime */}
                  <div className="mb-6">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Select Showtime
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {SHOWTIMES.map((st) => {
                        const isSelect = selectedShowtime.id === st.id;
                        return (
                          <button
                            key={st.id}
                            id={`showtime-${st.id}`}
                            onClick={() => setSelectedShowtime(st)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center cursor-pointer transition-all relative overflow-hidden ${
                              isSelect
                                ? 'bg-primary border-primary text-white'
                                : isDarkMode
                                  ? 'bg-neutral-950 border-white/5 text-neutral-300 hover:bg-neutral-900'
                                  : 'bg-white border-black/5 text-neutral-600 hover:bg-neutral-100'
                            }`}
                          >
                            <span className="text-xs font-extrabold">{st.time}</span>
                            <span className="text-[9px] opacity-75 mt-0.5">{st.type} • {st.price.toLocaleString('vi-VN')}đ</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected summary description list details */}
                  <div className="border-t border-b py-4 my-6 border-inherit">
                    <div className="flex justify-between items-center text-xs font-medium mb-2 text-neutral-400">
                      <span>Movie</span>
                      <span className="font-bold text-inherit">{movie.title}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium mb-2 text-neutral-400">
                      <span>Schedule</span>
                      <span className="font-semibold text-inherit">{selectedDate.dayName}, {selectedDate.month} {selectedDate.dayNumber} @ {selectedShowtime.time}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium text-neutral-400">
                      <span>Selected Seats</span>
                      <span className="font-extrabold text-primary flex items-center gap-1">
                        <Armchair className="w-3.5 h-3.5" />
                        {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'None'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-semibold text-neutral-400">Total Price</span>
                    <span className="text-2xl font-black text-primary">
                      {calculateTotal().toLocaleString('vi-VN')} VND
                    </span>
                  </div>

                  <button
                    onClick={handleConfirmReservation}
                    id="checkout-confirm-btn"
                    disabled={selectedSeats.length === 0 || isCheckingOut}
                    className={`w-full py-3.5 rounded-xl text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-primary/25 relative overflow-hidden ${
                      selectedSeats.length === 0
                        ? 'bg-neutral-300 opacity-50 cursor-not-allowed'
                        : 'bg-primary hover:brightness-110 active:scale-98'
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                        SECURE PAYING...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        CONFIRM RESERVATION
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Successful Checkout Ticket Receipt Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              classKey="receipt-screen"
              className="p-8 flex flex-col items-center justify-center max-w-md mx-auto text-center"
            >
              <div className="bg-emerald-500/10 p-4 rounded-full mb-4 ring-8 ring-emerald-500/5">
                <Sparkles className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-black leading-tight text-emerald-500 mb-1">Booking Confirmed!</h2>
              <p className="text-xs text-neutral-400 mb-6">Your transaction has been securely authorized.</p>

              {/* Holographic Ticket Graphic */}
              <div className={`w-full border rounded-2xl relative overflow-hidden text-left shadow-xl ${
                isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-neutral-100 border-black/10'
              }`}>
                {/* Decorative half circles for cut-out feel */}
                <div className={`absolute -right-3 top-[65%] w-6 h-6 rounded-full border z-10 ${
                  isDarkMode ? 'bg-neutral-950 border-white/10' : 'bg-white border-black/10'
                }`} />
                <div className={`absolute -left-3 top-[65%] w-6 h-6 rounded-full border z-10 ${
                  isDarkMode ? 'bg-neutral-950 border-white/10' : 'bg-white border-black/10'
                }`} />

                {/* Ticket Top */}
                <div className="p-5 border-b border-dashed border-inherit">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary font-black tracking-tight text-sm">CineReserve Pass</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Code: {issuedTicket.id}</span>
                  </div>

                  <div className="flex gap-4">
                    <img 
                      src={movie.image} 
                      alt="" 
                      className="w-14 h-20 rounded-lg object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-extrabold text-sm leading-tight text-inherit">{movie.title}</h3>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{movie.genre} • {movie.duration}</p>
                      <p className="text-[10px] text-neutral-400 mt-2 flex items-center gap-1">
                        <Armchair className="w-3 h-3 text-primary animate-bounce" />
                        Seat(s): <strong className="text-inherit">{issuedTicket.seats.join(', ')}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-5 bg-inherit flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold mb-4">
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase">Date</span>
                      <span className="text-inherit">{issuedTicket.date}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase">Time</span>
                      <span className="text-inherit">{issuedTicket.time}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-inherit">
                    <span className="text-neutral-400">Paid Amount</span>
                    <span className="text-md text-primary font-extrabold">{issuedTicket.totalPrice.toLocaleString('vi-VN')} VND</span>
                  </div>

                  {/* Simulated barcode */}
                  <div className="mt-6 flex flex-col items-center">
                    <div className={`w-full h-12 bg-neutral-950 flex items-center justify-around px-4 rounded-md border border-inherit py-1 ${
                      isDarkMode ? 'opacity-90' : 'brightness-125'
                    }`}>
                      {/* Generates alternating barcodes bar lines */}
                      <div className="flex justify-between w-full h-full">
                        {Array.from({ length: 48 }).map((_, index) => {
                          const w = (index % 4 === 0 || index % 7 === 0) ? 'w-1' : 'w-0.5';
                          const color = index % 3 === 0 ? 'bg-transparent' : 'bg-neutral-200';
                          return <div key={index} className={`h-full ${w} ${color}`} />;
                        })}
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">{issuedTicket.id}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinish}
                id="receipt-finish-btn"
                className="w-full mt-6 py-3.5 rounded-xl bg-primary hover:brightness-110 active:scale-98 text-white font-extrabold text-xs transition-all cursor-pointer shadow-lg shadow-primary/20"
              >
                DONE, RETURN HOME
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
