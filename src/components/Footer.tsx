import React from 'react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 border-t border-neutral-900 light:bg-stone-900 light:text-stone-400 light:border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <a href="#home" className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.25em] font-bold text-gold-400 uppercase">
                DollarD
              </span>
              <span className="text-[9px] tracking-[0.4em] font-sans text-neutral-500 uppercase -mt-0.5">
                Bijoux
              </span>
            </a>
            <p className="text-xs leading-relaxed text-neutral-500">
              {t.footerText}
            </p>
          </div>

          {/* Quick Collection Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs text-neutral-200 uppercase tracking-widest">
              {language === 'FR' ? 'Collections' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#boutique" className="hover:text-gold-400 transition-colors">
                  {language === 'FR' ? 'Haute Horlogerie' : 'High Horology'}
                </a>
              </li>
              <li>
                <a href="#boutique" className="hover:text-gold-400 transition-colors">
                  {language === 'FR' ? 'Haute Joaillerie' : 'Fine Jewelry'}
                </a>
              </li>
              <li>
                <a href="#boutique" className="hover:text-gold-400 transition-colors">
                  {language === 'FR' ? 'Éditions Limitées' : 'Limited Editions'}
                </a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-gold-400 transition-colors">
                  {language === 'FR' ? 'Atelier sur-mesure' : 'Bespoke atelier'}
                </a>
              </li>
            </ul>
          </div>

          {/* Maison Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs text-neutral-200 uppercase tracking-widest">
              {language === 'FR' ? 'La Maison' : 'The Maison'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">
                  {language === 'FR' ? 'Héritage & Savoir-Faire' : 'Heritage & Craftsmanship'}
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-gold-400 transition-colors">
                  {t.journal}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-400 transition-colors">
                  {language === 'FR' ? 'Conciergerie Privée' : 'Private Concierge'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-xs text-neutral-200 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Yaoundé, Cameroon</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>(+237) 600 000 000</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>concierge@dollardbijoux.com</span>
              </li>
            </ul>
          </div>

        </div>

        <hr className="border-neutral-900 light:border-stone-800 my-8" />

        {/* Bottom copyright & Cameroon statement */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-neutral-500 gap-4">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>
              {language === 'FR'
                ? 'Conçu à Yaoundé, distribué dans le monde'
                : 'Designed in Yaounde, distributed globally'}
            </span>
          </div>

          <div className="text-center sm:text-right">
            <span>© 2026 Maison DollarD Bijoux. {t.allRightsReserved}.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
