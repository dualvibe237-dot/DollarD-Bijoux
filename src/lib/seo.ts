import { Language, Product } from '../types';
import { formatPriceCFA } from './price';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string | string[];
  ogImage: string;
  canonicalUrl: string;
  language: Language;
}

export interface AdvancedSEOMetadata extends SEOMetadata {
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  ogType?: 'website' | 'product' | 'article';
  productPrice?: number;
  productCurrency?: string;
}

/**
 * Helper to set or update a meta tag.
 * Supports both standard 'name' meta tags and OpenGraph 'property' meta tags.
 */
function setMetaTag(name: string, content: string, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to delete a meta tag if it exists (e.g. clean up product-specific tags on standard pages).
 */
function removeMetaTag(name: string, isProperty = false) {
  if (typeof document === 'undefined') return;
  const attribute = isProperty ? 'property' : 'name';
  const element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (element) {
    element.remove();
  }
}

/**
 * Helper to set or update the canonical link tag.
 */
function setCanonicalLink(url: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

/**
 * Helper to set or update hreflang alternate links for multilingual SEO.
 */
function setAlternateLink(hreflang: string, url: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'alternate');
    element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

/**
 * Generates a dynamic OpenGraph image URL served by the custom Express backend.
 * This URL takes product details or category details and returns an elegant,
 * branded, high-resolution SVG dynamically.
 */
export function generateOpenGraphImage(options: {
  type: 'product' | 'category' | 'general';
  name?: string;
  category?: string;
  price?: string;
  metal?: string;
  stone?: string;
  image?: string;
  language?: Language;
}): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://maisondollard.com';
  const query = new URLSearchParams();
  query.set('type', options.type);
  if (options.name) query.set('name', options.name);
  if (options.category) query.set('category', options.category);
  if (options.price) query.set('price', options.price);
  if (options.metal) query.set('metal', options.metal);
  if (options.stone) query.set('stone', options.stone);
  if (options.image) query.set('image', options.image);
  if (options.language) query.set('lang', options.language);

  return `${origin}/api/og?${query.toString()}`;
}

/**
 * Dynamically updates document metadata, meta tags (keywords, description, OpenGraph, Twitter Cards, LinkedIn, and product properties),
 * and canonical URLs to maximize visibility and indexation on high-end search engines and social platforms.
 */
export function updateMetaTags(metadata: AdvancedSEOMetadata) {
  if (typeof document === 'undefined') return;

  const { 
    title, 
    description, 
    keywords, 
    ogImage, 
    canonicalUrl, 
    language,
    twitterCard = 'summary_large_image',
    twitterSite = '@MaisonDollarD',
    twitterCreator = '@MaisonDollarD',
    ogType = 'website',
    productPrice,
    productCurrency = 'XAF'
  } = metadata;

  // 1. Title Tag
  document.title = title;

  // 2. HTML Lang Attribute
  document.documentElement.lang = language.toLowerCase();

  // 3. Description (Standard, OG, LinkedIn, Twitter)
  setMetaTag('description', description, false);
  setMetaTag('og:description', description, true);
  setMetaTag('twitter:description', description, false);

  // 4. Keywords
  const keywordsString = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  setMetaTag('keywords', keywordsString, false);

  // 5. Canonical and Alternate URLs (Multilingual SEO)
  setCanonicalLink(canonicalUrl);
  
  // Base site URL for constructing alternates
  const baseSiteUrl = canonicalUrl.split('?')[0].split('#')[0];
  setAlternateLink('fr', `${baseSiteUrl}?lang=FR`);
  setAlternateLink('en', `${baseSiteUrl}?lang=EN`);
  setAlternateLink('x-default', baseSiteUrl);

  // 6. OpenGraph Meta Tags (Universal for Facebook, LinkedIn, Pinterest)
  setMetaTag('og:title', title, true);
  setMetaTag('og:image', ogImage, true);
  setMetaTag('og:url', canonicalUrl, true);
  setMetaTag('og:type', ogType, true);
  setMetaTag('og:locale', language === 'FR' ? 'fr_FR' : 'en_US');
  setMetaTag('og:site_name', 'Maison DollarD Bijoux');

  // 7. Twitter Card Meta Tags (Enhanced)
  setMetaTag('twitter:card', twitterCard, false);
  setMetaTag('twitter:title', title, false);
  setMetaTag('twitter:image', ogImage, false);
  if (twitterSite) setMetaTag('twitter:site', twitterSite, false);
  if (twitterCreator) setMetaTag('twitter:creator', twitterCreator, false);

  // 8. Product-specific OpenGraph Tags (for Rich Social Snippets, LinkedIn/Twitter Product Previews)
  if (ogType === 'product' && productPrice !== undefined) {
    setMetaTag('product:price:amount', productPrice.toString(), true);
    setMetaTag('product:price:currency', productCurrency, true);
    setMetaTag('og:price:amount', productPrice.toString(), true);
    setMetaTag('og:price:currency', productCurrency, true);
  } else {
    // Clean up product tags if not on a product page
    removeMetaTag('product:price:amount', true);
    removeMetaTag('product:price:currency', true);
    removeMetaTag('og:price:amount', true);
    removeMetaTag('og:price:currency', true);
  }
}

/**
 * Dynamically generates structured SEOMetadata for any page or product.
 * Returns OpenGraph, Twitter, and LinkedIn optimized structures.
 */
export function generateMetadata(options: {
  page?: 'home' | 'about' | 'boutique' | 'journal' | 'contact';
  product?: Product;
  language: Language;
  originUrl?: string;
}): AdvancedSEOMetadata {
  const { page, product, language, originUrl = 'https://maisondollard.com' } = options;
  const isFR = language === 'FR';

  let title = '';
  let description = '';
  let keywords: string[] = [];
  let ogImage = '';
  let ogType: 'website' | 'product' | 'article' = 'website';
  let productPrice: number | undefined;
  let productCurrency: string | undefined;

  if (product) {
    // Dynamically generate metadata for a prestigious Product
    title = isFR 
      ? `${product.name.FR} — Haute Création | Maison DollarD` 
      : `${product.name.EN} — Handcrafted Masterpiece | Maison DollarD`;
    
    const priceCFA = formatPriceCFA(product.price);
    const stoneTextFR = product.stone ? ` serti de ${product.stone.FR}` : '';
    const stoneTextEN = product.stone ? ` adorned with ${product.stone.EN}` : '';

    description = isFR
      ? `Découvrez ${product.name.FR}, un chef-d'œuvre de la collection ${product.categoryLabel.FR}. Boîtier en ${product.metal.FR}${stoneTextFR}. Conçu à la main au Cameroun. Prix estimatif d'acquisition : ${priceCFA}.`
      : `Discover ${product.name.EN}, a sovereign creation from the ${product.categoryLabel.EN} collection. Crafted in noble ${product.metal.EN}${stoneTextEN}. Made by hand in Cameroon. Estimated value: ${priceCFA}.`;
    
    keywords = isFR
      ? ['maison dollard', 'dollard bijoux', product.name.FR, product.categoryLabel.FR, product.metal.FR, ...(product.stone ? [product.stone.FR] : []), 'luxe', 'cameroun']
      : ['maison dollard', 'dollard jewelry', product.name.EN, product.categoryLabel.EN, product.metal.EN, ...(product.stone ? [product.stone.EN] : []), 'luxury', 'cameroon'];
    
    ogImage = generateOpenGraphImage({
      type: 'product',
      name: isFR ? product.name.FR : product.name.EN,
      category: isFR ? product.categoryLabel.FR : product.categoryLabel.EN,
      price: priceCFA,
      metal: isFR ? product.metal.FR : product.metal.EN,
      stone: product.stone ? (isFR ? product.stone.FR : product.stone.EN) : undefined,
      image: product.image,
      language
    });
    ogType = 'product';
    productPrice = Math.round(product.price * 655.957); // Official FCFA price
    productCurrency = 'XAF';
  } else {
    // Generate page-specific metadata
    switch (page) {
      case 'home':
        title = isFR 
          ? 'Maison DollarD Bijoux — Haute Joaillerie & Horlogerie de Prestige' 
          : 'Maison DollarD Bijoux — High Jewelry & Sovereign Horology';
        description = isFR
          ? "Découvrez les créations d'exception en or 18 carats et bois d'ébène d'Afrique de la Maison DollarD Bijoux. Haute Horlogerie et Haute Joaillerie contemporaines sur-mesure au Cameroun."
          : "Discover exceptional 18-karat gold and precious African ebony masterpieces by Maison DollarD Bijoux. Custom-made prestige watchmaking and fine jewelry.";
        keywords = isFR
          ? ['maison dollard', 'dollard bijoux', 'haute joaillerie cameroun', 'haute horlogerie prestige', 'bijoux luxe afrique', 'or 18 carats', 'bois ebene dore']
          : ['maison dollard', 'dollard jewelry', 'high jewelry cameroon', 'prestige watchmaking', 'african luxury jewels', '18k gold jewelry', 'ebony luxury'];
        ogImage = generateOpenGraphImage({
          type: 'general',
          name: isFR ? 'Maison DollarD' : 'Maison DollarD',
          category: isFR ? 'Haute Joaillerie & Horlogerie' : 'High Jewelry & Watchmaking',
          image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
          language
        });
        break;
      case 'about':
        title = isFR 
          ? "L'Histoire de la Maison — DollarD Bijoux" 
          : "Our Story — Maison DollarD Bijoux";
        description = isFR
          ? "L'héritage d'artisans d'art d'exception fusionnant la délicatesse de l'or noble 18k et le caractère majestueux de l'ébène. Un engagement d'authenticité souveraine."
          : "A legacy of master artists merging the delicacy of 18k noble gold with the majestic character of precious ebony. Sovereign authenticity & fine craft.";
        keywords = isFR
          ? ['histoire dollard bijoux', 'dollard createur', "savoir-faire dore d'afrique", 'artisanat luxe cameroun', 'atelier de prestige', 'ebene precieux']
          : ['dollard history', 'dollard designer', 'african golden craft', 'luxury craftsmanship cameroon', 'prestige workshop', 'precious ebony'];
        ogImage = generateOpenGraphImage({
          type: 'category',
          name: isFR ? "L'Histoire de la Maison" : 'Our Legacy & Story',
          category: isFR ? 'Héritage d’Art d’Exception' : 'Legacy of Fine Craft',
          image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
          language
        });
        break;
      case 'boutique':
        title = isFR 
          ? 'La Boutique de Prestige — DollarD Bijoux' 
          : 'The Prestige Collection — DollarD Bijoux';
        description = isFR
          ? "Explorez notre collection exclusive de garde-temps uniques d'exception, de haute joaillerie moderne et d'éditions limitées d'art ciselées entièrement à la main."
          : "Explore our exclusive collection of unique master timepieces, contemporary high jewelry, and hand-carved limited editions of fine art.";
        keywords = isFR
          ? ['boutique dollard bijoux', 'montres de luxe', 'bagues de prestige', 'editions limitees dollard', 'or 18k cameroun', 'bijouterie prestige']
          : ['dollard store', 'prestige watches', 'fine jewelry', 'dollard limited editions', '18k gold cameroon', 'luxury boutique'];
        ogImage = generateOpenGraphImage({
          type: 'category',
          name: isFR ? 'Salon d’Exposition' : 'The Prestige Boutique',
          category: isFR ? 'Collections d’Exception' : 'Sovereign Collections',
          image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1200',
          language
        });
        break;
      case 'journal':
        title = isFR 
          ? 'Le Journal de la Maison — DollarD Bijoux' 
          : 'The Maison Journal — DollarD Bijoux';
        description = isFR
          ? "Chroniques exclusives de la Maison DollarD Bijoux sur l'artisanat d'art, la gemmologie de prestige, la haute horlogerie contemporaine et nos inspirations souveraines."
          : "Exclusive insights from Maison DollarD Bijoux into fine craftsmanship, high-value gemology, contemporary watchmaking, and our sovereign inspirations.";
        keywords = isFR
          ? ['les chroniques dollard', 'artisanat dore', 'gemmologie cameroun', 'horlogerie fine', 'inspiration dollard', 'luxe africain journal']
          : ['dollard chronicles', 'golden craftsmanship', 'gemology cameroon', 'fine horology', 'dollard inspiration', 'african luxury journal'];
        ogImage = generateOpenGraphImage({
          type: 'category',
          name: isFR ? 'Le Journal DollarD' : 'The Prestige Journal',
          category: isFR ? 'Chroniques & Savoir-faire' : 'Chronicles of Excellence',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
          language
        });
        ogType = 'article';
        break;
      case 'contact':
        title = isFR 
          ? 'Le Salon Privé & Conciergerie — DollarD Bijoux' 
          : 'Private Salon & Concierge — DollarD Bijoux';
        description = isFR
          ? "Prenez un rendez-vous confidentiel dans nos salons privés à Douala ou Yaoundé. Commissionnez votre œuvre d'art unique auprès de notre service de conciergerie."
          : "Book a confidential private consultation at our Douala or Yaounde luxury salons. Commission your unique masterpiece with our bespoke concierge.";
        keywords = isFR
          ? ['conciergerie dollard', 'salon prive douala', 'salon prive yaounde', 'commande speciale bijoux', 'sur-mesure luxe', 'rendez-vous dollard']
          : ['dollard concierge', 'private salon douala', 'private salon yaounde', 'custom jewelry commission', 'bespoke luxury', 'book dollard'];
        ogImage = generateOpenGraphImage({
          type: 'category',
          name: isFR ? 'Conciergerie Privée' : 'Bespoke Concierge',
          category: isFR ? 'Salon Douala & Yaoundé' : 'Douala & Yaounde Salons',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
          language
        });
        break;
      default:
        title = 'Maison DollarD Bijoux — Haute Joaillerie & Horlogerie';
        description = 'Haute Joaillerie & Horlogerie de Prestige en or 18 carats et bois d’ébène précieux.';
        keywords = ['maison dollard', 'dollard bijoux', 'luxe', 'cameroun'];
        ogImage = generateOpenGraphImage({
          type: 'general',
          name: 'Maison DollarD Bijoux',
          category: 'Haute Joaillerie & Horlogerie',
          image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
          language
        });
    }
  }

  const cleanOrigin = originUrl.replace(/\/$/, '');
  const pathSuffix = page && page !== 'home' ? `#${page}` : '';
  const canonicalUrl = `${cleanOrigin}/${pathSuffix}`;

  return {
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    language,
    twitterCard: 'summary_large_image',
    twitterSite: '@MaisonDollarD',
    twitterCreator: '@MaisonDollarD',
    ogType,
    productPrice,
    productCurrency
  };
}
