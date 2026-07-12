import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Sparkles, MessageSquare, Check, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import { updateMetaTags, generateMetadata } from './lib/seo';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import WatchConfigurator from './components/WatchConfigurator';
import CollectionGrid from './components/CollectionGrid';
import JournalSection from './components/JournalSection';
import ServicesContact from './components/ServicesContact';
import TestimonialsAndFAQ from './components/TestimonialsAndFAQ';
import AgencyConsulting from './components/AgencyConsulting';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import InteractiveGoldDust from './components/InteractiveGoldDust';
import ParallaxSection from './components/ParallaxSection';
import LiveSalesToast from './components/LiveSalesToast';
import { Language, Theme, Product, CartItem } from './types';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [language, setLanguage] = useState<Language>('FR');
  const [theme, setTheme] = useState<Theme>('light');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'boutique' | 'journal' | 'contact'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState('');
  const [notification, setNotification] = useState('');

  const sectionContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  // Manage theme on load and changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  // Programmatic dynamic updates of document Title and Meta Description for SEO
  useEffect(() => {
    window.scrollTo(0, 0);
    const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://maisondollard.com';
    const metadata = generateMetadata({
      page: activeTab,
      language,
      originUrl
    });
    updateMetaTags(metadata);
  }, [activeTab, language]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  // Add normal product to cart
  const handleAddToCart = (product: Product, customizedDial?: string, customizedStrap?: string) => {
    setCartItems((prev) => {
      // If customizable, always add as a separate item to preserve custom details
      if (customizedDial || customizedStrap) {
        return [...prev, { product, quantity: 1, customizedDial, customizedStrap }];
      }

      // Check if normal product already exists
      const existingIdx = prev.findIndex((item) => item.product.id === product.id && !item.customizedDial && !item.customizedStrap);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      
      return [...prev, { product, quantity: 1 }];
    });

    showNotification(language === 'FR' ? 'Pièce ajoutée avec succès au coffret' : 'Piece successfully added to the chest');
  };

  // Remove item from cart
  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
    showNotification(language === 'FR' ? 'Pièce retirée du coffret' : 'Piece removed from the chest');
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
    setCartOpen(false);
    showNotification(language === 'FR' ? 'Votre coffret a été vidé' : 'Your chest has been cleared');
  };

  // Trigger booking form with pre-filled interest
  const handleOpenBooking = (productName?: string) => {
    if (productName) {
      setBookingPrefill(productName);
    }
    setActiveTab('contact');
    setTimeout(() => {
      const contactForm = document.getElementById('contact-form-section');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRequestPrivateViewing = () => {
    setCartOpen(false);
    handleOpenBooking(
      language === 'FR' 
        ? `Commande Multiple / Coffret Prestige (${cartItems.length} créations)` 
        : `Prestige Multi-Piece Acquisition (${cartItems.length} creations)`
    );
  };

  return (
    <div className={`min-h-screen bg-neutral-950 text-white font-sans flex flex-col justify-between transition-colors duration-500 relative ${theme === 'light' ? 'light bg-stone-50 text-neutral-900' : ''}`}>
      
      {/* Dynamic Gold Scroll Progress Bar */}
      <motion.div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-600 via-gold-400 to-amber-600 origin-left z-[110] shadow-sm shadow-gold-500/20"
        style={{ scaleX }}
      />

      {/* Premium Floating Gold Particles Interactive Canvas layer */}
      <InteractiveGoldDust theme={theme} />

      {/* Top Floating Notification banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-gold-500 text-neutral-950 font-sans text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-neutral-950 animate-pulse" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setCartOpen(true)}
        openBooking={() => handleOpenBooking()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Page content with sleek layout animation */}
      <main className="flex-grow z-10 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative"
          >
            {activeTab === 'home' && (
              <>
                {/* Hero Showcase slider */}
                <HeroSlider 
                  language={language} 
                  onExplore={() => setActiveTab('boutique')} 
                />
                
                {/* Visual Premium Highlights on Home with 3D Parallax scroll effect */}
                <ParallaxSection>
                  <section className="py-24 bg-neutral-950 text-white transition-all duration-500 border-t border-neutral-900/60 light:bg-stone-100 light:text-neutral-900 light:border-neutral-200">
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.1,
                          }
                        }
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="max-w-4xl mx-auto px-6 text-center space-y-8"
                    >
                      <motion.span 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                        }}
                        className="block text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase"
                      >
                        {language === 'FR' ? 'EXCLUSIVITÉ CAMEROUNAISE' : 'CAMEROONIAN EXCLUSIVITY'}
                      </motion.span>
                      
                      <motion.h3 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                        }}
                        className="font-serif text-3xl sm:text-4xl tracking-tight leading-snug text-neutral-100 light:text-neutral-900"
                      >
                        {language === 'FR' 
                          ? 'L’excellence de l’artisanat d’art et de la Haute Joaillerie contemporaine.' 
                          : 'The excellence of fine craftsmanship and contemporary High Jewelry.'}
                      </motion.h3>
                      
                      <motion.p 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                        }}
                        className="text-sm font-sans font-light text-neutral-400 light:text-neutral-600 max-w-2xl mx-auto leading-relaxed"
                      >
                        {language === 'FR'
                          ? 'Chaque création DollarD Bijoux incarne une histoire de passion, forgée dans les métaux les plus précieux et sertie de gemmes d’exception sélectionnées de manière éthique.'
                          : 'Each DollarD Bijoux creation embodies a story of passion, forged in the most precious metals and set with ethically sourced, exceptional gemstones.'}
                      </motion.p>
                      
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
                        }}
                        className="pt-4 flex justify-center space-x-4"
                      >
                        <button 
                          onClick={() => setActiveTab('boutique')}
                          className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-sans text-xs font-bold uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-lg shadow-gold-500/10"
                        >
                          {language === 'FR' ? 'Explorer les collections' : 'Explore Collections'}
                        </button>
                        <button 
                          onClick={() => setActiveTab('about')}
                          className="px-8 py-3.5 border border-neutral-800 hover:border-gold-400 text-neutral-300 hover:text-white font-sans text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer light:border-neutral-200 light:text-neutral-700 light:hover:text-neutral-950"
                        >
                          {language === 'FR' ? 'Notre héritage' : 'Our Heritage'}
                        </button>
                      </motion.div>
                    </motion.div>
                  </section>
                </ParallaxSection>
                <TestimonialsAndFAQ language={language} category="home" />
              </>
            )}

            {activeTab === 'about' && (
              <motion.div
                variants={sectionContainerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <AboutSection language={language} />
                <TestimonialsAndFAQ language={language} category="about" />
              </motion.div>
            )}

            {activeTab === 'boutique' && (
              <motion.div
                variants={sectionContainerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                {/* Special Commissions Customizer Atelier */}
                <WatchConfigurator
                  language={language}
                  onAddToCart={(customWatch, dial, strap) => handleAddToCart(customWatch, dial, strap)}
                />

                {/* Luxury Collection Grid / E-Commerce Boutique with Search */}
                <CollectionGrid
                  language={language}
                  onAddToCart={(p) => handleAddToCart(p)}
                  openBookingWithProduct={(pName) => handleOpenBooking(pName)}
                />

                <TestimonialsAndFAQ language={language} category="boutique" />
              </motion.div>
            )}

            {activeTab === 'journal' && (
              <motion.div
                variants={sectionContainerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                <JournalSection language={language} />
                <TestimonialsAndFAQ language={language} category="journal" />
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                variants={sectionContainerVariants}
                initial="hidden"
                animate="visible"
                className="w-full"
              >
                {/* Private Service Scheduling & Secure Delivery FAQ */}
                <ServicesContact
                  language={language}
                  prefilledProduct={bookingPrefill}
                  onClearPrefill={() => setBookingPrefill('')}
                />

                {/* Agency Consulting & Pitch Strategy */}
                <AgencyConsulting language={language} />

                <TestimonialsAndFAQ language={language} category="contact" />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Exquisite Footer */}
      <Footer language={language} />

      {/* Real-time Simulated Worldwide Sales notifications */}
      <LiveSalesToast language={language} />

      {/* Shopping Acquisition Drawer */}
      <CartDrawer
        language={language}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onRequestPrivateViewing={handleRequestPrivateViewing}
      />

    </div>
  );
}
