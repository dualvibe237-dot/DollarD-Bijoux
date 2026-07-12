import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative w-full"
    >
      {/* Sleek magnifying glass icon */}
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <Search className="w-4 h-4 text-gold-400/80 transition-colors" />
      </span>

      {/* Gold-border focus effect input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-neutral-900/60 border border-neutral-800 text-xs rounded-full text-white placeholder-neutral-500 transition-all duration-300 font-sans focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 light:bg-stone-100 light:border-neutral-200 light:text-neutral-900 light:placeholder-neutral-400 light:focus:border-gold-500 shadow-inner"
      />

      {/* Clear search query button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-gold-400 transition-colors duration-200"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
}
