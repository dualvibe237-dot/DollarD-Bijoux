import { Product, CartItem, Language } from '../types';

const WHATSAPP_PHONE = '237600000000'; // Private concierge customer service of DollarD Bijoux in Cameroon

/**
 * Encodes a text for URL use.
 */
function encodeText(text: string): string {
  return encodeURIComponent(text);
}

/**
 * Generates an elite, luxury transaction reference code.
 */
function generateInvoiceRef(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(100 + Math.random() * 900);
  return `DD-${year}${month}${day}-${random}`;
}

/**
 * Formats a single product purchase message.
 */
export function getWhatsAppProductUrl(
  product: Product,
  language: Language,
  customizedDial?: string,
  customizedStrap?: string
): string {
  const isFR = language === 'FR';
  const invoiceRef = generateInvoiceRef();
  let message = '';

  if (customizedDial || customizedStrap) {
    // Custom watch commission
    message = isFR
      ? `⚜️ *MAISON DOLLARD BIJOUX — HAUTE HORLOGERIE* ⚜️\n` +
        `🏆 _Atelier de Commission Spéciale & Sur-Mesure_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `> 📄 *Réf. Pièce Unique :* \`${invoiceRef}\`\n` +
        `> 📅 *Date d'Émission :* _${new Date().toLocaleDateString('fr-FR')}_\n` +
        `> ✨ *Statut de la Demande :* _Prioritaire (Conciergerie en Ligne)_\n\n` +
        `Chère Maison DollarD, je sollicite l'accompagnement de vos artisans d'art pour la fabrication de ma création sur-mesure d'exception :\n\n` +
        `💎 *CARACTÉRISTIQUES DE CONCEPTION :*\n` +
        `• *Modèle Iconique de Base :* _${product.name.FR}_\n` +
        `• *Référence Unique :* \`${product.ref}\`\n` +
        `• *Cadran Manufacturé :* *${customizedDial || 'Classique Imperial'}*\n` +
        `• *Boîtier & Bracelet Nobles :* *${customizedStrap || 'Or Rose 18k & Bois d\'Ébène sculpté'}*\n` +
        `• *Métal Précieux Châssis :* _${product.metal.FR}_\n` +
        `• *Sertissage Sélectionné :* _${product.stone.FR}_\n\n` +
        `💵 *VALEUR ESTIMATIVE D'ACQUISITION :*\n` +
        `👉 *${(product.price * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🛡️ *SERVICES EXCLUSIFS DE CONFIANCE :*\n` +
        `• _Signature d'un contrat de fabrication officiel authentifié par un huissier._\n` +
        `• _Garantie internationale de la manufacture d'origine pendant 10 ans._\n` +
        `• _Sécurisation absolue du transport assurée par Ferrari Group._\n` +
        `• _Remise en main propre confidentielle à votre adresse ou dans notre salon privé._\n\n` +
        `💬 *Note du client :* _Je reste disponible pour verser l'acompte de 50% requis et planifier le début des travaux de ciselage dans vos ateliers._`
      : `⚜️ *MAISON DOLLARD BIJOUX — FINE WATCHMAKING* ⚜️\n` +
        `🏆 _Bespoke & Special Commissions Atelier_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `> 📄 *Unique Piece Ref:* \`${invoiceRef}\`\n` +
        `> 📅 *Date of Issue:* _${new Date().toLocaleDateString('en-US')}_\n` +
        `> ✨ *Commission Status:* _High-Priority (Online Concierge)_\n\n` +
        `Dear DollarD, I am requesting the expertise of your master artisans to forge the following custom-made masterpiece:\n\n` +
        `💎 *BESPOKE COMPOSITION DESIGN:*\n` +
        `• *Iconic Base Model:* _${product.name.EN}_\n` +
        `• *Master Reference:* \`${product.ref}\`\n` +
        `• *Bespoke Dial Work:* *${customizedDial || 'Classic Imperial'}*\n` +
        `• *Curated Case & Strap:* *${customizedStrap || '18k Rose Gold & Sculpted Ebony'}*\n` +
        `• *Noble Frame Metal:* _${product.metal.EN}_\n` +
        `• *Selected Gemstones:* _${product.stone.EN}_\n\n` +
        `💵 *ESTIMATED VALUE OF ACQUISITION:*\n` +
        `👉 *${(product.price * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🛡️ *PRESTIGE COMPLIMENTARY EXCLUSIVES:*\n` +
        `• _Formal custom creation contract signed and validated by a legal public bailiff._\n` +
        `• _10-year official manufacture international warranty certificate._\n` +
        `• _High-value transport insurance handled directly by Ferrari Group._\n` +
        `• _Fully confidential personal hand-delivery at your residence or our private lounge._\n\n` +
        `💬 *Client comment:* _I am available to arrange the 50% wire deposit to initiate the precise crafting and gemstone setting inside your private atelier._`;
  } else {
    // Standard product order
    message = isFR
      ? `⚜️ *MAISON DOLLARD BIJOUX — BON DE RÉSERVATION* ⚜️\n` +
        `👑 _Haute Joaillerie & Horlogerie Contemporaine_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `> 📄 *Code de Réservation :* \`${invoiceRef}\`\n` +
        `> 📅 *Date d'Enregistrement :* _${new Date().toLocaleDateString('fr-FR')}_\n` +
        `> ✨ *Disponibilité :* _Vérification Concierge instantanée_\n\n` +
        `Bonjour, je souhaite réserver et faire l'acquisition de cette création originale de la Maison :\n\n` +
        `💎 *DÉTAILS DU CHEF-D’ŒUVRE :*\n` +
        `• *Nom de la Création :* *${product.name.FR}*\n` +
        `• *Référence Unique :* \`${product.ref}\`\n` +
        `• *Composition Métallique :* _${product.metal.FR}_\n` +
        `• *Ornements Précieux :* _${product.stone.FR}_\n` +
        `• *Catégorie de Prestige :* _${product.category === 'watch' ? 'Haute Horlogerie' : product.category === 'limited' ? 'Édition Limitée d\'Art' : 'Haute Joaillerie Contemporaine'}_\n\n` +
        `💳 *VALEUR COMPTANT DE LA CRÉATION :*\n` +
        `👉 *${(product.price * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📦 *LOGISTIQUE ET SÉCURITÉ DE LIVRAISON :*\n` +
        `• _Certificat d'authenticité infalsifiable de la Maison DollarD avec puce NFC numérique._\n` +
        `• _Écrin en cuir sur-mesure doublé de velours protecteur._\n` +
        `• _Livraison sécurisée sous haute garde à Yaoundé, Douala, ou expédition assurée à l'international._\n\n` +
        `💬 *Note :* _Merci de me faire recontacter par un de vos conseillers de clientèle pour valider mon virement d'acquisition._`
      : `⚜️ *MAISON DOLLARD BIJOUX — RESERVATION INVOICE* ⚜️\n` +
        `👑 _High Jewelry & Contemporary Horology_\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `> 📄 *Reservation Code:* \`${invoiceRef}\`\n` +
        `> 📅 *Registration Date:* _${new Date().toLocaleDateString('en-US')}_\n` +
        `> ✨ *Availability:* _Instant Concierge Verification_\n\n` +
        `Hello, I would like to reserve and acquire this original luxury creation from the Maison:\n\n` +
        `💎 *MASTERPIECE DETAILS:*\n` +
        `• *Creation Name:* *${product.name.EN}*\n` +
        `• *Unique Master Reference:* \`${product.ref}\`\n` +
        `• *Metallic Composition:* _${product.metal.EN}_\n` +
        `• *Gemstone Selection:* _${product.stone.EN}_\n` +
        `• *Prestige Category:* _${product.category === 'watch' ? 'High Horology' : product.category === 'limited' ? 'Limited Fine Art Edition' : 'Contemporary High Jewelry'}_\n\n` +
        `💳 *CASH VALUE OF MASTERPIECE:*\n` +
        `👉 *${(product.price * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📦 *LOGISTICS & PREMIUM HANDOVER:* \n` +
        `• _Official forgery-proof DollarD Authenticity Certificate featuring a secure digital NFC chip._\n` +
        `• _Bespoke custom leather chest lined with rich protective velvet._\n` +
        `• _High-security courier hand-delivery in Yaounde, Douala, or fully insured international shipping._\n\n` +
        `💬 *Note:* _Please connect me with a luxury brand ambassador to confirm my wire transfer authorization._`;
  }

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeText(message)}`;
}

/**
 * Formats a multiple item acquisition chest message.
 */
export function getWhatsAppCartUrl(
  cartItems: CartItem[],
  totalAmount: number,
  language: Language
): string {
  const isFR = language === 'FR';
  const invoiceRef = generateInvoiceRef();
  const dateStr = new Date().toLocaleDateString(isFR ? 'fr-FR' : 'en-US');

  let message = isFR
    ? `⚜️ *MAISON DOLLARD BIJOUX — RÉCAPITULATIF COFFRET* ⚜️\n` +
      `👑 _Portefeuille d'Acquisitions Haute Joaillerie_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `> 📄 *Réf. Coffret Prestige :* \`${invoiceRef}\`\n` +
      `> 📅 *Date d'Émission :* _${dateStr}_\n` +
      `> 📦 *Pièces Sélectionnées :* _${cartItems.length} chefs-d'œuvre d'orfèvrerie_\n\n` +
      `Chère Conciergerie, je viens de composer mon coffret d'acquisitions de luxe depuis votre boutique numérique. Voici ma sélection officielle :\n\n`
    : `⚜️ *MAISON DOLLARD BIJOUX — CURATED CHEST SUMMARY* ⚜️\n` +
      `👑 _Fine Jewelry Acquisition Portfolio_\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `> 📄 *Prestige Chest Ref:* \`${invoiceRef}\`\n` +
      `> 📅 *Date of Issue:* _${dateStr}_\n` +
      `> 📦 *Selected Masterpieces:* _${cartItems.length} curated fine artworks_\n\n` +
      `Dear Concierge Service, I have just assembled my bespoke acquisition chest on your digital boutique. Here is my official selection:\n\n`;

  cartItems.forEach((item, index) => {
    const pName = isFR ? item.product.name.FR : item.product.name.EN;
    const ref = item.product.ref;
    const itemPrice = item.product.price * item.quantity;
    const metalVal = isFR ? item.product.metal.FR : item.product.metal.EN;
    
    message += `🔸 *${index + 1}. ${pName}* (x${item.quantity})\n`;
    message += `   • _Référence :_ \`${ref}\`\n`;
    message += `   • _Matière principale :_ _${metalVal}_\n`;
    if (item.customizedDial || item.customizedStrap) {
      message += `   • _Cadran :_ *${item.customizedDial || 'Impérial'}* | _Châssis :_ *${item.customizedStrap || 'Or 18k'}*\n`;
    }
    message += `   • _Sous-total :_ *${(itemPrice * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n`;
  });

  message += isFR
    ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👑 *VALEUR TOTALE DU COFFRET PRESTIGE :*\n` +
      `👉 *${(totalAmount * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n` +
      `🛡️ *SERVICES INCLUS POUR LE COFFRET :*\n` +
      `• _Signature conjointe d'un contrat de vente d'art confidentiel sous seing privé._\n` +
      `• _Plaque d'authenticité en or massif insérée dans le coffret précieux._\n` +
      `• _Sécurisation absolue et transport blindé Ferrari Group._\n\n` +
      `💬 _Je souhaite fixer un rendez-vous privé d'inspection des pierres dans vos locaux._`
    : `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👑 *TOTAL PRESTIGE CHEST ACQUISITION VALUE:*\n` +
      `👉 *${(totalAmount * 655.957).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} FCFA*\n\n` +
      `🛡️ *EXCLUSIVE BENEFITS OF PORTFOLIO SELECTION:*\n` +
      `• _Joint sign-off on a confidential fine art private sales agreement._\n` +
      `• _Solid gold Authenticity Plaque embedded in your handcrafted chest._\n` +
      `• _Absolute bulletproof armed transport handled by Ferrari Group._\n\n` +
      `💬 _Please coordinate my secure wire payment and schedule a private gemstone viewing._`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeText(message)}`;
}
