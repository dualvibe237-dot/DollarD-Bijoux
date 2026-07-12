import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, MapPin, Sparkles, X } from 'lucide-react';
import { Language } from '../types';
import { formatPriceCFA } from '../lib/price';

interface LiveSalesToastProps {
  language: Language;
}

interface SimulatedSale {
  id: number;
  buyerName: { FR: string; EN: string };
  city: { FR: string; EN: string };
  country: { FR: string; EN: string };
  product: { FR: string; EN: string };
  price: number;
  timeAgo: { FR: string; EN: string };
  avatarUrl: string;
}

const SIMULATED_SALES: SimulatedSale[] = [
  {
    id: 1,
    buyerName: { FR: "Marc A.", EN: "Marc A." },
    city: { FR: "Genève", EN: "Geneva" },
    country: { FR: "Suisse", EN: "Switzerland" },
    product: { FR: "Chronographe Impérial Or Rose", EN: "Imperial Chronograph Rose Gold" },
    price: 24500, // in EUR/CFA units depending on formatting
    timeAgo: { FR: "il y a 2 min", EN: "2 mins ago" },
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 2,
    buyerName: { FR: "Moussa B.", EN: "Moussa B." },
    city: { FR: "Douala", EN: "Douala" },
    country: { FR: "Cameroun", EN: "Cameroon" },
    product: { FR: "Bague Souveraine en ébène d'Afrique & Or Blanc", EN: "Sovereign Ring in African Ebony & White Gold" },
    price: 18900,
    timeAgo: { FR: "il y a 45 sec", EN: "45 secs ago" },
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 3,
    buyerName: { FR: "Lady Catherine", EN: "Lady Catherine" },
    city: { FR: "Londres", EN: "London" },
    country: { FR: "Royaume-Uni", EN: "United Kingdom" },
    product: { FR: "Collier Diamants Ciselé Main", EN: "Hand-Carved Diamond Necklace" },
    price: 68000,
    timeAgo: { FR: "il y a 4 min", EN: "4 mins ago" },
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 4,
    buyerName: { FR: "Elena R.", EN: "Elena R." },
    city: { FR: "Paris", EN: "Paris" },
    country: { FR: "France", EN: "France" },
    product: { FR: "Chronographe Impérial Platine 950", EN: "Bespoke Platinum 950 Chronograph" },
    price: 36500,
    timeAgo: { FR: "il y a 1 min", EN: "1 min ago" },
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 5,
    buyerName: { FR: "Jean-Paul K.", EN: "Jean-Paul K." },
    city: { FR: "Yaoundé", EN: "Yaoundé" },
    country: { FR: "Cameroun", EN: "Cameroon" },
    product: { FR: "Bracelet Ebène d'Afrique & Or Jaune 18k", EN: "African Ebony & 18k Yellow Gold Bracelet" },
    price: 12500,
    timeAgo: { FR: "il y a 30 sec", EN: "30 secs ago" },
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 6,
    buyerName: { FR: "Tariq A.", EN: "Tariq A." },
    city: { FR: "Dubaï", EN: "Dubai" },
    country: { FR: "Émirats Arabes Unis", EN: "United Arab Emirates" },
    product: { FR: "Montre de Prestige Impériale Diamants VVS", EN: "Prestige Imperial Watch VVS Diamonds" },
    price: 41500,
    timeAgo: { FR: "il y a 5 min", EN: "5 mins ago" },
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
  }
];

export default function LiveSalesToast({ language }: LiveSalesToastProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Wait a brief period initially before popping up the first toast
    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Continuous loop interval: 6 seconds active, 12 seconds sleep (18s total)
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % SIMULATED_SALES.length);
        setVisible(true);
      }, 1000); // Wait for exit animation to complete before changing data

    }, 18000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const sale = SIMULATED_SALES[currentIdx];

  // Helper to format prices beautifully in FCFA
  const displayPriceStr = formatPriceCFA(sale.price);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -1 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.3 } }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          className="fixed bottom-6 left-6 z-50 max-w-[360px] w-[calc(100vw-3rem)] bg-neutral-950/90 hover:bg-neutral-900/95 border border-gold-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3.5 group select-none transition-all duration-300 pointer-events-auto light:bg-stone-50/95 light:border-gold-400/30 light:shadow-gold-500/5"
        >
          {/* Purchaser Profile Pic / Glowing Crest */}
          <div className="relative flex-shrink-0">
            <img 
              src={sale.avatarUrl} 
              alt="Maison Client" 
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border-2 border-gold-400/40 p-[1.5px]"
            />
            <span className="absolute -bottom-1 -right-1 bg-gold-500 text-neutral-950 p-0.5 rounded-full border border-neutral-950">
              <Sparkles className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Core Notification Content */}
          <div className="flex-grow space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>{language === 'FR' ? 'Acquisition Confirmée' : 'Acquisition Confirmed'}</span>
            </div>

            <p className="text-[11px] font-sans font-light text-neutral-300 light:text-neutral-800 leading-snug">
              <span className="font-semibold text-neutral-100 light:text-neutral-950">{sale.buyerName[language]}</span>
              {language === 'FR' ? ' de ' : ' from '}
              <span className="inline-flex items-center gap-0.5 text-gold-400 font-medium">
                <MapPin className="w-2.5 h-2.5" />
                {sale.city[language]} ({sale.country[language]})
              </span>
              {language === 'FR' ? ' a acquis ' : ' acquired '}
              <span className="font-medium text-neutral-100 light:text-neutral-900">{sale.product[language]}</span>.
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-gold-400 font-bold tracking-wider">
                {displayPriceStr}
              </span>
              <span className="text-[9px] font-mono text-neutral-500 light:text-neutral-500">
                {sale.timeAgo[language]}
              </span>
            </div>
          </div>

          {/* Close Action Button */}
          <button
            onClick={() => {
              setVisible(false);
              setDismissed(true);
            }}
            className="text-neutral-500 hover:text-white p-1 rounded-full hover:bg-neutral-900/60 transition-all light:hover:text-neutral-900 light:hover:bg-neutral-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
