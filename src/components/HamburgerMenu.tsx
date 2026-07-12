import React, { useState, useEffect } from 'react';
import { Globe, Sun, Moon, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../data';

interface HamburgerMenuProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  activeTab: 'home' | 'about' | 'boutique' | 'journal' | 'contact';
  setActiveTab: (tab: 'home' | 'about' | 'boutique' | 'journal' | 'contact') => void;
  openBooking: () => void;
}

export default function HamburgerMenu({
  language,
  setLanguage,
  theme,
  toggleTheme,
  activeTab,
  setActiveTab,
  openBooking,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[language];

  // Lock scroll on body when full-screen overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Automatically close menu if screen size expands above mobile threshold
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: t.home, id: 'home' as const },
    { name: t.about, id: 'about' as const },
    { name: t.boutique, id: 'boutique' as const },
    { name: t.journal, id: 'journal' as const },
    { name: t.contact, id: 'contact' as const },
  ];

  return (
    <div className="sm:hidden block z-50">
      {/* Animated Hamburger Button with custom framer-motion path lines */}
      <button
        id="hamburger-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-11 h-11 flex flex-col items-center justify-center rounded-full bg-neutral-900/60 hover:bg-neutral-900/80 light:bg-stone-100 light:hover:bg-stone-200 border border-gold-400/20 light:border-neutral-200 transition-colors focus:outline-none cursor-pointer"
        aria-label="Toggle Navigation Menu"
      >
        <div className="w-5 h-4 flex flex-col justify-between relative">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full h-0.5 bg-gold-400 light:bg-neutral-800 rounded-full origin-center"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full h-0.5 bg-gold-400 light:bg-neutral-800 rounded-full"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full h-0.5 bg-gold-400 light:bg-neutral-800 rounded-full origin-center"
          />
        </div>
      </button>

      {/* Luxurious Full-Screen Overlay Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-neutral-950/98 dark:bg-neutral-950/98 light:bg-stone-50/98 backdrop-blur-2xl flex flex-col justify-between pt-32 px-8 pb-10 text-white light:text-neutral-900 z-40"
          >
            {/* Subtle background luxury details (Guilloché lines for horology aesthetics) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-400/30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-gold-400/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-gold-400/15" />
            </div>

            {/* Menu Links with Elegant Staggered Entry */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="flex flex-col space-y-6 my-auto relative z-10"
            >
              {navLinks.map((link) => (
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setIsOpen(false);
                  }}
                  className={`text-2xl tracking-[0.15em] uppercase font-serif text-left py-2 border-b border-neutral-900 light:border-neutral-200/60 cursor-pointer focus:outline-none flex items-center justify-between ${
                    activeTab === link.id
                      ? 'text-gold-400 font-bold'
                      : 'text-neutral-200 hover:text-gold-300 light:text-neutral-800 light:hover:text-gold-600'
                  }`}
                >
                  <span>{link.name}</span>
                  {activeTab === link.id && (
                    <motion.span
                      layoutId="activeIndicatorMobile"
                      className="w-2.5 h-2.5 rounded-full bg-gold-400"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Premium Language, Theme Controls, and Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto space-y-6 pt-6 border-t border-neutral-900 light:border-neutral-200 relative z-10"
            >
              {/* Language Switcher */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 light:text-neutral-500 uppercase tracking-[0.2em] font-sans">
                  Langue / Language
                </span>
                <button
                  id="lang-switcher-btn"
                  onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
                  className="flex items-center space-x-2 px-4 py-2 border border-neutral-800 light:border-neutral-200 rounded-full text-xs font-mono tracking-widest text-neutral-300 light:text-neutral-700 bg-neutral-900/50 light:bg-stone-100"
                >
                  <Globe className="w-3.5 h-3.5 text-gold-400" />
                  <span>{language === 'FR' ? 'FRANÇAIS' : 'ENGLISH'}</span>
                </button>
              </div>

              {/* Theme/Atmosphere Switcher */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 light:text-neutral-500 uppercase tracking-[0.2em] font-sans">
                  Atmosphère
                </span>
                <button
                  id="theme-switcher-btn"
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 px-4 py-2 border border-neutral-800 light:border-neutral-200 rounded-full text-xs tracking-widest text-neutral-300 light:text-neutral-700 bg-neutral-900/50 light:bg-stone-100"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>CLAIRE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-neutral-600" />
                      <span>SOMBRE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sovereign Private Salon Concierge Button */}
              <button
                id="concierge-trigger-btn"
                onClick={() => {
                  setIsOpen(false);
                  openBooking();
                }}
                className="w-full py-4 bg-gold-400 hover:bg-gold-500 text-neutral-950 text-xs font-sans font-bold uppercase tracking-[0.25em] rounded-full text-center shadow-lg shadow-gold-500/10 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.contactUs}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
