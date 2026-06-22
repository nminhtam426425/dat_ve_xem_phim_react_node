import { CINEMAS } from '../data';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';

interface CinemasTabProps {
  isDarkMode: boolean;
}

export default function CinemasTab({ isDarkMode }: CinemasTabProps) {
  return (
    <div className="max-w-4xl mx-auto py-6" id="cinemas-section">
      <div className="mb-8 border-b pb-4 border-inherit">
        <h2 className="text-3xl font-black mb-1 flex items-center gap-2">
          <MapPin className="w-7 h-7 text-primary" />
          Cinemas
        </h2>
        <p className="text-xs text-neutral-400">Discover premium CineReserve venues and high-end screening halls near your location.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CINEMAS.map((cinema) => (
          <div
            key={cinema.id}
            id={`cinema-${cinema.id}`}
            className={`border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] flex flex-col justify-between ${
              isDarkMode 
                ? 'bg-neutral-900 border-white/5 text-white' 
                : 'bg-white border-black/10 text-neutral-900 shadow-xs'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase text-primary tracking-widest">Active Complex</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Premium IMAX
                </span>
              </div>
              <h3 className="font-extrabold text-lg leading-snug mb-4">{cinema.name}</h3>

              <div className="space-y-3.5 text-xs text-neutral-400 font-medium">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{cinema.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>{cinema.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>Opening hours: 08:00 AM - 12:00 AM Daily</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 border-inherit flex justify-between items-center text-xs font-semibold">
              <span className="text-neutral-400 font-medium">Facilities: laser IMAX, Atmos, VIP suites</span>
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cinema.name)}`, '_blank')}
                className="text-primary hover:underline flex items-center justify-end gap-0.5 cursor-pointer"
              >
                Directions
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
