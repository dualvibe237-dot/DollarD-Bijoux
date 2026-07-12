import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, ShieldCheck, HelpCircle, ChevronDown, Award, Star } from 'lucide-react';
import { Language } from '../types';

interface TestimonialsAndFAQProps {
  language: Language;
  category?: 'home' | 'about' | 'boutique' | 'journal' | 'contact';
}

export default function TestimonialsAndFAQ({ language, category = 'home' }: TestimonialsAndFAQProps) {
  const isFR = language === 'FR';
  const [openFaqQuestion, setOpenFaqQuestion] = useState<string | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'livraison' | 'garantie' | 'entretien'>('all');

  const testimonials = [
    {
      author: 'Amélia N.',
      role: isFR ? 'Collectionneuse d\'Art, Genève' : 'Art Collector, Geneva',
      quote: isFR 
        ? "L'alliance parfaite entre le raffinement suisse de la haute horlogerie et la majesté de l'ébène d'Afrique. Une œuvre d'art intemporelle portée au poignet." 
        : "The flawless union between Swiss luxury watchmaking refinement and the majesty of African ebony. A timeless piece of art worn on the wrist.",
      rating: 5,
    },
    {
      author: 'Marc-Antoine K.',
      role: isFR ? 'Philanthrope, Yaoundé' : 'Philanthropist, Yaounde',
      quote: isFR
        ? "La Maison DollarD Bijoux a su concrétiser mes rêves les plus audacieux à travers une montre sur-mesure d'un équilibre absolu. Le service concierge est exemplaire."
        : "Maison DollarD Bijoux brought my boldest dreams to life with a bespoke timepiece of absolute balance. The concierge service is exemplary.",
      rating: 5,
    },
    {
      author: 'Sophia L.',
      role: isFR ? 'Créatrice de Mode, Paris' : 'Fashion Designer, Paris',
      quote: isFR
        ? "Chaque gemme semble posséder sa propre âme. Le travail du ciselage sur l'or 18 carats dépasse de loin mes attentes en matière de haute joaillerie."
        : "Every single gem feels like it possesses its own soul. The precision of the 18-karat gold carving far exceeds my highest expectations for high jewelry.",
      rating: 5,
    }
  ];

  const faqs = [
    {
      category: 'livraison',
      question: isFR 
        ? "Comment se déroule le processus de livraison hautement sécurisé ?" 
        : "How does the highly secure delivery process work?",
      answer: isFR
        ? "Pour nos pièces disponibles, la livraison sous haute sécurité s'effectue sous 48 heures à Yaoundé et Douala via notre service de transport blindé privé. À l'international, nous collaborons exclusivement avec Ferrari Group et DHL Express pour des acheminements sécurisés sous 5 à 7 jours ouvrés avec assurance complète de la valeur de l'œuvre."
        : "For available catalog pieces, secure high-value delivery is executed within 48 hours in Yaounde and Douala via our private armored services. Internationally, we collaborate exclusively with Ferrari Group and DHL Express for secure shipping within 5 to 7 business days, fully insured for the complete value of the masterpiece."
    },
    {
      category: 'livraison',
      question: isFR 
        ? "Livrez-vous dans toute l'Afrique centrale et à l'étranger ?" 
        : "Do you deliver throughout Central Africa and internationally?",
      answer: isFR
        ? "Oui. La Maison DollarD Bijoux livre ses créations d'exception partout en Afrique centrale (Gabon, Congo, Tchad, RCA, Guinée Équatoriale) et dans le reste du monde. Toutes les expéditions font l'objet d'un protocole de sécurité strict et confidentiel."
        : "Yes. Maison DollarD Bijoux delivers its exceptional creations throughout Central Africa (Gabon, Congo, Chad, CAR, Equatorial Guinea) and worldwide. All shipments follow a strict, confidential security protocol."
    },
    {
      category: 'garantie',
      question: isFR 
        ? "Quelle est la durée et l'étendue de la garantie internationale ?" 
        : "What is the duration and scope of your international warranty?",
      answer: isFR
        ? "Chaque garde-temps et pièce de joaillerie de la Maison DollarD bénéficie d'une garantie internationale de 5 ans contre tout défaut de fabrication ou de fonctionnement mécanique. Cette garantie prend effet à la date d'activation enregistrée sur votre carte de prestige NFC."
        : "Every timepiece and jewelry piece from Maison DollarD benefits from a 5-year international warranty against any manufacturing defect or mechanical malfunction. This warranty takes effect upon the activation date registered on your NFC prestige card."
    },
    {
      category: 'garantie',
      question: isFR
        ? "Comment fonctionne le système d'authentification numérique par puce NFC ?"
        : "How does the digital NFC authentication system work?",
      answer: isFR
        ? "Votre création est accompagnée d'un certificat d'authenticité physique scellé intégrant une puce NFC cryptée de qualité bancaire. En approchant simplement un smartphone compatible, vous accédez à un registre numérique privé attestant l'authenticité de la pièce, son numéro de série unique et son historique d'entretien."
        : "Your creation is accompanied by a sealed physical certificate of authenticity featuring a bank-grade encrypted NFC chip. By simply tapping a compatible smartphone, you access a private digital ledger verifying the piece's authenticity, its unique serial number, and its maintenance history."
    },
    {
      category: 'entretien',
      question: isFR
        ? "Comment prendre soin de mes pièces associant l'or 18k et le bois d'ébène d'Afrique ?"
        : "How do I care for my pieces combining 18k gold and precious African ebony wood?",
      answer: isFR
        ? "Le bois d'ébène d'Afrique est une matière noble et vivante. Pour préserver son lustre profond, évitez l'exposition prolongée à l'eau ou aux parfums. Nous vous conseillons de nettoyer délicatement les parties en ébène à l'aide d'un chiffon doux légèrement imprégné d'une goutte d'huile d'amande douce naturelle une fois par an."
        : "African ebony is a noble, living material. To preserve its deep luster, avoid prolonged exposure to water, extreme humidity, or direct perfumes. We recommend gently cleaning the ebony sections using a soft cloth lightly dabbed with a drop of natural sweet almond oil once a year."
    },
    {
      category: 'entretien',
      question: isFR
        ? "À quelle fréquence dois-je faire réviser ma montre ou joaillerie de luxe ?"
        : "How often should I have my luxury watch or fine jewelry serviced?",
      answer: isFR
        ? "Pour garantir la précision absolue des calibres mécaniques et l'intégrité des sertissages, nous recommandons une révision complète tous les 3 à 5 ans dans nos ateliers de prestige. Nos maîtres horlogers et joailliers procéderont au démontage, nettoyage, huilage et polissage minutieux de votre œuvre."
        : "To guarantee the absolute precision of mechanical movements and the integrity of gem settings, we recommend a complete service every 3 to 5 years in our prestige workshops. Our master watchmakers and jewelers will disassemble, clean, oil, and meticulously polish your masterpiece."
    },
    {
      category: 'garantie',
      question: isFR 
        ? "Comment se déroule le processus de commande sur-mesure ?" 
        : "How does the bespoke commission process work?",
      answer: isFR
        ? "Chaque commande sur-mesure commence par un entretien privé avec nos directeurs artistiques (physique ou à distance). Nous dessinons les croquis initiaux, sélectionnons les métaux fins et les diamants de haute pureté, puis nous lançons la manufacture artisanale dans nos ateliers après validation du contrat confidentiel."
        : "Each bespoke commission begins with a private consultation with our creative directors (in-person or virtual). We craft initial sketches, select fine metals and high-clarity diamonds, and initiate handcrafted production in our ateliers upon validation of a confidential agreement."
    },
    {
      category: 'livraison',
      question: isFR
        ? "Proposez-vous des facilités de paiement confidentielles ?"
        : "Do you offer confidential payment options?",
      answer: isFR
        ? "Oui. Dans le cadre de nos acquisitions de Prestige, nous acceptons les virements bancaires internationaux sécurisés, les lettres de crédit, ainsi que des plans d'échelonnement personnalisés confidentiels déterminés par notre direction financière."
        : "Yes. For our Prestige acquisitions, we accept secure international bank wire transfers, letters of credit, as well as customized confidential installment schedules arranged with our financial directors."
    }
  ];

  const faqCategories = [
    { id: 'all', label: isFR ? 'Tous' : 'All' },
    { id: 'livraison', label: isFR ? 'Livraison' : 'Shipping' },
    { id: 'garantie', label: isFR ? 'Garantie & Authenticité' : 'Warranty & Authenticity' },
    { id: 'entretien', label: isFR ? 'Entretien & Révision' : 'Care & Maintenance' },
  ];

  const filteredFaqs = activeFaqCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === activeFaqCategory);

  return (
    <section className="fluid-section-py border-t border-neutral-900/60 bg-neutral-950 text-white transition-all duration-500 light:bg-stone-50 light:text-neutral-900 light:border-neutral-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Testimonials Block with staggered entrance */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mb-24"
        >
          {/* Testimonials Header */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
            }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase flex items-center justify-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {isFR ? 'LA VOIX DE NOS CLIENTS PRIVÉS' : 'TESTIMONIALS OF OUR PRIVATE CLIENTELE'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-100 light:text-neutral-900">
              {isFR ? 'Témoignages de Prestige' : 'Prestige Client Reviews'}
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
          </motion.div>
 
          {/* Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 14 } }
                }}
                className="relative p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md flex flex-col justify-between hover:border-gold-500/40 transition-all group light:bg-stone-100 light:border-neutral-200"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-800/40 group-hover:text-gold-500/20 transition-all" />
                <div className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-neutral-300 light:text-neutral-700 italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-800/50 light:border-neutral-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    {t.author}
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
        {/* FAQs Block with staggered entrance */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mb-24"
        >
          {/* FAQs Header */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
            }}
            className="text-center max-w-2xl mx-auto mb-12 space-y-4"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              {isFR ? 'RÉPONSES DE LA CONCIERGERIE' : 'PRIVATE CONCIERGE Q&A'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-neutral-100 light:text-neutral-900">
              {isFR ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
            </h2>
            <div className="w-16 h-[1px] bg-gold-400 mx-auto mt-4" />
          </motion.div>

          {/* Interactive Category Tabs Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFaqCategory(cat.id as any);
                  setOpenFaqQuestion(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border ${
                  activeFaqCategory === cat.id
                    ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-[0_0_15px_rgba(193,136,51,0.2)] font-semibold'
                    : 'bg-neutral-900/40 text-neutral-400 border-neutral-800 hover:border-gold-400/40 hover:text-white light:bg-white light:text-neutral-600 light:border-stone-200 light:hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
 
          {/* FAQ Accordion list */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqQuestion === faq.question;
              return (
                <motion.div 
                  key={index} 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85, damping: 16 } }
                  }}
                  className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'border-gold-400/45 bg-neutral-900/30 shadow-[0_12px_24px_-10px_rgba(193,136,51,0.06)] light:border-gold-400/50 light:bg-stone-100' 
                      : 'border-neutral-800/80 bg-neutral-900/10 hover:border-neutral-700/80 light:border-neutral-200 light:bg-stone-50'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqQuestion(isOpen ? null : faq.question)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between text-neutral-100 transition-colors focus:outline-none light:text-neutral-900"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 pr-4">
                      <span className={`text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full w-max h-max border ${
                        isOpen 
                          ? 'bg-gold-400/20 text-gold-400 border-gold-400/30' 
                          : 'bg-neutral-900/40 text-neutral-400 border-neutral-800 light:bg-white light:text-neutral-500 light:border-neutral-200'
                      }`}>
                        {faq.category === 'livraison' ? (isFR ? 'LIVRAISON' : 'SHIPPING') : faq.category === 'garantie' ? (isFR ? 'GARANTIE' : 'WARRANTY') : (isFR ? 'ENTRETIEN' : 'CARE')}
                      </span>
                      <span className="font-serif text-sm sm:text-base font-semibold group-hover:text-gold-400/90 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gold-400 transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          height: { type: 'spring', stiffness: 220, damping: 25 },
                          opacity: { duration: 0.2 }
                        }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm font-light text-neutral-400 light:text-neutral-600 border-t border-neutral-900/20 leading-relaxed light:border-neutral-200/55">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Luxury Trust Indicators with staggered entrance */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-neutral-900/40 text-center light:border-neutral-200"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
            }}
            className="flex flex-col items-center space-y-2"
          >
            <ShieldCheck className="w-8 h-8 text-gold-400" />
            <h5 className="text-xs font-bold uppercase tracking-widest text-neutral-200 light:text-neutral-900">
              {isFR ? 'Authenticité Garantie' : 'Guaranteed Authenticity'}
            </h5>
            <p className="text-[11px] text-neutral-500 max-w-xs">
              {isFR ? 'Chaque création est numérotée et scellée avec certificat NFC' : 'Every single creation is numbered and sealed with an NFC certificate'}
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
            }}
            className="flex flex-col items-center space-y-2"
          >
            <Award className="w-8 h-8 text-gold-400" />
            <h5 className="text-xs font-bold uppercase tracking-widest text-neutral-200 light:text-neutral-900">
              {isFR ? 'Artisanat Souverain' : 'Sovereign Craftsmanship'}
            </h5>
            <p className="text-[11px] text-neutral-500 max-w-xs">
              {isFR ? 'Forgé à la main avec de l\'or 18k éthique et bois d\'ébène précieux' : 'Hand-forged with ethical 18k gold and precious African ebony'}
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 14 } }
            }}
            className="flex flex-col items-center space-y-2"
          >
            <Sparkles className="w-8 h-8 text-gold-400" />
            <h5 className="text-xs font-bold uppercase tracking-widest text-neutral-200 light:text-neutral-900">
              {isFR ? 'Expérience Concierge' : 'Concierge Experience'}
            </h5>
            <p className="text-[11px] text-neutral-500 max-w-xs">
              {isFR ? 'Rendez-vous confidentiel et remise en main propre sécurisée' : 'Confidential appointment booking and highly secure personal delivery'}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
