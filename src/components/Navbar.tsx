import React, { useState, useEffect } from 'react';
import { Globe, Sun, Moon, ShoppingBag, Calendar, Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Theme } from '../types';
import { TRANSLATIONS } from '../data';
import HamburgerMenu from './HamburgerMenu';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  cartCount: number;
  openCart: () => void;
  openBooking: () => void;
  activeTab: 'home' | 'about' | 'boutique' | 'journal' | 'contact';
  setActiveTab: (tab: 'home' | 'about' | 'boutique' | 'journal' | 'contact') => void;
}

export default function Navbar({
  language,
  setLanguage,
  theme,
  toggleTheme,
  cartCount,
  openCart,
  openBooking,
  activeTab,
  setActiveTab
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.home, id: 'home' as const },
    { name: t.about, id: 'about' as const },
    { name: t.boutique, id: 'boutique' as const },
    { name: t.journal, id: 'journal' as const },
    { name: t.contact, id: 'contact' as const },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-opacity-90 border-b border-opacity-10 border-gold-400 bg-neutral-950 text-white light:bg-stone-50 light:text-neutral-900 light:border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <button 
          onClick={() => setActiveTab('home')} 
          className="flex flex-col select-none text-left cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-xl tracking-[0.25em] font-bold text-gold-400 light:text-neutral-900 uppercase">
            DollarD
          </span>
          <span className="text-[9px] tracking-[0.4em] font-sans text-neutral-400 light:text-neutral-500 uppercase -mt-0.5">
            Bijoux
          </span>
        </button>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-xs tracking-[0.18em] uppercase font-sans cursor-pointer transition-all duration-300 relative py-1 focus:outline-none ${
                activeTab === link.id
                  ? 'text-gold-400 font-semibold'
                  : 'text-neutral-300 hover:text-gold-300 light:text-neutral-700 light:hover:text-gold-600'
              }`}
            >
              <span>{link.name}</span>
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400" />
              )}
            </button>
          ))}
        </div>

        {/* Right Side: Quick Action Controls */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded border border-neutral-800 hover:border-gold-400 light:border-neutral-200 light:hover:border-neutral-400 transition-all text-xs font-mono tracking-widest text-neutral-300 light:text-neutral-700 hover:text-gold-300"
            title="Change language / Changer de langue"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span>{language}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-neutral-800 hover:border-gold-400 light:border-neutral-200 light:hover:border-neutral-400 transition-all text-neutral-300 light:text-neutral-700 hover:text-gold-300"
            title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          {/* Private Booking Trigger */}
          <button
            onClick={openBooking}
            className="flex items-center space-x-2 px-4 py-2 border border-gold-500/40 rounded-full hover:border-gold-400 text-xs tracking-wider uppercase font-sans bg-gold-400/10 text-gold-300 hover:bg-gold-400/20 light:bg-neutral-900 light:text-white light:border-neutral-800 light:hover:bg-neutral-800 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.contactUs}</span>
          </button>

          {/* Shopping Chest Drawer Toggle */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-full border border-neutral-800 hover:border-gold-400 light:border-neutral-200 light:hover:border-neutral-400 text-neutral-300 light:text-neutral-700 hover:text-gold-300 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-neutral-950 font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={openCart}
            className="relative p-2 rounded-full text-neutral-300 light:text-neutral-700"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-neutral-950 font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Below 640px (smartphones): Exquisite new full-screen HamburgerMenu with Framer Motion */}
          <HamburgerMenu
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            toggleTheme={toggleTheme}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openBooking={openBooking}
          />

          {/* Above 640px (tablets): Keep existing menu trigger for screens in sm: range */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hidden sm:block p-2 text-neutral-300 light:text-neutral-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Luxurious Full-Screen Mobile Menu Overlay with Framer Motion for Tablets (640px to 768px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex fixed inset-0 w-full h-screen z-40 bg-neutral-950/98 dark:bg-neutral-950/98 light:bg-stone-50/98 backdrop-blur-2xl flex flex-col pt-28 px-8 pb-10 text-white light:text-neutral-900"
          >
            {/* Main Menu Links with Staggered Entrance */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1
                  }
                }
              }}
              className="flex flex-col space-y-6 my-auto"
            >
              {navLinks.map((link) => (
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
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
                      layoutId="activeIndicator"
                      className="w-2.5 h-2.5 rounded-full bg-gold-400"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Quick Actions & Luxury Triggers at the bottom */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto space-y-6 pt-6 border-t border-neutral-900 light:border-neutral-200"
            >
              {/* Language Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 light:text-neutral-500 uppercase tracking-[0.2em]">Langue / Language</span>
                <button
                  onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
                  className="flex items-center space-x-2 px-4 py-2 border border-neutral-800 light:border-neutral-200 rounded-full text-xs font-mono tracking-widest text-neutral-300 light:text-neutral-700 bg-neutral-900/50 light:bg-stone-100"
                >
                  <Globe className="w-3.5 h-3.5 text-gold-400" />
                  <span>{language === 'FR' ? 'FRANÇAIS' : 'ENGLISH'}</span>
                </button>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 light:text-neutral-500 uppercase tracking-[0.2em]">Atmosphère</span>
                <button
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

              {/* Concierge Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
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
    </nav>
  );
}
