import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen, X, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, Story } from '../types';
import { STORIES, TRANSLATIONS } from '../data';

interface JournalSectionProps {
  language: Language;
}

export default function JournalSection({ language }: JournalSectionProps) {
  const t = TRANSLATIONS[language];
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
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
      id="journal" 
      className="fluid-section-py bg-neutral-900 text-white border-b border-neutral-950 relative overflow-hidden light:bg-stone-100 light:text-neutral-900 light:border-neutral-200"
    >
      
      {/* Absolute Floating Jewelry Elements in Background */}
      {/* This fulfills the user requirement: "Dans certaines sections, images PNG de montres/bagues flottant doucement (yoyo) autour du contenu" */}
      <div className="absolute top-[15%] right-[8%] w-32 h-32 opacity-15 pointer-events-none animate-float hidden xl:block z-0">
        <div className="w-full h-full rounded-full border-[8px] border-amber-600/60 shadow-lg relative flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border-4 border-dashed border-white/40" />
          <Sparkles className="w-5 h-5 text-gold-400 absolute top-2 right-2 animate-pulse" />
        </div>
      </div>
      
      <div className="absolute bottom-[20%] left-[5%] w-24 h-24 opacity-10 pointer-events-none animate-float hidden xl:block z-0" style={{ animationDelay: '2s' }}>
        <div className="w-full h-full rounded-full border-[4px] border-dashed border-gold-300 relative flex items-center justify-center rotate-45">
          <div className="w-4 h-4 rounded-full bg-gold-400 absolute top-1" />
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold-400 uppercase tracking-widest bg-gold-400/5 border border-gold-400/20 px-3 py-1 rounded-full">
            <span>{language === 'FR' ? 'LES CHRONIQUES DE LA MAISON' : 'HOUSE CHRONICLES'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-100 light:text-neutral-900">
            {t.storiesTitle}
          </h2>
          <p className="text-sm font-sans font-light text-neutral-400 light:text-neutral-600 leading-relaxed">
            {t.storiesSubtitle}
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {STORIES.map((story) => (
            <motion.article 
              variants={itemVariants}
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="group bg-neutral-950/60 border border-neutral-850 rounded-2xl overflow-hidden hover:border-gold-500/40 hover:bg-neutral-950 transition-all duration-500 cursor-pointer flex flex-col justify-between light:bg-white light:border-neutral-200"
            >
              <div className="space-y-6">
                
                {/* Thumbnail image layout with zoom */}
                <div className="aspect-[16/10] overflow-hidden bg-neutral-950 relative">
                  <img
                    src={story.image}
                    alt={story.title[language]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700"
                  />
                  
                  {/* Category label */}
                  <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest uppercase bg-neutral-950 text-gold-300 border border-gold-400/30 px-2.5 py-1 rounded">
                    {story.category[language]}
                  </span>
                </div>

                {/* Editorial Body */}
                <div className="px-6 space-y-3">
                  <div className="flex items-center space-x-4 text-[10px] font-mono text-neutral-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{story.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>{story.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl tracking-wide text-neutral-100 light:text-neutral-900 group-hover:text-gold-300 transition-colors">
                    {story.title[language]}
                  </h3>

                  <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed line-clamp-3">
                    {story.summary[language]}
                  </p>
                </div>

              </div>

              {/* Bottom Read link */}
              <div className="p-6 pt-0 mt-6 border-t border-neutral-900/60 flex items-center justify-between light:border-neutral-100">
                <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase font-semibold group-hover:translate-x-1.5 transition-transform flex items-center space-x-1.5">
                  <span>{t.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  Maison DollarD
                </span>
              </div>

            </motion.article>
          ))}
        </motion.div>

      </motion.div>

      {/* Editorial Article Overlay Reading View */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/95 backdrop-blur-md">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative text-white light:bg-stone-50 light:border-neutral-200 light:text-neutral-900 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-neutral-800 bg-neutral-950/80 hover:border-gold-400 text-neutral-400 hover:text-white transition-all z-20 light:bg-neutral-100 light:border-neutral-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Editorial Content */}
            <div className="space-y-8">
              
              <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-950 border-b border-neutral-800">
                <img
                  src={activeStory.image}
                  alt={activeStory.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-8 pb-12 space-y-6">
                
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase block">
                    {activeStory.category[language]} • {activeStory.date} • {activeStory.readTime}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight text-neutral-100 light:text-neutral-900">
                    {activeStory.title[language]}
                  </h3>
                </div>

                <hr className="border-neutral-800 light:border-neutral-200" />

                {/* Main rich text paragraphs */}
                <div className="space-y-6 text-sm text-neutral-300 light:text-neutral-700 leading-relaxed font-sans font-light">
                  {activeStory.content[language].map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  
                  <p>
                    {language === 'FR'
                      ? 'Les ateliers DollarD à Yaoundé continuent d’honorer cette quête absolue du geste d’exception. Chaque collection témoigne d’une noblesse partagée et d’une signature de luxe universelle.'
                      : 'The DollarD workshops in Yaounde continue to honor this absolute pursuit of the exceptional gesture. Every collection bears witness to shared nobility and a universal luxury signature.'}
                  </p>
                </div>

                <div className="pt-6 flex justify-between items-center text-xs text-neutral-500 font-mono border-t border-neutral-800 light:border-neutral-200">
                  <span>© Maison DollarD Bijoux</span>
                  <span>Yaoundé, Cameroon</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
