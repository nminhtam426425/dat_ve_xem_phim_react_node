import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Receipt, Armchair, Calendar, Clock, Trash2, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { Ticket } from '../types';

interface MyTicketsProps {
  tickets: Ticket[];
  onCancelTicket: (ticketId: string) => void;
  isDarkMode: boolean;
}

export default function MyTickets({
  tickets,
  onCancelTicket,
  isDarkMode
}: MyTicketsProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCancelClick = (ticketId: string) => {
    // Elegant cancellation confirmation simulation
    if (window.confirm('Are you sure you want to cancel this booking and request a refund?')) {
      onCancelTicket(ticketId);
      setSuccessMsg('Booking cancelled successfully! A full refund has been initiated.');
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6" id="my-tickets-section">
      <div className="mb-8 border-b pb-4 border-inherit">
        <h2 className="text-3xl font-black mb-1 flex items-center gap-2">
          <Receipt className="w-7 h-7 text-primary" />
          My Tickets
        </h2>
        <p className="text-xs text-neutral-400">View and manage your active premium cinematic boarding passes.</p>
      </div>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-center gap-2 font-bold"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {tickets.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border ${
          isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-neutral-50 border-black/5'
        }`}>
          <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="font-extrabold text-lg">No Active Boarding Passes Found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1 mb-6 leading-relaxed">
            You haven't reserved any theater seats yet. Browse through our premium catalog of now-showing titles to secure your screening tickets!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                id={`ticket-${ticket.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`border rounded-2xl relative overflow-hidden transition-all shadow-lg flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-white/5 hover:border-white/10 text-white' 
                    : 'bg-white border-black/10 hover:border-black/15 text-neutral-900'
                }`}
              >
                {/* Visual cuts inside cards */}
                <div className={`absolute -right-3 top-[55%] w-6 h-6 rounded-full border z-10 ${
                  isDarkMode ? 'bg-neutral-950 border-white/5' : 'bg-neutral-50 border-black/15'
                }`} />
                <div className={`absolute -left-3 top-[55%] w-6 h-6 rounded-full border z-10 ${
                  isDarkMode ? 'bg-neutral-950 border-white/5' : 'bg-neutral-50 border-black/15'
                }`} />

                {/* Ticket Top Part */}
                <div className="p-5 border-b border-dashed border-inherit">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">Boarding pass</span>
                      <h3 className="font-extrabold text-lg leading-tight mt-0.5">{ticket.movie.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase">
                      Code: {ticket.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{ticket.cinemaName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[9px] text-neutral-400 uppercase block tracking-wider font-semibold">Screening Date</span>
                      <span className="font-extrabold flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {ticket.date}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-neutral-400 uppercase block tracking-wider font-semibold">Start Time</span>
                      <span className="font-extrabold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {ticket.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket Bottom Part */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[9px] text-neutral-400 block uppercase font-semibold">Configured Seats</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Armchair className="w-4 h-4 text-primary" />
                        <span className="font-extrabold text-primary">{ticket.seats.join(', ')}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-neutral-400 text-right block uppercase font-semibold">Paid Amount</span>
                      <span className="font-black text-md block leading-tight text-right text-inherit mt-0.5">
                        {ticket.totalPrice.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                  </div>

                  {/* Simulated barcode graphic */}
                  <div className={`w-full h-10 bg-neutral-950 flex items-center justify-around px-4 rounded border border-inherit py-1 mb-5 opacity-80 ${
                    !isDarkMode && 'brightness-125'
                  }`}>
                    <div className="flex justify-between w-full h-full">
                      {Array.from({ length: 36 }).map((_, idx) => {
                        const width = idx % 3 === 0 || idx % 5 === 0 ? 'w-0.75' : 'w-0.25';
                        const active = idx % 4 !== 0;
                        return (
                          <div 
                            key={idx} 
                            className={`h-full ${width} ${active ? 'bg-neutral-200' : 'bg-transparent'}`} 
                          />
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelClick(ticket.id)}
                    id={`cancel-ticket-btn-${ticket.id}`}
                    className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-500 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer active:scale-98 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    CANCEL RESERVATION
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
