import React from 'react';
import { PenTool, ShieldCheck, Cpu, Gem, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = TRANSLATIONS[language];

  // Map step index to custom icons
  const icons = [
    <PenTool className="w-6 h-6 text-gold-400" />,
    <ShieldCheck className="w-6 h-6 text-gold-400" />,
    <Cpu className="w-6 h-6 text-gold-400" />,
    <Gem className="w-6 h-6 text-gold-400" />
  ];

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
    hidden: { opacity: 0, y: 25 },
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
      id="about" 
      className="fluid-section-py bg-neutral-950 text-white transition-colors duration-500 relative overflow-hidden border-b border-neutral-900 light:bg-stone-50 light:text-neutral-900 light:border-neutral-200"
    >
      {/* Decorative text watermark */}
      <div className="absolute right-0 bottom-10 font-serif text-[12vw] text-neutral-900/40 select-none pointer-events-none font-bold uppercase tracking-widest light:text-neutral-100 leading-none">
        Maison
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Artistic Photography representation */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 to-amber-700 rounded-2xl blur-md opacity-20 group-hover:opacity-35 transition-all duration-700" />
            
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200"
                alt="Maître Horloger DollarD"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
              />
              
              {/* Subtle badge over image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-neutral-950/90 backdrop-blur-sm border border-gold-400/20 rounded-lg flex justify-between items-center text-white">
                <div>
                  <span className="text-[10px] tracking-widest font-mono text-gold-400 block uppercase">
                    YAOUNDÉ ATELIER I
                  </span>
                  <span className="font-serif text-sm tracking-wide block mt-1">
                    {language === 'FR' ? 'Savoir-Faire Souverain' : 'Sovereign Craftsmanship'}
                  </span>
                </div>
                <Award className="w-5 h-5 text-gold-400" />
              </div>
            </div>
          </motion.div>

          {/* Right: Text Story */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold-400 uppercase tracking-widest bg-gold-400/5 border border-gold-400/20 px-3 py-1 rounded-full">
                <span>{t.aboutIntro}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-100 light:text-neutral-900 leading-tight">
                {language === 'FR' 
                  ? 'L’excellence d’un héritage souverain' 
                  : 'The excellence of a sovereign legacy'}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-neutral-400 light:text-neutral-600 text-sm font-sans leading-relaxed">
              <p>{t.aboutParagraph1}</p>
              <p>{t.aboutParagraph2}</p>
              <p>
                {language === 'FR'
                  ? 'De la sélection rigoureuse des gemmes précieuses dans les rivières de l’Est, au polissage final dans notre atelier prestigieux, chaque création DollarD porte l’estampille de la rareté absolue.'
                  : 'From the painstaking selection of precious gems in the rivers of East Cameroon, to the final polishing in our prestigious workshop, every DollarD creation bears the seal of absolute rarity.'}
              </p>
            </motion.div>

            {/* Cameroon Signature Quote */}
            <motion.div variants={itemVariants} className="border-l-2 border-gold-500 pl-6 py-2 bg-gradient-to-r from-gold-500/5 to-transparent">
              <p className="font-serif italic text-neutral-300 light:text-neutral-700 text-base">
                {language === 'FR'
                  ? '« Nous ne créons pas seulement des objets de luxe ; nous forgons les reliques de notre histoire. »'
                  : '“We do not merely create luxury objects; we forge the relics of our history.”'}
              </p>
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase mt-2 block">
                — DollarD, Directeur de la Maison
              </span>
            </motion.div>
          </div>

        </div>

        {/* Steps / Savoir-Faire section */}
        <motion.div 
          variants={containerVariants}
          className="mt-28 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
              {language === 'FR' ? 'PROCESSUS DE CONCEPTION' : 'DESIGN PROCESS'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 light:text-neutral-900 tracking-tight">
              {language === 'FR' ? 'L’Exigence et les Gestes du Luxe' : 'The Rigor and Rituals of Luxury'}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 fluid-gap">
            {t.craftSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group p-6 bg-neutral-900/40 border border-neutral-800 rounded-xl hover:border-gold-500/40 hover:bg-neutral-900 transition-all duration-300 relative light:bg-white light:border-neutral-200 light:hover:border-gold-500"
              >
                {/* Step indicator */}
                <div className="absolute top-6 right-6 font-mono text-[11px] text-neutral-700 group-hover:text-gold-400 transition-colors">
                  0{idx + 1}
                </div>

                {/* Step Icon */}
                <div className="w-12 h-12 rounded-lg bg-neutral-950 flex items-center justify-center border border-neutral-800 group-hover:border-gold-500/30 group-hover:scale-105 transition-all light:bg-neutral-50 light:border-neutral-200">
                  {icons[idx]}
                </div>

                <h4 className="font-serif text-lg tracking-wide text-neutral-100 light:text-neutral-900 mt-6 mb-2">
                  {step.title}
                </h4>
                
                <p className="text-xs font-sans text-neutral-400 light:text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>

                {/* Hover line indicator */}
                <div className="mt-6 w-0 h-[1.5px] bg-gold-400 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
