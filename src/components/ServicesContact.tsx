import React, { useState } from 'react';
import { Calendar, Phone, Mail, Clock, HelpCircle, Check, ChevronDown, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ServicesContactProps {
  language: Language;
  prefilledProduct?: string;
  onClearPrefill?: () => void;
}

export default function ServicesContact({ language, prefilledProduct, onClearPrefill }: ServicesContactProps) {
  const t = TRANSLATIONS[language];

  // FAQ structure
  const faqs = [
    {
      q: {
        FR: 'Comment se déroule la livraison internationale sécurisée ?',
        EN: 'How does secure international shipping work?',
      },
      a: {
        FR: 'La Maison DollarD collabore avec des transporteurs spécialisés dans le transport d’œuvres d’art et de valeurs (Ferrari Group, Malca-Amit). Chaque colis fait l’objet d’une assurance à valeur déclarée à 100%. La livraison est remise en main propre sécurisée après authentification biométrique ou présentation de pièce d’identité.',
        EN: 'Maison DollarD partners with specialized high-value couriers (Ferrari Group, Malca-Amit). Every package is 100% insured under declared value. Delivery is hand-delivered to the buyer only, following strict identity and security checks.',
      },
    },
    {
      q: {
        FR: 'Quelles sont vos garanties et services d’entretien ?',
        EN: 'What are your warranties and servicing policies?',
      },
      a: {
        FR: 'Toutes nos créations horlogères bénéficient d’une garantie internationale de 10 ans couvrant les défauts mécaniques. Pour la joaillerie, nous offrons un service annuel gratuit de repolissage, de vérification des griffes de sertissage et de nettoyage ultrasonique dans nos ateliers.',
        EN: 'All our horological creations feature a 10-year international mechanical warranty. For jewelry, we offer a complimentary annual repolishing, claw inspection, and ultrasonic cleaning service in our private workshops.',
      },
    },
    {
      q: {
        FR: 'Est-il possible de demander une présentation privée à domicile ?',
        EN: 'Is it possible to request a private in-person presentation?',
      },
      a: {
        FR: 'Absolument. Pour nos créations d’exception et éditions limitées, nos conseillers privés se déplacent à votre domicile ou dans votre suite d’hôtel à Yaoundé, Douala, Paris, Londres et Genève pour une présentation privée confidentielle.',
        EN: 'Absolutely. For our exceptional and limited edition pieces, our private advisors can arrange to present creations in the privacy of your home or hotel suite in Yaounde, Douala, Paris, London, and Geneva.',
      },
    },
    {
      q: {
        FR: 'Puis-je personnaliser une bague ou une montre ?',
        EN: 'Can I customize a ring or a watch?',
      },
      a: {
        FR: 'La personnalisation est au cœur de l’esprit DollarD. Outre notre configurateur virtuel, vous pouvez collaborer directement avec notre studio de création pour dessiner une pièce unique sur-mesure (choix de la pureté du diamant, gravures impériales héraldiques, métaux précieux originaux).',
        EN: 'Bespoke design is the heart of DollarD. Beyond our online customizer, you can collaborate directly with our design studio to sketch a completely unique piece of art (diamond parameters, armorial engravings, custom gold alloys).',
      },
    }
  ];

  // State managers
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: prefilledProduct || '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync prefilled product if changed externally
  React.useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, interest: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
      });
      if (onClearPrefill) onClearPrefill();
    }, 5000);
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
      id="contact" 
      className="fluid-section-py bg-neutral-950 text-white transition-colors duration-500 relative overflow-hidden light:bg-stone-50 light:text-neutral-900 light:border-neutral-200"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Contact Form & Booking private consult */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold-400 uppercase tracking-widest bg-gold-400/5 border border-gold-400/20 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'FR' ? 'RENDEZ-VOUS ET CONCIERGERIE' : 'APPOINTMENT & CONCIERGE'}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-100 light:text-neutral-900 leading-tight">
                {t.contactTitle}
              </h2>
              <p className="text-sm font-sans font-light text-neutral-400 light:text-neutral-600 leading-relaxed max-w-lg">
                {t.contactSubtitle}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 border border-gold-400 bg-gold-400/5 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-neutral-950">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl tracking-wide text-gold-400">
                  {language === 'FR' ? 'Demande Reçue avec Distinction' : 'Request Received with Distinction'}
                </h3>
                <p className="text-xs text-neutral-300 light:text-neutral-700 max-w-md">
                  {t.formSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900/40 p-8 rounded-2xl border border-neutral-900 light:bg-white light:border-neutral-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">{t.formName}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs tracking-wider text-white focus:border-gold-400 focus:outline-none light:bg-stone-50 light:border-neutral-200 light:text-neutral-900"
                      placeholder="e.g. Samuel Etoo"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">{t.formEmail}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs tracking-wider text-white focus:border-gold-400 focus:outline-none light:bg-stone-50 light:border-neutral-200 light:text-neutral-900"
                      placeholder="e.g. samuel@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">{t.formPhone}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs tracking-wider text-white focus:border-gold-400 focus:outline-none light:bg-stone-50 light:border-neutral-200 light:text-neutral-900"
                      placeholder="e.g. +237 6xx xxx xxx"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">{t.formInterest}</label>
                    <input
                      type="text"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs tracking-wider text-white focus:border-gold-400 focus:outline-none light:bg-stone-50 light:border-neutral-200 light:text-neutral-900"
                      placeholder={language === 'FR' ? 'ex. Chronographe Kribi' : 'e.g. Kribi Chronograph'}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">{t.formMsg}</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-xs tracking-wider text-white focus:border-gold-400 focus:outline-none resize-none light:bg-stone-50 light:border-neutral-200 light:text-neutral-900"
                    placeholder={language === 'FR' ? 'Votre message confidentiel...' : 'Your confidential message...'}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-neutral-950 font-sans text-xs font-bold uppercase tracking-[0.2em] rounded-lg transition-all shadow-md cursor-pointer"
                >
                  {t.formSubmit}
                </button>
              </form>
            )}

            {/* Live direct link with WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 border border-dashed border-gold-400/30 rounded-xl bg-gold-400/5">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="p-2.5 rounded-full bg-emerald-500 text-neutral-950">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Instant Service</span>
                  <span className="font-serif text-sm tracking-wide block text-neutral-200">
                    {t.whatsappConsult}
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/237600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs uppercase tracking-widest font-semibold rounded-lg flex items-center space-x-2 transition-all"
              >
                <span>WhatsApp (+237)</span>
              </a>
            </div>

          </motion.div>

          {/* Right: Fine FAQ Interactive Accordions */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                {language === 'FR' ? 'CHARTE DE PRESTIGE & LOGISTIQUE' : 'PRESTIGE CHARTER & LOGISTICS'}
              </span>
              <h3 className="font-serif text-2xl text-neutral-100 light:text-neutral-900 tracking-tight">
                {language === 'FR' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-neutral-900 bg-neutral-900/30 rounded-xl overflow-hidden transition-all light:border-neutral-200 light:bg-white"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left flex items-center justify-between text-neutral-100 light:text-neutral-900 hover:text-gold-300 transition-colors"
                    >
                      <span className="font-serif text-sm tracking-wide">{faq.q[language]}</span>
                      <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-neutral-400 light:text-neutral-600 leading-relaxed border-t border-neutral-950/40 light:border-neutral-100 animate-fade-in">
                        {faq.a[language]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Concierge private support metadata */}
            <div className="p-6 bg-neutral-900/40 border border-neutral-900 rounded-xl space-y-4 light:bg-white light:border-neutral-200">
              <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-bold">
                {language === 'FR' ? 'Heures Privées Conciergerie' : 'Private Concierge Hours'}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block">Europe & Africa</span>
                  <span className="text-neutral-300 light:text-neutral-700 block mt-0.5">09:00 — 21:00 UTC</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">North America & Asia</span>
                  <span className="text-neutral-300 light:text-neutral-700 block mt-0.5">24/7 Premium Members</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
