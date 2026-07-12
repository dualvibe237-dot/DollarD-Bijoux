import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface HeroSliderProps {
  language: Language;
  onExplore: () => void;
}

export default function HeroSlider({ language, onExplore }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Slides data
  const slides = [
    {
      id: 'slide-jewelry-316l',
      category: language === 'FR' ? 'JOAILLERIE D’ACIER NOBLE' : 'NOBLE STEEL JEWELRY',
      title: language === 'FR' ? 'L’Éclat Éternel 316L' : 'Eternal Brilliance 316L',
      subtitle: language === 'FR' ? 'Acier Inoxydable Robuste & Hypoallergénique' : 'Robust & Hypoallergenic Stainless Steel',
      description: language === 'FR' ? 'Façonné pour résister à l’usure du temps et au climat. Une élégance impériale conçue pour tous, du nouveau-né au deuxième âge.' : 'Crafted to resist time and any climate. An imperial elegance designed for everyone, from newborns to precious elders.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
      podiumColor: 'border-gold-500/30 shadow-gold-500/20',
      specs: ['ACIER 316L PREMIUM', 'SANS ALLERGIE', 'PRESTIGE ACCESSIBLE'],
    },
    {
      id: 'slide-custom-engraving',
      category: language === 'FR' ? 'ATELIER DE CONCEPTION SUR-MESURE' : 'BESPOKE DESIGN ATELIER',
      title: language === 'FR' ? 'Vos Bijoux Personnalisés' : 'Your Personalized Jewelry',
      subtitle: language === 'FR' ? 'Gravure de Précision à Douala & Yaoundé' : 'Precision Engraving in Douala & Yaounde',
      description: language === 'FR' ? 'Colliers, bracelets et bagues uniques, gravés sur-mesure pour célébrer vos histoires et vos liens d’amour éternels.' : 'Unique necklaces, bracelets, and rings, custom-engraved to celebrate your personal stories and eternal bonds of love.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
      podiumColor: 'border-amber-700/30 shadow-amber-700/20',
      specs: ['GRAVURE LOCALE', 'CADEAU D’EXCEPTION', 'Savoir-Faire Unique'],
    },
    {
      id: 'slide-prestige-access',
      category: language === 'FR' ? 'INNOVATION & ACCESSIBILITÉ' : 'INNOVATION & ACCESSIBILITY',
      title: language === 'FR' ? 'La Joaillerie pour Tous' : 'Jewelry for Everyone',
      subtitle: language === 'FR' ? 'Le Meilleur Rapport Qualité-Prix' : 'The Best Quality-to-Price Ratio',
      description: language === 'FR' ? 'Notre objectif est d’apporter des solutions concrètes de parures exclusives adaptées à toutes les bourses de notre continent.' : 'Our core mission is to deliver concrete solutions of high-end exclusive jewelry adapted to all budgets on our continent.',
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
      podiumColor: 'border-emerald-500/30 shadow-emerald-500/20',
      specs: ['DESIGN AFRICAIN', '100% SÉCURISÉ', 'CONCIERGERIE PRIVÉE'],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    // Auto rotate slides every 8 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  // Calculate dispersion values based on scroll
  // Max scroll effect is capped around 500px
  const scrollRatio = Math.min(scrollY / 500, 1);
  const showCompleteUniverse = scrollRatio > 0.45;

  // Parallax offsets
  const parallaxX = mousePos.x * 15;
  const parallaxY = mousePos.y * 15;

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full bg-neutral-950 text-white overflow-hidden flex flex-col justify-center"
    >
      {/* Texture background layout */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#1c1917_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Studio Lighting Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full spotlight-glow opacity-80 blur-3xl pointer-events-none transition-transform duration-1000" />
      
      {/* Luxury Marquee Header Slogans (on a very thin strip behind) */}
      <div className="absolute top-24 left-0 w-full z-10 pointer-events-none opacity-20">
        <div className="overflow-hidden whitespace-nowrap py-1 font-serif text-xs uppercase tracking-[0.4em] select-none text-gold-200">
          <div className="inline-block animate-[marquee_40s_linear_infinite]">
            {t.sloganMarquee} {t.sloganMarquee}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20 pt-20 pb-12 w-full">
        
        {/* Left Side: Editorial Typography Context */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {!showCompleteUniverse ? (
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1 - scrollRatio * 2, y: -scrollRatio * 100 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-[1px] bg-gold-400"></span>
                  <span className="text-[11px] font-sans tracking-[0.3em] text-gold-300 font-semibold uppercase">
                    {current.category}
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-neutral-100">
                  {current.title}
                  <span className="block text-2xl sm:text-3xl font-sans font-light tracking-wide text-neutral-400 mt-2">
                    {current.subtitle}
                  </span>
                </h1>

                <p className="text-sm font-sans font-light text-neutral-400 leading-relaxed max-w-md">
                  {current.description}
                </p>

                {/* Technical details tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {current.specs.map((spec, i) => (
                    <span key={i} className="text-[9px] font-mono tracking-widest text-gold-300 border border-gold-400/20 bg-gold-400/5 px-2.5 py-1 rounded">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="pt-6 flex flex-wrap gap-4">
                  <a
                    href="#boutique"
                    className="group flex items-center space-x-3 px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-neutral-950 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/30"
                  >
                    <span>{t.viewCollection}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </a>

                  <button
                    onClick={onExplore}
                    className="flex items-center space-x-2 px-6 py-3.5 border border-neutral-700 hover:border-gold-400 text-neutral-300 hover:text-white rounded-full font-sans text-xs uppercase tracking-widest transition-colors duration-300"
                  >
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span>{t.explore}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              // Scroll transform text introduction
              <motion.div
                key="universe-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-[1px] bg-gold-400"></span>
                  <span className="text-xs font-sans tracking-[0.3em] text-gold-400 font-bold uppercase">
                    {language === 'FR' ? 'RÉVÉLATION IMPÉRIALE' : 'IMPERIAL REVELATION'}
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                  {language === 'FR' ? 'Découvrez l’Univers' : 'Discover the Universe'}
                  <span className="block font-sans font-light text-gold-300 mt-2 text-2xl sm:text-3xl">
                    Maison DollarD Bijoux
                  </span>
                </h1>
                <p className="text-sm font-sans font-light text-neutral-400 leading-relaxed max-w-md">
                  {language === 'FR' 
                    ? 'L’art de la haute joaillerie et horlogerie d’exception ancré au Cameroun avec une signature de prestige internationale.' 
                    : 'The art of haute joaillerie and high horology anchored in Cameroon with an international prestige signature.'}
                </p>
                <a
                  href="#about"
                  className="inline-flex items-center space-x-3 text-xs uppercase tracking-widest font-sans font-bold text-gold-400 hover:text-gold-300 group transition-colors"
                >
                  <span>{t.explore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: The Center "Watch On Podium" Masterpiece */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2 relative h-[550px] w-full">
          
          {/* Inner Light Beam Spotlight */}
          <div className="absolute top-[10%] w-[1px] h-[50%] bg-gradient-to-b from-gold-400/60 via-gold-500/10 to-transparent z-10 pointer-events-none" />

          {/* Slider Controls */}
          {!showCompleteUniverse && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full z-30 flex justify-between px-2 pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-2 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-gold-400 text-neutral-400 hover:text-white transition-all transform hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto p-2 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-gold-400 text-neutral-400 hover:text-white transition-all transform hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Master 3D Watch/Jewelry Podium Display */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Ambient Podium Under-glow */}
            <div 
              className={`absolute bottom-[10%] w-[320px] sm:w-[420px] h-[40px] rounded-full filter blur-xl transition-all duration-1000 ${
                currentSlide === 0 ? 'bg-gold-500/20' : currentSlide === 1 ? 'bg-emerald-500/20' : 'bg-amber-700/20'
              }`} 
            />

            {/* Luxurious Circular Circular Photostudio Pedestal / Podium */}
            <div 
              style={{
                transform: `perspective(1000px) rotateX(65deg) rotateY(${-parallaxX * 0.1}deg) translateY(${scrollY * 0.2}px)`,
                transition: 'transform 0.1s ease'
              }}
              className={`absolute bottom-[12%] w-[260px] sm:w-[350px] h-[260px] sm:h-[350px] rounded-full border-[6px] bg-neutral-900/60 backdrop-blur-sm shadow-2xl transition-all duration-1000 ${current.podiumColor}`}
            >
              {/* Internal Concentric Engravings on Podium */}
              <div className="absolute inset-[15%] rounded-full border border-neutral-800 flex items-center justify-center">
                <div className="absolute inset-[25%] rounded-full border border-gold-500/10 animate-slow-spin flex items-center justify-center">
                  {/* Subtle Cameroon Star Compass design lines */}
                  <div className="w-[1px] h-full bg-gold-400/10 absolute" />
                  <div className="h-[1px] w-full bg-gold-400/10 absolute" />
                </div>
              </div>
            </div>

            {/* EXPLODED DISPERSION COMPONENT VIEW */}
            <div 
              style={{
                transform: `translateX(${parallaxX}px) translateY(${parallaxY - scrollY * 0.15}px) scale(${1 - scrollRatio * 0.1})`,
                transition: 'transform 0.15s ease'
              }}
              className="relative w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] z-20 flex items-center justify-center cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`media-${currentSlide}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  
                  {/* Normal Single View (no scroll) vs Exploded Elements (with scroll) */}
                  {currentSlide === 0 ? (
                    // WATCH DISPERSION ELEMENTS
                    <div className="w-full h-full relative flex items-center justify-center">
                      
                      {/* 1. Main Watch Body (Case + Dial) */}
                      <img
                        src={current.image}
                        alt="Watch Core"
                        referrerPolicy="no-referrer"
                        style={{
                          transform: `scale(${1 - scrollRatio * 0.15}) rotate(${scrollY * 0.05}deg)`,
                          opacity: 1 - scrollRatio * 0.3,
                          transition: 'transform 0.1s ease, opacity 0.1s ease'
                        }}
                        className="absolute w-[200px] h-[200px] object-cover rounded-full shadow-2xl border border-gold-400/30 bg-neutral-950 z-20"
                      />

                      {/* 2. Top Strap (Disperses Up-Left) */}
                      <div
                        style={{
                          transform: `translate(${-scrollRatio * 150}px, ${-scrollRatio * 130}px) rotate(${-scrollRatio * 20}deg)`,
                          opacity: 1 - scrollRatio * 0.5,
                          transition: 'transform 0.1s ease, opacity 0.1s ease'
                        }}
                        className="absolute -top-4 w-[60px] h-[100px] bg-gradient-to-b from-neutral-800 to-neutral-900 border-x border-t border-gold-400/20 rounded-t-lg z-10 origin-bottom"
                      >
                        {/* Hand stitched pattern simulation */}
                        <div className="h-full w-full border-r border-dashed border-gold-400/15" />
                      </div>

                      {/* 3. Bottom Strap (Disperses Down-Right) */}
                      <div
                        style={{
                          transform: `translate(${scrollRatio * 150}px, ${scrollRatio * 130}px) rotate(${scrollRatio * 20}deg)`,
                          opacity: 1 - scrollRatio * 0.5,
                          transition: 'transform 0.1s ease, opacity 0.1s ease'
                        }}
                        className="absolute -bottom-4 w-[60px] h-[100px] bg-gradient-to-t from-neutral-800 to-neutral-900 border-x border-b border-gold-400/20 rounded-b-lg z-10 origin-top"
                      >
                        <div className="h-full w-full border-l border-dashed border-gold-400/15" />
                      </div>

                      {/* 4. Luxury Floating Bezel Rim (Disperses Up-Right) */}
                      <div
                        style={{
                          transform: `translate(${scrollRatio * 120}px, ${-scrollRatio * 100}px) scale(${1 + scrollRatio * 0.25})`,
                          opacity: scrollRatio > 0.1 ? 0.9 - scrollRatio * 0.4 : 0.4,
                          transition: 'transform 0.1s ease, opacity 0.1s ease'
                        }}
                        className="absolute w-[210px] h-[210px] rounded-full border-4 border-dashed border-gold-400/40 z-30 pointer-events-none"
                      >
                        {/* Mini glowing diamonds simulation around the exploded bezel */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                      </div>

                      {/* 5. Watch Crown (Disperses far Right) */}
                      <div
                        style={{
                          transform: `translateX(${70 + scrollRatio * 160}px) rotate(${scrollY * 0.3}deg)`,
                          opacity: 1 - scrollRatio * 0.3,
                          transition: 'transform 0.1s ease'
                        }}
                        className="absolute right-4 w-5 h-8 bg-neutral-800 border border-gold-400/40 rounded shadow-md z-20 flex items-center justify-center"
                      >
                        <div className="w-1 h-5 bg-gold-400/30" />
                      </div>

                      {/* 6. Gold Logo Marker (Disperses Far Left) */}
                      <div
                        style={{
                          transform: `translate(${-120 - scrollRatio * 150}px, ${scrollRatio * 40}px)`,
                          opacity: scrollRatio * 1.5,
                          transition: 'transform 0.1s ease, opacity 0.1s ease'
                        }}
                        className="absolute p-3 bg-neutral-900 border border-gold-400 rounded-lg text-center z-40 hidden sm:block shadow-lg"
                      >
                        <span className="font-serif text-[10px] uppercase tracking-[0.2em] text-gold-400 block font-bold">DollarD</span>
                        <span className="text-[7px] tracking-widest text-neutral-400 block uppercase font-sans">Savoir-Faire</span>
                      </div>

                    </div>
                  ) : (
                    // JEWELRY OR COFFRET NORMAL DISPERSION VIEW
                    <div className="w-full h-full relative flex items-center justify-center">
                      <img
                        src={current.image}
                        alt={current.title}
                        referrerPolicy="no-referrer"
                        style={{
                          transform: `scale(${1 + scrollRatio * 0.15}) rotate(${scrollRatio * -15}deg)`,
                          opacity: 1 - scrollRatio * 0.7,
                          transition: 'transform 0.1s ease, opacity 0.1s ease'
                        }}
                        className="w-[220px] h-[220px] object-cover rounded-2xl shadow-2xl border-2 border-gold-400/30 bg-neutral-950 z-20"
                      />
                      
                      {/* Exploded Decorative Halos for Jewelry */}
                      <div
                        style={{
                          transform: `scale(${1 + scrollRatio * 0.5})`,
                          opacity: scrollRatio * 0.8,
                          transition: 'transform 0.1s ease'
                        }}
                        className="absolute w-[240px] h-[240px] rounded-full border border-gold-500/20 z-10"
                      />
                      <div
                        style={{
                          transform: `scale(${1.2 - scrollRatio * 0.3}) rotate(${scrollY * -0.05}deg)`,
                          opacity: scrollRatio,
                          transition: 'transform 0.1s ease'
                        }}
                        className="absolute w-[270px] h-[270px] rounded-3xl border border-gold-400/10 z-0"
                      />
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Scroll hint dot indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2.5 z-30">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'bg-gold-400 w-6' : 'bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Decorative vertical indicators */}
      <div className="absolute right-6 bottom-10 hidden xl:flex flex-col items-center space-y-4 text-[9px] font-mono tracking-widest text-neutral-500 pointer-events-none">
        <span className="transform rotate-90 origin-left mt-6">CRAFED IN YAOUNDÉ</span>
        <div className="w-[1px] h-12 bg-gold-400/40" />
      </div>

      <div className="absolute left-6 bottom-10 hidden xl:flex flex-col items-center space-y-4 text-[9px] font-mono tracking-widest text-neutral-500 pointer-events-none">
        <span>0{currentSlide + 1} / 03</span>
        <div className="w-[1px] h-12 bg-neutral-800" />
      </div>
    </div>
  );
}
