import React from 'react';
import { X, Trash2, ShieldCheck, Mail, Calendar, MessageSquare } from 'lucide-react';
import { Language, CartItem } from '../types';
import { TRANSLATIONS } from '../data';
import { getWhatsAppCartUrl } from '../lib/whatsapp';
import { formatPriceCFA } from '../lib/price';

interface CartDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onRequestPrivateViewing: () => void;
}

export default function CartDrawer({
  language,
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onRequestPrivateViewing,
}: CartDrawerProps) {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-all"
      />

      {/* Cart Container Panel */}
      <div className="relative w-full max-w-md h-full bg-neutral-950 border-l border-neutral-900 text-white flex flex-col justify-between shadow-2xl p-6 z-10 light:bg-stone-50 light:text-neutral-900 light:border-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-900 light:border-neutral-200">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <h2 className="font-serif text-lg tracking-wide">{t.cartTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold-400 transition-all light:border-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Cart Items */}
        <div className="flex-grow overflow-y-auto py-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500">
                <Trash2 className="w-5 h-5" />
              </div>
              <p className="text-xs text-neutral-500 max-w-[200px] leading-relaxed">
                {t.cartEmpty}
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${idx}`}
                className="p-4 bg-neutral-900/40 border border-neutral-900 rounded-xl flex space-x-4 items-center justify-between light:bg-white light:border-neutral-200"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name[language]}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-lg bg-neutral-950 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-serif text-xs tracking-wide text-neutral-100 light:text-neutral-900 truncate">
                      {item.product.name[language]}
                    </h4>
                    
                    {/* Custom options indicators */}
                    {(item.customizedDial || item.customizedStrap) && (
                      <span className="text-[8px] font-mono text-gold-400 block truncate">
                        {item.customizedDial && `Dial: ${item.customizedDial}`} {item.customizedStrap && `| Case: ${item.customizedStrap}`}
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-neutral-500 block mt-1">
                      {item.quantity} x {formatPriceCFA(item.product.price)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="p-2 text-neutral-500 hover:text-rose-500 transition-colors"
                  title="Retirer la pièce"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="pt-6 border-t border-neutral-900 light:border-neutral-200 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 light:text-neutral-500 uppercase tracking-widest">{t.totalPrice}</span>
              <span className="font-serif text-lg font-bold text-gold-400">
                {formatPriceCFA(totalAmount)}
              </span>
            </div>

            <hr className="border-neutral-900 light:border-neutral-200" />

            <div className="space-y-2">
              {/* WhatsApp direct checkout */}
              <a
                href={getWhatsAppCartUrl(cartItems, totalAmount, language)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/20"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                <span>
                  {language === 'FR' ? 'Acquérir via WhatsApp' : 'Acquire via WhatsApp'}
                </span>
              </a>

              <button
                onClick={onRequestPrivateViewing}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-sans text-[11px] font-medium uppercase tracking-[0.12em] rounded-full transition-all flex items-center justify-center space-x-2 light:bg-white light:text-neutral-700 light:border-neutral-200 light:hover:bg-neutral-50"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>{t.requestPrivateViewing}</span>
              </button>

              <button
                onClick={onClearCart}
                className="w-full py-2 text-neutral-500 hover:text-neutral-400 text-[10px] font-mono uppercase tracking-widest transition-colors block text-center"
              >
                {language === 'FR' ? 'Vider le coffret' : 'Empty the chest'}
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[9px] text-neutral-500 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>
                {language === 'FR' 
                  ? 'Contrat de vente confidentiel rédigé par huissier' 
                  : 'Confidential sales agreement drawn up by bailiff'}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
