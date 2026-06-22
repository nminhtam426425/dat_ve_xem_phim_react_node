import { useState } from 'react';
import { OFFERS } from '../data';
import { Tag, Check, Copy, Ticket } from 'lucide-react';

interface OffersTabProps {
  isDarkMode: boolean;
}

export default function OffersTab({ isDarkMode }: OffersTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-6" id="offers-section">
      <div className="mb-8 border-b pb-4 border-inherit">
        <h2 className="text-3xl font-black mb-1 flex items-center gap-2">
          <Tag className="w-7 h-7 text-primary" />
          Special Offers
        </h2>
        <p className="text-xs text-neutral-400">Claim coupon codes to get premium snack combos, complimentary IMAX seats, and exclusive student week discounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS.map((offer) => {
          const isCopied = copiedId === offer.id;
          return (
            <div
              key={offer.id}
              id={`offer-${offer.id}`}
              className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                isDarkMode 
                  ? 'bg-neutral-900 border-white/5 text-white' 
                  : 'bg-white border-black/10 text-neutral-900 shadow-xs'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-3xl filter drop-shadow-md select-none">{offer.imageUrl}</div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    Promotion
                  </span>
                </div>
                <h3 className="font-extrabold text-lg leading-tight mb-2">{offer.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-medium">{offer.description}</p>
              </div>

              <div className="space-y-3">
                <div className={`p-2.5 rounded-xl border border-dashed flex justify-between items-center ${
                  isDarkMode ? 'bg-neutral-950/60 border-white/10' : 'bg-neutral-50 border-black/10'
                }`}>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">{offer.code}</span>
                  <button
                    onClick={() => handleCopy(offer.code, offer.id)}
                    className="p-1.5 rounded-lg text-primary hover:bg-primary/15 transition-all flex items-center justify-center cursor-pointer"
                    title="Copy promo code"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {isCopied && (
                  <p className="text-center text-[10px] text-emerald-500 font-bold transition-all">Promo code copied to clipboard!</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
