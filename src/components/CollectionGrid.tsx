import React, { useState, useMemo } from 'react';
import { Sparkles, Calendar, Heart, Shield, HelpCircle, Eye, ShoppingCart, ArrowUpRight, X, Search, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, Product } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../data';
import { getWhatsAppProductUrl } from '../lib/whatsapp';
import ProductImageMagnifier from './ProductImageMagnifier';
import { formatPriceCFA } from '../lib/price';
import SearchInput from './SearchInput';

interface CollectionGridProps {
  language: Language;
  onAddToCart: (p: Product) => void;
  openBookingWithProduct: (pName: string) => void;
}

export default function CollectionGrid({ language, onAddToCart, openBookingWithProduct }: CollectionGridProps) {
  const t = TRANSLATIONS[language];
  const [filter, setFilter] = useState<'all' | 'watch' | 'jewelry' | 'limited'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // High performance filtered products utilizing useMemo to avoid recalculation on unrelated state edits
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = filter === 'all' || p.category === filter;
      const matchesSearch = searchQuery === '' || 
        p.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metal[language].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery, language]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.03,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      rotateX: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 55,
        damping: 18,
        mass: 1.1,
      }
    }
  };

  return (
    <section 
      id="boutique" 
      className="py-24 bg-neutral-950 text-white border-b border-neutral-900 transition-all duration-500 light:bg-white light:text-neutral-900 light:border-neutral-200"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ perspective: 1200 }}
        className="max-w-7xl mx-auto px-6"
      >
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 pb-8 border-b border-neutral-900/40 light:border-neutral-100">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1.5px] bg-gold-400"></span>
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                {language === 'FR' ? 'LES COLLECTIONS IMPÉRIALES' : 'IMPERIAL COLLECTIONS'}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-100 light:text-neutral-900">
              {language === 'FR' ? 'Boutique de Prestige' : 'Prestige Boutique'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
            {/* Real-time search bar */}
            <div className="flex-grow sm:w-64">
              <SearchInput 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={language === 'FR' ? 'Rechercher une pièce...' : 'Search a creation...'}
              />
            </div>

            {/* Filtering Categories Select (Mobile) & Segmented Buttons (Desktop) */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Mobile Custom-Styled Dropdown */}
              <div className="block sm:hidden relative w-full">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="w-full px-4 py-3 bg-neutral-900/80 border border-neutral-800 text-xs rounded-full text-gold-400 font-sans uppercase tracking-widest focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 appearance-none cursor-pointer light:bg-stone-100 light:border-neutral-200 light:text-neutral-900"
                >
                  <option value="all" className="bg-neutral-950 text-white light:bg-white light:text-neutral-900">{t.filterAll}</option>
                  <option value="watch" className="bg-neutral-950 text-white light:bg-white light:text-neutral-900">{t.filterWatch}</option>
                  <option value="jewelry" className="bg-neutral-950 text-white light:bg-white light:text-neutral-900">{t.filterJewelry}</option>
                  <option value="limited" className="bg-neutral-950 text-white light:bg-white light:text-neutral-900">{t.filterLimited}</option>
                </select>
                <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gold-400">
                  ▼
                </span>
              </div>

              {/* Desktop Segmented Buttons */}
              <div className="hidden sm:flex flex-wrap gap-2">
                {[
                  { id: 'all', label: t.filterAll },
                  { id: 'watch', label: t.filterWatch },
                  { id: 'jewelry', label: t.filterJewelry },
                  { id: 'limited', label: t.filterLimited },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id as any)}
                    className={`px-4 py-2.5 rounded-full text-[11px] font-sans tracking-wider uppercase transition-all duration-300 ${
                      filter === btn.id
                        ? 'bg-gold-500 text-neutral-950 font-bold shadow-lg shadow-gold-500/10'
                        : 'border border-neutral-800 hover:border-gold-400 text-neutral-400 light:border-neutral-200 light:text-neutral-700 bg-neutral-900/10'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <p className="text-sm text-neutral-500">
              {language === 'FR' 
                ? 'Aucune pièce ne correspond à votre recherche.' 
                : 'No pieces found matching your criteria.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="text-xs text-gold-400 underline uppercase tracking-widest font-mono font-bold"
            >
              {language === 'FR' ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </div>
        )}

        {/* Product Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 fluid-gap">
          {filteredProducts.map((p) => {
            const isFavorite = favorites.includes(p.id);
            return (
              <motion.div
                variants={itemVariants}
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="group relative bg-neutral-900/30 border border-neutral-900 rounded-2xl overflow-hidden cursor-pointer hover:border-gold-500/40 hover:bg-neutral-900/60 transition-all duration-500 flex flex-col justify-between light:bg-stone-50 light:border-neutral-100 light:hover:border-gold-400"
              >
                
                {/* Product Badges (Limited / New) */}
                <div className="absolute top-4 left-4 z-20 flex flex-col space-y-1.5">
                  {p.limitedEdition && (
                    <span className="text-[8px] font-mono tracking-widest uppercase bg-neutral-950 text-gold-300 border border-gold-400/30 px-2 py-1 rounded">
                      {t.limited}
                    </span>
                  )}
                  {p.isNew && (
                    <span className="text-[8px] font-mono tracking-widest uppercase bg-gold-500 text-neutral-950 font-bold px-2 py-1 rounded">
                      {t.new}
                    </span>
                  )}
                </div>

                {/* Favorite Action Button */}
                <button
                  onClick={(e) => toggleFavorite(p.id, e)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-950 text-neutral-300 hover:text-rose-500 transition-all border border-neutral-800"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Top Image Container with 3D feel and overlay */}
                <div className="relative aspect-square overflow-hidden bg-neutral-950">
                  <ProductImageMagnifier src={p.image} alt={p.name[language]} />
                  
                  {/* Glassmorphic hover overview overlay */}
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-6 space-y-3 p-4 pointer-events-none z-20">
                    <span className="text-[10px] tracking-widest font-mono text-gold-400 uppercase bg-neutral-950/80 px-2 py-1 rounded pointer-events-auto">
                      {p.ref}
                    </span>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p);
                      }}
                      className="w-full max-w-[180px] flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-white text-neutral-950 font-sans text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-neutral-100 transition-all pointer-events-auto shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'FR' ? 'Consulter' : 'View Details'}</span>
                    </button>

                    <a
                      href={getWhatsAppProductUrl(p, language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-[180px] flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-emerald-600 text-white font-sans text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all shadow-lg pointer-events-auto"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600" />
                      <span>{language === 'FR' ? 'Acheter' : 'Order Now'}</span>
                    </a>
                    
                    {/* Metal and diamond info */}
                    <p className="text-[10px] font-mono text-neutral-400 text-center bg-neutral-950/80 px-2 py-1 rounded pointer-events-auto">
                      {p.metal[language]} {p.stone ? `• ${p.stone[language]}` : ''}
                    </p>
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                      {p.categoryLabel[language]}
                    </span>
                    <h3 className="font-serif text-lg tracking-wide text-neutral-100 light:text-neutral-900 group-hover:text-gold-300 transition-colors">
                      {p.name[language]}
                    </h3>
                    <p className="text-xs text-neutral-400 light:text-neutral-600 line-clamp-2">
                      {p.description[language]}
                    </p>
                  </div>

                  {/* Price and Add item details row */}
                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between gap-2 light:border-neutral-100">
                    <span className="font-serif text-base font-bold text-neutral-100 light:text-neutral-900">
                      {formatPriceCFA(p.price)}
                    </span>
                    <a
                      href={getWhatsAppProductUrl(p, language)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[10px] font-bold uppercase tracking-[0.12em] rounded-full transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-950/20"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white text-emerald-600 animate-bounce" style={{ animationDuration: '3s' }} />
                      <span>{language === 'FR' ? 'Commander' : 'Order'}</span>
                    </a>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative text-white light:bg-stone-50 light:border-neutral-200 light:text-neutral-900 shadow-2xl">
            
            {/* Close modal button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-gold-400 text-neutral-400 hover:text-white transition-all z-20 light:bg-neutral-100 light:border-neutral-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              
              {/* Product Image Gallery with Zoom */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Security and quality assurance badges */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-3 bg-neutral-950/50 border border-neutral-800 rounded-lg text-center light:bg-white light:border-neutral-200">
                    <Shield className="w-4 h-4 text-gold-400 mx-auto mb-1" />
                    <span className="text-[8px] font-mono uppercase tracking-wider block text-neutral-400">Garantie 10 ans</span>
                  </div>
                  <div className="p-3 bg-neutral-950/50 border border-neutral-800 rounded-lg text-center light:bg-white light:border-neutral-200">
                    <Sparkles className="w-4 h-4 text-gold-400 mx-auto mb-1" />
                    <span className="text-[8px] font-mono uppercase tracking-wider block text-neutral-400">Sourcing Certifié</span>
                  </div>
                  <div className="p-3 bg-neutral-950/50 border border-neutral-800 rounded-lg text-center light:bg-white light:border-neutral-200">
                    <Calendar className="w-4 h-4 text-gold-400 mx-auto mb-1" />
                    <span className="text-[8px] font-mono uppercase tracking-wider block text-neutral-400">Présentation Privée</span>
                  </div>
                </div>
              </div>

              {/* Product Info Description */}
              <div className="flex flex-col justify-between space-y-6">
                
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                    {selectedProduct.categoryLabel[language]} • {selectedProduct.ref}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl tracking-wide text-neutral-100 light:text-neutral-900">
                    {selectedProduct.name[language]}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-xl font-bold text-gold-400">
                      {formatPriceCFA(selectedProduct.price)}
                    </span>
                    {selectedProduct.limitedEdition && (
                      <span className="text-[9px] font-mono tracking-widest uppercase bg-gold-400/10 text-gold-300 border border-gold-400/20 px-2.5 py-0.5 rounded-full">
                        {t.limited}
                      </span>
                    )}
                  </div>

                  <hr className="border-neutral-800 light:border-neutral-200 my-4" />

                  <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">
                    {selectedProduct.description[language]}
                  </p>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 light:text-neutral-500 uppercase block">
                    {t.specifications}
                  </span>
                  <ul className="space-y-1.5">
                    {selectedProduct.specifications[language].map((spec, i) => (
                      <li key={i} className="text-xs font-sans text-neutral-300 light:text-neutral-700 flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-3 pt-4">
                  {/* WhatsApp Direct Buy Invoice Button */}
                  <a
                    href={getWhatsAppProductUrl(selectedProduct, language)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-emerald-600 animate-pulse" />
                    <span>
                      {language === 'FR' ? 'Acquérir via WhatsApp' : 'Acquire on WhatsApp'}
                    </span>
                  </a>

                  {/* Add to chest (secondary) */}
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-2.5 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border border-gold-400/30 font-sans text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-gold-400" />
                    <span>
                      {language === 'FR' ? 'Ajouter au Coffret Prestige' : 'Add to Prestige Chest'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      openBookingWithProduct(selectedProduct.name[language]);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-2.5 border border-neutral-800 hover:border-gold-400 text-neutral-400 hover:text-white font-sans text-[11px] uppercase tracking-[0.15em] rounded-full transition-colors flex items-center justify-center space-x-2 light:border-neutral-200 light:text-neutral-700 light:hover:text-neutral-950 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.privateConsultation}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
