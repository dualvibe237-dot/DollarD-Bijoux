import React from 'react';
import { PenTool, ShieldCheck, Cpu, Gem, Award, Users, Target, ShieldAlert, Sparkles } from 'lucide-react';
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
        animate="visible"
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
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{language === 'FR' ? 'QUI SOMMES-NOUS' : 'ABOUT US'}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-100 light:text-neutral-900 leading-tight">
                {language === 'FR' 
                  ? 'Conception et Fabrication de Haute Joaillerie' 
                  : 'Design & Fabrication of High Fine Jewelry'}
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-neutral-400 light:text-neutral-600 text-sm font-sans leading-relaxed">
              <p className="font-serif text-lg text-neutral-200 light:text-neutral-800 leading-relaxed italic">
                {language === 'FR'
                  ? 'Dollars bijoux, situé à Douala avec un espace de distribution à Yaoundé, est une structure d’excellence de fabrication de bijoux et d’accessoires personnalisés.'
                  : 'Dollars Bijoux, located in Douala with a distribution showroom in Yaounde, is a premier workshop specializing in bespoke jewelry and personalized accessories.'}
              </p>
              
              <div className="p-5 bg-neutral-900/50 light:bg-stone-100 rounded-xl border border-neutral-800 light:border-neutral-200 space-y-3">
                <h3 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  <span>{language === 'FR' ? 'Le Pouvoir de l’Acier Inoxydable 316L' : 'The Power of 316L Stainless Steel'}</span>
                </h3>
                <p className="text-xs">
                  {language === 'FR'
                    ? 'Nos créations sont principalement fabriquées à base d’acier inoxydable 316L, une matière dotée d’un potentiel inestimable : ultra-robuste, hautement résistante à l’usure du temps ainsi qu’aux rigueurs du climat africain. Entièrement hypoallergénique, elle ne cause aucune réaction cutanée, ce qui en fait le compagnon idéal de toutes les générations — du nouveau-né aux personnes du deuxième âge.'
                    : 'Our creations are primarily crafted from premium 316L stainless steel, an exceptional alloy of supreme potential: ultra-robust, highly resistant to wear over time, and unaffected by equatorial climates. It is completely hypoallergenic, making it perfect for everyone from newborns to elders.'}
                </p>
              </div>

              <div className="p-5 bg-neutral-900/50 light:bg-stone-100 rounded-xl border border-neutral-800 light:border-neutral-200 space-y-3">
                <h3 className="font-serif text-sm uppercase tracking-wider text-gold-400 font-semibold flex items-center space-x-2">
                  <Target className="w-4 h-4 text-gold-400" />
                  <span>{language === 'FR' ? 'Notre Objectif' : 'Our Objective'}</span>
                </h3>
                <p className="text-xs">
                  {language === 'FR'
                    ? 'Dollars bijoux naît de la nécessité d’innover dans le secteur de la joaillerie en Afrique. Nous nous fixons pour mission d’apporter des solutions concrètes en matière de conception de bijoux et accessoires personnalisés, en garantissant un rapport qualité-prix exceptionnel qui correspond à la majorité des bourses.'
                    : 'Dollars Bijoux was founded on the necessity to innovate the African jewelry sector. We aim to deliver concrete solutions in the design of custom jewelry and personalized accessories, maintaining an exceptional quality-to-price ratio accessible to everyone.'}
                </p>
              </div>
            </motion.div>

            {/* Cameroon Signature Quote */}
            <motion.div variants={itemVariants} className="border-l-2 border-gold-500 pl-6 py-2 bg-gradient-to-r from-gold-500/5 to-transparent">
              <p className="font-serif italic text-neutral-300 light:text-neutral-700 text-base">
                {language === 'FR'
                  ? '« Nous démocratisons le prestige en Afrique avec des créations éternelles personnalisées à votre image. »'
                  : '“We democratize prestige in Africa with eternal creations custom-tailored to your unique soul.”'}
              </p>
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase mt-2 block">
                — M. SIELINOU NGAMENI Clotaire Remy, Promoteur DollarD
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

        {/* Specialized Expert Team section */}
        <motion.div 
          variants={containerVariants}
          className="mt-28 space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
              {language === 'FR' ? "L'EXCELLENCE HUMAINE" : 'HUMAN EXCELLENCE'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 light:text-neutral-900 tracking-tight">
              {language === 'FR' ? "Une Équipe d'Experts à Votre Service" : 'A Team of Dedicated Experts'}
            </h3>
            <p className="text-xs font-sans text-neutral-400 light:text-neutral-600 max-w-xl mx-auto leading-relaxed">
              {language === 'FR'
                ? "Chaque création Dollars Bijoux est le fruit d'une synergie d'expertises, orchestrée par des passionnés de la joaillerie moderne."
                : "Each Dollars Bijoux creation is the result of deep expertise synergy, orchestrated by modern jewelry aficionados."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Clotaire Remy SIELINOU NGAMENI */}
            <motion.div 
              variants={itemVariants}
              className="p-8 bg-neutral-900/40 border border-neutral-800 rounded-xl hover:border-gold-500/40 hover:bg-neutral-900 transition-all duration-300 relative light:bg-white light:border-neutral-200 light:hover:border-gold-500 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 mb-6">
                <Users className="w-6 h-6 text-gold-400" />
              </div>
              <h4 className="font-serif text-lg text-neutral-100 light:text-neutral-900 font-semibold">
                M. SIELINOU NGAMENI Clotaire Remy
              </h4>
              <span className="text-[11px] font-mono tracking-widest text-gold-400 uppercase block mt-2 mb-4">
                {language === 'FR' ? 'Promoteur & Chef de Projet' : 'Founder & Project Director'}
              </span>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">
                {language === 'FR'
                  ? "Visionnaire et stratège, il coordonne la création et l'innovation de la joaillerie d'acier inoxydable 316L en Afrique."
                  : "Visionary and strategist, coordinating the creation and innovation of 316L stainless steel jewelry in Africa."}
              </p>
            </motion.div>

            {/* Ingride DEMBI */}
            <motion.div 
              variants={itemVariants}
              className="p-8 bg-neutral-900/40 border border-neutral-800 rounded-xl hover:border-gold-500/40 hover:bg-neutral-900 transition-all duration-300 relative light:bg-white light:border-neutral-200 light:hover:border-gold-500 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 mb-6">
                <Users className="w-6 h-6 text-gold-400" />
              </div>
              <h4 className="font-serif text-lg text-neutral-100 light:text-neutral-900 font-semibold">
                Mlle. Ingride DEMBI
              </h4>
              <span className="text-[11px] font-mono tracking-widest text-gold-400 uppercase block mt-2 mb-4">
                {language === 'FR' ? 'Responsable à Yaoundé' : 'Yaoundé Showroom Manager'}
              </span>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">
                {language === 'FR'
                  ? "Dirige la relation client d'élite et gère l'espace de distribution et de présentation privée à Yaoundé."
                  : "Leads elite client relations and manages our premium distribution and private viewing space in Yaounde."}
              </p>
            </motion.div>

            {/* TEINKELA Dimitri */}
            <motion.div 
              variants={itemVariants}
              className="p-8 bg-neutral-900/40 border border-neutral-800 rounded-xl hover:border-gold-500/40 hover:bg-neutral-900 transition-all duration-300 relative light:bg-white light:border-neutral-200 light:hover:border-gold-500 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/10 flex items-center justify-center border border-gold-400/20 mb-6">
                <Users className="w-6 h-6 text-gold-400" />
              </div>
              <h4 className="font-serif text-lg text-neutral-100 light:text-neutral-900 font-semibold">
                M. TEINKELA Dimitri
              </h4>
              <span className="text-[11px] font-mono tracking-widest text-gold-400 uppercase block mt-2 mb-4">
                {language === 'FR' ? "Chef d'Atelier" : 'Workshop Master Craftsman'}
              </span>
              <p className="text-xs text-neutral-400 light:text-neutral-600 leading-relaxed">
                {language === 'FR'
                  ? "Orfèvre en chef, expert de la taille de précision et du façonnage haute technicité de l'acier 316L."
                  : "Master goldsmith, expert in high-precision carving and the technical hand-finishing of 316L alloy."}
              </p>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="p-5 border border-dashed border-gold-400/30 rounded-xl bg-gold-400/5 text-center"
          >
            <p className="text-xs font-sans text-neutral-300 light:text-neutral-700">
              {language === 'FR'
                ? "💡 Notre équipe s'appuie également sur un personnel d'appui hautement qualifié, mobilisé avec réactivité en fonction du volume de vos commandes."
                : "💡 Our core team is also supported by a selected pool of high-skilled craftsmen, scaled in response to custom order volumes."}
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
