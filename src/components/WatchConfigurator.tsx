import React, { useState } from 'react';
import { Compass, Sparkles, Check, HelpCircle, Package, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, Product } from '../types';
import { TRANSLATIONS } from '../data';
import { getWhatsAppProductUrl } from '../lib/whatsapp';
import { formatPriceCFA, formatDiffCFA } from '../lib/price';
import WatchCustomizer3D from './WatchCustomizer3D';

interface WatchConfiguratorProps {
  language: Language;
  onAddToCart: (customWatch: Product, customizedDial: string, customizedStrap: string) => void;
}

export default function WatchConfigurator({ language, onAddToCart }: WatchConfiguratorProps) {
  const t = TRANSLATIONS[language];

  // Configurator states
  const [dialColor, setDialColor] = useState('blue'); // blue, black, champagne
  const [metalType, setMetalType] = useState('rose'); // rose, platinum, white
  const [diamondBezel, setDiamondBezel] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Prices logic
  const BASE_PRICE = 24500;
  
  const getMetalPriceDiff = () => {
    if (metalType === 'platinum') return 12000;
    if (metalType === 'white') return 3500;
    return 0; // rose gold is base
  };

  const getDiamondPriceDiff = () => {
    return diamondBezel ? 5000 : 0;
  };

  const totalPrice = BASE_PRICE + getMetalPriceDiff() + getDiamondPriceDiff();

  // Watch images or styles based on combinations
  const getDialColorHex = () => {
    if (dialColor === 'blue') return 'bg-blue-900';
    if (dialColor === 'black') return 'bg-neutral-900';
    return 'bg-amber-100'; // champagne
  };

  const getMetalColorHex = () => {
    if (metalType === 'platinum') return 'border-neutral-300 shadow-neutral-300/10';
    if (metalType === 'white') return 'border-slate-400 shadow-slate-400/10';
    return 'border-amber-600 shadow-amber-600/10'; // rose gold
  };

  const handleCommission = () => {
    // Generate a temporary mock product based on selected configuration
    const customizedProduct: Product = {
      id: `custom-dld-${dialColor}-${metalType}`,
      name: {
        FR: `Chronographe Impérial Sur-Mesure (${dialColor === 'blue' ? 'Bleu' : dialColor === 'black' ? 'Volcan' : 'Champagne'})`,
        EN: `Bespoke Imperial Chronograph (${dialColor === 'blue' ? 'Blue' : dialColor === 'black' ? 'Volcano' : 'Champagne'})`,
      },
      description: {
        FR: 'Création horlogère unique configurée sur-mesure dans nos ateliers privés.',
        EN: 'Unique watchmaking creation customized in our private studios.',
      },
      category: 'watch',
      categoryLabel: {
        FR: 'Création Sur-Mesure',
        EN: 'Bespoke Creation',
      },
      price: totalPrice,
      metal: {
        FR: metalType === 'rose' ? 'Or Rose 18k' : metalType === 'platinum' ? 'Platine 950' : 'Or Blanc',
        EN: metalType === 'rose' ? '18k Rose Gold' : metalType === 'platinum' ? 'Platinum 950' : 'White Gold',
      },
      stone: diamondBezel ? {
        FR: 'Lunette Sertie de Diamants VVS',
        EN: 'VVS Diamond Bezel Set',
      } : undefined,
      image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=1200',
      rating: 5.0,
      specifications: {
        FR: [
          'Calibre de manufacture personnalisé',
          `Boîtier en ${metalType === 'rose' ? 'Or Rose' : metalType === 'platinum' ? 'Platine' : 'Or Blanc'}`,
          `Cadran de couleur ${dialColor === 'blue' ? 'Bleu' : dialColor === 'black' ? 'Basalte' : 'Champagne'}`,
          diamondBezel ? 'Lunette pavée de diamants VVS extra blancs' : 'Sertissage classique d’index',
        ],
        EN: [
          'Custom manufactured caliber',
          `Case in ${metalType === 'rose' ? 'Rose Gold' : metalType === 'platinum' ? 'Platinum' : 'White Gold'}`,
          `Dial color ${dialColor === 'blue' ? 'Blue' : dialColor === 'black' ? 'Basalt' : 'Champagne'}`,
          diamondBezel ? 'Paved VVS extra white diamond bezel' : 'Classic index set diamonds',
        ],
      },
      limitedEdition: true,
      isNew: true,
      ref: `BESPOKE-DLD-${dialColor.toUpperCase()}-${metalType.toUpperCase()}`,
    };

    const dialLabel = dialColor === 'blue' ? t.dialDeepBlue : dialColor === 'black' ? t.dialVolcanic : t.dialChampagne;
    const metalLabel = metalType === 'rose' ? t.metalRoseGold : metalType === 'platinum' ? t.metalPlatinum : t.metalWhiteGold;

    onAddToCart(customizedProduct, dialLabel, metalLabel);
    setIsAdded(true);
    
    // Instantly open direct WhatsApp checkout link for this bespoke piece
    const waUrl = getWhatsAppProductUrl(customizedProduct, language, dialLabel, metalLabel);
    window.open(waUrl, '_blank');
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 15,
      }
    }
  };

  return (
    <section 
      id="configurator" 
      className="py-24 bg-neutral-900 text-white border-y border-neutral-950 relative overflow-hidden light:bg-stone-100 light:text-neutral-900 light:border-neutral-200"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold-400 uppercase tracking-widest bg-gold-400/5 border border-gold-400/20 px-3 py-1 rounded-full">
            <Compass className="w-3 h-3 text-gold-400 animate-spin-slow" />
            <span>{language === 'FR' ? 'ATELIER DE COMMANDES SPÉCIALES' : 'SPECIAL COMMISSIONS ATELIER'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-100 light:text-neutral-900">
            {t.configuratorTitle}
          </h2>
          <p className="text-sm font-sans font-light text-neutral-400 light:text-neutral-600 leading-relaxed">
            {t.configuratorSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: The Virtual Configured Watch Graphic Representation / 3D Customizer */}
          <motion.div variants={itemVariants} className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[450px]">
            
            {/* Elegant luxury toggle button at top */}
            <div className="absolute top-4 left-4 z-30 flex items-center bg-neutral-950/80 border border-neutral-800 rounded-full p-0.5 light:bg-white light:border-neutral-200 shadow-md">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  viewMode === '3d'
                    ? 'bg-gold-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white light:hover:text-neutral-900'
                }`}
              >
                Atelier 3D 360°
              </button>
              <button
                onClick={() => setViewMode('2d')}
                className={`px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  viewMode === '2d'
                    ? 'bg-gold-500 text-neutral-950 font-bold'
                    : 'text-neutral-400 hover:text-white light:hover:text-neutral-900'
                }`}
              >
                Croquis 2D
              </button>
            </div>

            {viewMode === '3d' ? (
              <div className="w-full">
                <WatchCustomizer3D
                  dialColor={dialColor as any}
                  metalType={metalType as any}
                  diamondBezel={diamondBezel}
                  language={language}
                />
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-[450px] bg-neutral-950/80 border border-neutral-800 rounded-2xl relative p-8 light:bg-white light:border-neutral-200 shadow-xl">
                {/* Dynamic Gold/Platinum Glow reflecting selection */}
                <div className={`absolute w-[280px] h-[280px] rounded-full blur-2xl opacity-15 pointer-events-none ${
                  metalType === 'rose' ? 'bg-amber-600' : metalType === 'platinum' ? 'bg-neutral-400' : 'bg-slate-400'
                }`} />

                {/* Configured Watch Graphic container */}
                <div className="relative w-[300px] h-[300px] flex items-center justify-center select-none">
                  
                  {/* Bezel Ring - Color and shadow changes with Metal choice */}
                  <div 
                    className={`absolute w-[220px] h-[220px] rounded-full border-[10px] bg-neutral-900 transition-all duration-500 flex items-center justify-center z-20 ${getMetalColorHex()}`}
                  >
                    {/* 12-hour tick lines */}
                    <div className="absolute top-2 w-0.5 h-3 bg-gold-400" />
                    <div className="absolute bottom-2 w-0.5 h-3 bg-gold-400" />
                    <div className="absolute left-2 h-0.5 w-3 bg-gold-400" />
                    <div className="absolute right-2 h-0.5 w-3 bg-gold-400" />

                    {/* Dial Center (Changes background color according to dialColor selection) */}
                    <div 
                      className={`absolute inset-[15%] rounded-full transition-all duration-700 shadow-inner flex items-center justify-center ${getDialColorHex()}`}
                    >
                      {/* Subtle solar rays texture */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] rounded-full" />
                      
                      {/* Brand signature on dial */}
                      <div className="absolute top-1/4 text-center z-10">
                        <span className="font-serif text-[8px] uppercase tracking-[0.25em] text-gold-300 font-bold block">DollarD</span>
                        <span className="text-[5px] text-neutral-400 tracking-widest uppercase block -mt-1">Yaoundé</span>
                      </div>

                      {/* Mechanical hand axes and hands */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        
                        {/* Golden Center Axis */}
                        <div className="w-2.5 h-2.5 rounded-full bg-gold-400 z-30 border border-neutral-900" />

                        {/* Hour Hand (Fixed pointing beautiful angles) */}
                        <div className="absolute w-[50px] h-[2px] bg-gold-300 origin-left left-1/2 rotate-[120deg] rounded z-20 shadow-md" />

                        {/* Minute Hand */}
                        <div className="absolute w-[70px] h-[1.5px] bg-gold-300 origin-left left-1/2 rotate-[-45deg] rounded z-20 shadow-md" />

                        {/* Seconds Hand (Thin red or fine metal thread) */}
                        <div className="absolute w-[80px] h-[0.5px] bg-gold-400 origin-left left-1/2 rotate-[15deg] z-20" />
                      </div>

                      {/* Phase of Moon indicator on Dial (luxury complication) */}
                      <div className="absolute bottom-1/5 w-10 h-5 bg-neutral-950/60 rounded-t-full border-t border-gold-400/20 flex items-center justify-center overflow-hidden">
                        <div className="w-4.5 h-4.5 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
                      </div>
                    </div>

                  </div>

                  {/* Paved Bezel sparkling indicator */}
                  {diamondBezel && (
                    <div className="absolute w-[240px] h-[240px] rounded-full border-2 border-dashed border-white/60 animate-slow-spin z-30 pointer-events-none">
                      {/* Sparkling jewel dots */}
                      <Sparkles className="absolute top-0 left-1/2 -translate-x-1/2 w-4.5 h-4.5 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <Sparkles className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4.5 h-4.5 text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </div>
                  )}

                  {/* Straps drawing extending Top and Bottom */}
                  <div className="absolute -top-[15%] w-14 h-[120px] bg-neutral-900 rounded-t-xl border border-neutral-800 z-10 flex flex-col justify-between">
                    <div className="w-full h-1 bg-gold-400/30" />
                    <div className="w-full h-1 bg-gold-400/30" />
                  </div>
                  <div className="absolute -bottom-[15%] w-14 h-[120px] bg-neutral-900 rounded-b-xl border border-neutral-800 z-10 flex flex-col justify-between">
                    <div className="w-full h-1 bg-gold-400/30" />
                    <div className="w-full h-1 bg-gold-400/30" />
                  </div>

                </div>

                {/* Dynamic Spec Label below configurator */}
                <div className="mt-4 text-center z-10 space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 light:text-neutral-500 uppercase">
                    {metalType === 'rose' ? t.metalRoseGold : metalType === 'platinum' ? t.metalPlatinum : t.metalWhiteGold} • {dialColor === 'blue' ? t.dialDeepBlue : dialColor === 'black' ? t.dialVolcanic : t.dialChampagne}
                  </span>
                  {diamondBezel && (
                    <span className="text-[9px] font-mono text-gold-400 block tracking-widest uppercase">
                      + Pave Diamants VVS
                    </span>
                  )}
                </div>
              </div>
            )}

          </motion.div>

          {/* Right: Controller Options Panels */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-8">
            
            {/* Option 1: Dial Color Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono tracking-widest text-neutral-400 light:text-neutral-500 uppercase block">
                {t.dialColor}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setDialColor('blue')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs ${
                    dialColor === 'blue' 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 text-neutral-400 light:border-neutral-300 light:bg-white'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-blue-900 border border-white/20 mb-1.5" />
                  <span className="text-[10px] tracking-wider uppercase font-sans text-center">{t.dialDeepBlue}</span>
                </button>

                <button
                  onClick={() => setDialColor('black')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs ${
                    dialColor === 'black' 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 text-neutral-400 light:border-neutral-300 light:bg-white'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-950 border border-white/20 mb-1.5" />
                  <span className="text-[10px] tracking-wider uppercase font-sans text-center">{t.dialVolcanic}</span>
                </button>

                <button
                  onClick={() => setDialColor('champagne')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs ${
                    dialColor === 'champagne' 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 text-neutral-400 light:border-neutral-300 light:bg-white'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-white/20 mb-1.5" />
                  <span className="text-[10px] tracking-wider uppercase font-sans text-center">{t.dialChampagne}</span>
                </button>
              </div>
            </div>

            {/* Option 2: Metal Type Selection */}
            <div className="space-y-3">
              <label className="text-xs font-mono tracking-widest text-neutral-400 light:text-neutral-500 uppercase block">
                {t.strapMetal}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setMetalType('rose')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all text-xs ${
                    metalType === 'rose' 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 text-neutral-400 light:border-neutral-300 light:bg-white'
                  }`}
                >
                  <span className="text-[10px] tracking-wider uppercase font-sans text-center block font-semibold text-amber-500">{t.metalRoseGold}</span>
                  <span className="text-[9px] font-mono text-neutral-500 block mt-1">Souverain</span>
                </button>

                <button
                  onClick={() => setMetalType('platinum')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all text-xs ${
                    metalType === 'platinum' 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 text-neutral-400 light:border-neutral-300 light:bg-white'
                  }`}
                >
                  <span className="text-[10px] tracking-wider uppercase font-sans text-center block font-semibold text-neutral-300">{t.metalPlatinum}</span>
                  <span className="text-[9px] font-mono text-gold-400 block mt-1">{formatDiffCFA(12000)}</span>
                </button>

                <button
                  onClick={() => setMetalType('white')}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all text-xs ${
                    metalType === 'white' 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 text-neutral-400 light:border-neutral-300 light:bg-white'
                  }`}
                >
                  <span className="text-[10px] tracking-wider uppercase font-sans text-center block font-semibold text-slate-300">{t.metalWhiteGold}</span>
                  <span className="text-[9px] font-mono text-gold-400 block mt-1">{formatDiffCFA(3500)}</span>
                </button>
              </div>
            </div>

            {/* Option 3: Diamonds Options Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-mono tracking-widest text-neutral-400 light:text-neutral-500 uppercase block">
                {t.diamondsOpt}
              </label>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setDiamondBezel(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    !diamondBezel 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 bg-neutral-900/10 text-neutral-400 light:border-neutral-300'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wider font-sans">{t.diamondsNone}</span>
                  {!diamondBezel && <Check className="w-4 h-4 text-gold-400" />}
                </button>

                <button
                  onClick={() => setDiamondBezel(true)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    diamondBezel 
                      ? 'border-gold-400 bg-gold-400/5 text-white light:text-neutral-900' 
                      : 'border-neutral-800 bg-neutral-900/10 text-neutral-400 light:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-white shadow-sm" />
                    <span className="text-[11px] uppercase tracking-wider font-sans">{t.diamondsBezel}</span>
                  </div>
                  {diamondBezel && <Check className="w-4 h-4 text-gold-400" />}
                </button>
              </div>
            </div>

            {/* Total Price Calculator & Buy Trigger */}
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4 light:bg-white light:border-neutral-200 shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-xs tracking-widest font-mono text-neutral-400 light:text-neutral-500 uppercase">
                  {t.priceEstimate}
                </span>
                <span className="font-serif text-2xl font-bold text-gold-400">
                  {formatPriceCFA(totalPrice)}
                </span>
              </div>
              
              <button
                onClick={handleCommission}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-neutral-950 text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>{isAdded ? t.addedToCart : t.customOrderBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[10px] text-neutral-500 justify-center">
                <Package className="w-3 h-3 text-gold-400" />
                <span>
                  {language === 'FR' 
                    ? 'Livraison sécurisée sous assurance mondiale comprise' 
                    : 'Global insured secure delivery included'}
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
