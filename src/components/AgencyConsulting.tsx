import React, { useState } from 'react';
import { HelpCircle, Sparkles, DollarSign, Award, Percent, ChevronRight, Layout, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface AgencyConsultingProps {
  language: Language;
}

export default function AgencyConsulting({ language }: AgencyConsultingProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-12 bg-neutral-900 border-t border-neutral-950 text-white light:bg-stone-100 light:text-neutral-900 light:border-neutral-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        className="max-w-7xl mx-auto px-6"
      >
        
        {/* Toggle trigger bar */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800 hover:border-gold-500/40 cursor-pointer flex flex-col sm:flex-row items-center justify-between transition-all shadow-xl light:bg-white light:border-neutral-200"
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0 text-center sm:text-left">
            <div className="p-3 bg-gold-400/10 rounded-full border border-gold-400/30 text-gold-400 animate-pulse">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gold-400 tracking-widest uppercase block">
                PREMIUM AGENCY BLUEPRINT
              </span>
              <span className="font-serif text-base tracking-wide block text-neutral-100 light:text-neutral-900 mt-0.5">
                {language === 'FR' 
                  ? 'Comment valoriser et vendre ce projet à 50 000 € ?' 
                  : 'How to pitch and package this project for €50,000?'}
              </span>
            </div>
          </div>

          <button className="flex items-center space-x-1 px-4.5 py-2.5 bg-gold-500 text-neutral-950 text-xs font-sans font-bold uppercase tracking-widest rounded-lg transition-colors">
            <span>{isOpen ? 'CLOSE BLUEPRINT' : 'READ BLUEPRINT'}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Detailed Blueprint panel */}
        {isOpen && (
          <div className="mt-8 p-8 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-8 animate-fade-in light:bg-white light:border-neutral-200">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pillar 1: Visual Identity & Craftsmanship */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <h4 className="font-serif text-sm tracking-wide text-white light:text-neutral-900 uppercase">
                    1. Brand Story & Visuals
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-400 light:text-neutral-600 leading-relaxed list-disc pl-4">
                  <li>
                    <strong>Sourcing local souverain :</strong> Storytelling fort sur l’éthique de l’or de l’Est-Cameroun et l’ébène sculpté à Foumban.
                  </li>
                  <li>
                    <strong>Shooting 3D / CGI de haute horlogerie :</strong> Production de rendus 3D interactifs en temps réel (Three.js/WebGL) pour une vue à 360°.
                  </li>
                  <li>
                    <strong>Aesthetic minimalism :</strong> Typographie soignée (Cinzel, Outfit) et mise en page inspirée de Cartier / Vacheron Constantin.
                  </li>
                </ul>
              </div>

              {/* Pillar 2: High-End Custom Tech Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <Layout className="w-4 h-4 text-gold-400" />
                  <h4 className="font-serif text-sm tracking-wide text-white light:text-neutral-900 uppercase">
                    2. Bespoke Technical Architecture
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-400 light:text-neutral-600 leading-relaxed list-disc pl-4">
                  <li>
                    <strong>Atelier Virtuel Interactif :</strong> Configurateur temps-réel de cadrans, lunettes diamants et métaux précieux (simulé ci-dessus).
                  </li>
                  <li>
                    <strong>Intégration Sanity headless :</strong> Architecture découplée rapide (Vercel + Sanity) pour une vitesse de chargement instantanée (Lighthouse 100/100).
                  </li>
                  <li>
                    <strong>Gestion multi-devises & localités :</strong> Détection automatique (CFA, EUR, USD, GBP) et i18n native (next-intl).
                  </li>
                </ul>
              </div>

              {/* Pillar 3: Logistics & Private Concierge */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <h4 className="font-serif text-sm tracking-wide text-white light:text-neutral-900 uppercase">
                    3. Operations & Concierge SLA
                  </h4>
                </div>
                <ul className="space-y-2.5 text-xs text-neutral-400 light:text-neutral-600 leading-relaxed list-disc pl-4">
                  <li>
                    <strong>Private Presentation Scheduler :</strong> Planificateur de visites privées à domicile (Yaoundé, Douala, Paris, Genève) avec dépôt de caution.
                  </li>
                  <li>
                    <strong>Intégration logistique Ferrari Group :</strong> Connexion API sécurisée avec les leaders mondiaux du transport de valeurs.
                  </li>
                  <li>
                    <strong>WhatsApp Business VIP API :</strong> Système d’alertes de production et conciergerie privée disponible 24/7.
                  </li>
                </ul>
              </div>

            </div>

            <hr className="border-neutral-800 light:border-neutral-200" />

            {/* Budget Breakdown & Valuation Proposal */}
            <div className="space-y-4">
              <h4 className="font-serif text-base text-gold-400">
                {language === 'FR' ? 'Proposition Budgétaire Stratégique' : 'Strategic Budget Proposal'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 light:bg-stone-50 light:border-neutral-200">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">UX/UI design & Artistic Direction</span>
                  <span className="font-serif text-lg font-bold text-white light:text-neutral-900 block mt-1">12 000 €</span>
                </div>
                <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 light:bg-stone-50 light:border-neutral-200">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Headless Front + Configurator Engine</span>
                  <span className="font-serif text-lg font-bold text-white light:text-neutral-900 block mt-1">18 000 €</span>
                </div>
                <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 light:bg-stone-50 light:border-neutral-200">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Sanity CMS Setup & Content Sourcing</span>
                  <span className="font-serif text-lg font-bold text-white light:text-neutral-900 block mt-1">10 000 €</span>
                </div>
                <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 light:bg-stone-50 light:border-neutral-200">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Testing, SLA, Ferrari API & Launch</span>
                  <span className="font-serif text-lg font-bold text-white light:text-neutral-900 block mt-1">10 000 €</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </motion.div>
    </section>
  );
}
