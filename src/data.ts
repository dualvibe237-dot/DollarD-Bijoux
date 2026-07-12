import { Product, Collection, Testimonial, Story } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'dld-watch-01',
    name: {
      FR: 'Chronographe Impérial Kribi',
      EN: 'Kribi Imperial Chronograph',
    },
    description: {
      FR: 'Inspiré par le littoral majestueux de Kribi. Une pièce d’horlogerie automatique dotée d’un boîtier en or rose 18 carats et d’un cadran soleillé bleu océan profond.',
      EN: 'Inspired by the majestic coastline of Kribi. An automatic timekeeper featuring an 18-karat rose gold case and a deep ocean-blue sunray dial.',
    },
    category: 'watch',
    categoryLabel: {
      FR: 'Montres d’Exception',
      EN: 'Exquisite Timepieces',
    },
    price: 24500,
    metal: {
      FR: 'Or Rose 18k',
      EN: '18k Rose Gold',
    },
    stone: {
      FR: 'Index en Diamants VVS',
      EN: 'VVS Diamond Indexes',
    },
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    specifications: {
      FR: [
        'Mouvement Automatique Calibre DLD-900',
        'Réserve de marche de 72 heures',
        'Boîtier Or Rose 18 Carats (41mm)',
        'Verre Saphir anti-reflets double face',
        'Bracelet en cuir d’alligator cousu main',
        'Étanche à 50 mètres',
      ],
      EN: [
        'Caliber DLD-900 Automatic Movement',
        '72-hour power reserve',
        '18k Rose Gold Case (41mm)',
        'Double-sided anti-reflective Sapphire glass',
        'Hand-stitched alligator leather strap',
        'Water resistant to 50 meters',
      ],
    },
    limitedEdition: false,
    isNew: true,
    ref: 'REF. DLD-KRIBI-18R',
  },
  {
    id: 'dld-watch-02',
    name: {
      FR: 'Calendrier Perpétuel Mfoundi',
      EN: 'Mfoundi Perpetual Calendar',
    },
    description: {
      FR: 'La quintessence de la complication horlogère. Boîtier en platine massif poli miroir, complications phase de lune avec nacre gravée.',
      EN: 'The pinnacle of horological complication. Solid mirror-polished platinum case, phase-of-the-moon complication with engraved mother-of-pearl.',
    },
    category: 'watch',
    categoryLabel: {
      FR: 'Montres d’Exception',
      EN: 'Exquisite Timepieces',
    },
    price: 48000,
    metal: {
      FR: 'Platine 950',
      EN: 'Platinum 950',
    },
    stone: {
      FR: 'Couronne sertie de Saphir',
      EN: 'Sapphire-set crown',
    },
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1200',
    rating: 5.0,
    specifications: {
      FR: [
        'Complication Calendrier Perpétuel',
        'Indication de l’année bissextile et phase de lune',
        'Boîtier Platine 950 (40mm)',
        'Cadran en émail grand feu blanc',
        'Garantie internationale de 10 ans',
      ],
      EN: [
        'Perpetual Calendar Complication',
        'Leap year and moonphase indicator',
        'Platinum 950 Case (40mm)',
        'Grand Feu white enamel dial',
        '10-year international warranty',
      ],
    },
    limitedEdition: true,
    isNew: false,
    ref: 'REF. DLD-MFOUNDI-PL',
  },
  {
    id: 'dld-ring-01',
    name: {
      FR: 'Bague Solitaire Éclat du Wouri',
      EN: 'Wouri Radiance Solitaire Ring',
    },
    description: {
      FR: 'Une ode aux reflets d’argent du fleuve Wouri. Un diamant taille brillant d’une pureté exceptionnelle monté sur un anneau d’or blanc 18k texturé à la main.',
      EN: 'An ode to the silver ripples of the Wouri River. An exceptionally pure brilliant-cut diamond mounted on a hand-textured 18k white gold band.',
    },
    category: 'jewelry',
    categoryLabel: {
      FR: 'Haute Joaillerie',
      EN: 'Fine Jewelry',
    },
    price: 18900,
    metal: {
      FR: 'Or Blanc 18k',
      EN: '18k White Gold',
    },
    stone: {
      FR: 'Diamant de 2.5 Carats (F-VVS1)',
      EN: '2.5 Carat Diamond (F-VVS1)',
    },
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200',
    rating: 4.8,
    specifications: {
      FR: [
        'Diamant certifié GIA de 2.5 carats',
        'Couleur F, Clarté VVS1, Taille Excellente',
        'Or Blanc 18 carats recyclé',
        'Monture à griffes ciselée main',
        'Écrin prestige DollarD en bois précieux du Cameroun',
      ],
      EN: [
        'GIA Certified 2.5 Carat Diamond',
        'Color F, Clarity VVS1, Excellent Cut',
        '18k recycled White Gold',
        'Hand-chiseled prong setting',
        'DollarD prestige box in precious Cameroonian wood',
      ],
    },
    limitedEdition: false,
    isNew: true,
    ref: 'REF. DLD-WOURI-R',
  },
  {
    id: 'dld-neck-01',
    name: {
      FR: 'Collier Émeraude "Forêt du Dja"',
      EN: 'Dja Forest Emerald Necklace',
    },
    description: {
      FR: 'Célébrant le cœur émeraude de la réserve naturelle du Cameroun. Un pendentif d’émeraude de Zambie d’un vert profond, entouré de diamants poires.',
      EN: 'Celebrating the emerald heart of Cameroon’s forest reserve. A deep green Zambian emerald pendant, encircled by pear-cut diamonds.',
    },
    category: 'jewelry',
    categoryLabel: {
      FR: 'Haute Joaillerie',
      EN: 'Fine Jewelry',
    },
    price: 35000,
    metal: {
      FR: 'Or Jaune 18k',
      EN: '18k Yellow Gold',
    },
    stone: {
      FR: 'Émeraude 4.2 Cts & Diamants 1.8 Cts',
      EN: '4.2 Cts Emerald & 1.8 Cts Diamonds',
    },
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    specifications: {
      FR: [
        'Émeraude naturelle certifiée de 4.2 carats',
        '24 diamants poires VVS qualité extra',
        'Chaîne ajustable en maille vénitienne Or Jaune 18k',
        'Fermoir de sécurité avec signature DollarD gravée',
      ],
      EN: [
        'Certified 4.2 Carat Natural Emerald',
        '24 premium VVS pear diamonds',
        '18k Yellow Gold adjustable Venetian chain',
        'Safety clasp with signature DollarD engraving',
      ],
    },
    limitedEdition: true,
    isNew: true,
    ref: 'REF. DLD-DJA-N',
  },
  {
    id: 'dld-brac-01',
    name: {
      FR: 'Manchette Sculptée Foumban',
      EN: 'Foumban Sculpted Cuff',
    },
    description: {
      FR: 'Un chef-d’œuvre d’orfèvrerie inspiré des bronzes royaux de Foumban. Des lignes géométriques puissantes gravées dans l’or massif serti de diamants noirs.',
      EN: 'A goldsmithing masterpiece inspired by the royal bronzes of Foumban. Bold geometric lines hand-carved into solid gold set with black diamonds.',
    },
    category: 'limited',
    categoryLabel: {
      FR: 'Éditions Limitées',
      EN: 'Limited Editions',
    },
    price: 16500,
    metal: {
      FR: 'Or Jaune Brossé 18k',
      EN: '18k Brushed Yellow Gold',
    },
    stone: {
      FR: 'Diamants Noirs et Blancs pavés',
      EN: 'Paved Black & White Diamonds',
    },
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200',
    rating: 4.7,
    specifications: {
      FR: [
        'Édition strictement limitée à 5 exemplaires numérotés',
        'Gravure à la main réalisée par nos maîtres artisans',
        'Pavage de 120 diamants noirs calibrés (1.5 ct total)',
        'Certificat d’authenticité signé par le Directeur Artistique',
      ],
      EN: [
        'Strictly limited to 5 numbered pieces',
        'Hand-engraving by our master goldsmiths',
        'Pave of 120 calibrated black diamonds (1.5 ct total)',
        'Certificate of authenticity signed by the Creative Director',
      ],
    },
    limitedEdition: true,
    isNew: false,
    ref: 'REF. DLD-FOUMBAN-B',
  },
  {
    id: 'dld-watch-03',
    name: {
      FR: 'Heures Mystérieuses Mont Cameroun',
      EN: 'Mount Cameroon Mysterious Hours',
    },
    description: {
      FR: 'Représente le mont volcanique baigné de brume. Cadran en pierre volcanique véritable (basalte) noire brossée avec aiguilles flottantes suspendues sous saphir.',
      EN: 'Depicts the mist-covered volcanic peak. Dial in genuine brushed black volcanic basalt stone with floating hands suspended under sapphire crystal.',
    },
    category: 'limited',
    categoryLabel: {
      FR: 'Éditions Limitées',
      EN: 'Limited Editions',
    },
    price: 31000,
    metal: {
      FR: 'Titane de Grade 5 DLC Noir',
      EN: 'Grade 5 Titanium with Black DLC',
    },
    stone: {
      FR: 'Rubis d’échappement visibles',
      EN: 'Visible escapement Rubies',
    },
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=1200',
    rating: 4.9,
    specifications: {
      FR: [
        'Édition limitée à 15 exemplaires d’exception',
        'Cadran découpé dans du basalte du Mont Cameroun',
        'Mouvement squelette à remontage manuel avec échappement tourbillon',
        'Bracelet technique en caoutchouc premium noir ou cuir de veau noir',
      ],
      EN: [
        'Limited edition of 15 exceptional timepieces',
        'Dial carved from genuine Mount Cameroon basalt stone',
        'Manual-wound skeleton movement with tourbillon escapement',
        'Premium black technical rubber strap or black calfskin',
      ],
    },
    limitedEdition: true,
    isNew: true,
    ref: 'REF. DLD-MTCAM-03',
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-horlogerie',
    name: {
      FR: 'Haute Horlogerie',
      EN: 'High Horology',
    },
    slogan: {
      FR: 'La Mesure du Temps Sacré',
      EN: 'The Measure of Sacred Time',
    },
    description: {
      FR: 'Des calibres automatiques d’une précision helvétique, dessinés et sublimés par l’esthétique et l’audace de notre héritage camerounais.',
      EN: 'Swiss-precision automatic movements designed and elevated by the aesthetics and audacity of our Cameroonian heritage.',
    },
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1200',
    quote: {
      FR: '« Le temps n’est pas ce qui passe, c’est ce qui nous lie à l’éternité. »',
      EN: '“Time is not what passes, it is what binds us to eternity.”',
    },
  },
  {
    id: 'col-joaillerie',
    name: {
      FR: 'Joaillerie d’Exception',
      EN: 'High Jewelry',
    },
    slogan: {
      FR: 'Des Pierres Chargées de Récits',
      EN: 'Stones Infused with Narrative',
    },
    description: {
      FR: 'Chaque bague, collier et bracelet capture les murmures des terres équatoriales, façonnés dans des métaux précieux d’une pureté absolue.',
      EN: 'Each ring, necklace, and bracelet captures the whispers of equatorial lands, crafted in precious metals of absolute purity.',
    },
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
    quote: {
      FR: '« Une gemme est une prière de la Terre gravée par la patience. »',
      EN: '“A gemstone is a prayer from the Earth carved by patience.”',
    },
  },
  {
    id: 'col-coffrets',
    name: {
      FR: 'Éditions et Coffrets Noirs',
      EN: 'Black Editions & Chests',
    },
    slogan: {
      FR: 'La Signature Impériale',
      EN: 'The Imperial Signature',
    },
    description: {
      FR: 'Pour les collectionneurs internationaux les plus exigeants, des coffrets d’ébène précieux renfermant des pièces numérotées sur-mesure.',
      EN: 'For the most demanding international collectors, precious ebony wood chests containing custom-tailored numbered creations.',
    },
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
    quote: {
      FR: '« Le luxe suprême réside dans ce qui est rare et raconté dans l’ombre. »',
      EN: '“Supreme luxury resides in what is rare and whispered in the shadows.”',
    },
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Samuel E.',
    city: 'Yaoundé, Cameroun',
    role: {
      FR: 'Collectionneur & Investisseur',
      EN: 'Collector & Investor',
    },
    text: {
      FR: 'DollarD Bijoux incarne une fierté immense. Posséder la montre Perpétuelle Mfoundi, c’est porter sur soi à la fois la perfection mécanique suisse et l’âme noble du Cameroun. Une œuvre d’art absolue.',
      EN: 'DollarD Bijoux embodies immense pride. Owning the Mfoundi Perpetual calendar is wearing both Swiss mechanical perfection and the noble soul of Cameroon. An absolute masterpiece.',
    },
    rating: 5,
  },
  {
    id: 'test-02',
    name: 'Lady Alexandra de V.',
    city: 'Genève, Suisse',
    role: {
      FR: 'Experte en Haute Horlogerie',
      EN: 'Fine Watchmaking Expert',
    },
    text: {
      FR: 'Le niveau de finition des boîtiers, la pureté des diamants et la finesse de gravure de la Maison DollarD rivalisent sans rougir avec les plus grandes manufactures de la place Vendôme.',
      EN: 'The case finishes, diamond purity, and hand-engravings by Maison DollarD easily rival the historical manufactures of Place Vendôme.',
    },
    rating: 5,
  },
  {
    id: 'test-03',
    name: 'Mireille N.',
    city: 'Paris, France',
    role: {
      FR: 'Philanthrope & Cliente Privée',
      EN: 'Philanthropist & Private Client',
    },
    text: {
      FR: 'Chaque consultation privée est un voyage. J’ai fait concevoir mon alliance sur-mesure avec l’émeraude du Dja. Le service de conciergerie WhatsApp et la livraison sécurisée internationale sont irréprochables.',
      EN: 'Each private consultation is a journey. I had my wedding band custom made with the Dja emerald. The WhatsApp concierge service and secure global shipping are flawless.',
    },
    rating: 5,
  }
];

export const STORIES: Story[] = [
  {
    id: 'story-01',
    title: {
      FR: 'Le secret des fonderies d’Or à Yaoundé',
      EN: 'The Secret of Gold Smelting in Yaounde',
    },
    category: {
      FR: 'Savoir-Faire',
      EN: 'Craftsmanship',
    },
    readTime: '6 min',
    date: '2026-05-12',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200',
    summary: {
      FR: 'Plongez dans les coulisses de notre atelier privé où l’or brut extrait de manière responsable au Cameroun est allié pour donner notre teinte dorée impériale unique.',
      EN: 'Go behind the scenes of our private workshop where responsibly extracted raw gold from Cameroon is melted to form our unique imperial golden hue.',
    },
    content: {
      FR: [
        'Dans notre atelier secret situé sur les collines ombragées de Yaoundé, s’accomplit chaque jour un rituel d’une précision chirurgicale : la fonte de l’Or DollarD. Soucieux de l’éthique et de la traçabilité de nos matériaux, la Maison s’approvisionne exclusivement auprès de coopératives minières artisanales responsables de l’Est du Cameroun.',
        'Cet or brut est ensuite allié dans nos fours à induction à des proportions jalousement gardées d’argent fin et de cuivre pur. C’est de cette alchimie que naît l’Or Impérial DollarD, une nuance chaude, intense, rappelant la lumière d’un coucher de soleil sur l’équateur. Chaque lingot est testé, certifié et marqué de notre sceau avant d’être sculpté par nos artisans.',
      ],
      EN: [
        'In our secret workshop nestled in the shaded hills of Yaounde, a surgical-precision ritual takes place daily: the smelting of DollarD Gold. Committed to ethical standards and absolute traceability, the Maison sources raw gold exclusively from responsible artisanal cooperatives in Eastern Cameroon.',
        'This gold is then alloyed in our induction furnaces with highly guarded proportions of fine silver and pure copper. From this alchemy arises DollarD Imperial Gold, a warm, rich tone reminiscent of equatorial sunsets. Each bar is verified, certified, and hallmarked before being shaped by our master goldsmiths.',
      ],
    },
  },
  {
    id: 'story-02',
    title: {
      FR: 'De la Suisse au Cameroun : la double culture de la précision',
      EN: 'From Switzerland to Cameroon: A Dual Culture of Precision',
    },
    category: {
      FR: 'Héritage',
      EN: 'Heritage',
    },
    readTime: '8 min',
    date: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
    summary: {
      FR: 'Rencontre avec le Maître Horloger de la maison, qui unit les exigences techniques de l’académie de Genève aux inspirations artistiques de l’Afrique Centrale.',
      EN: 'Meet our Master Watchmaker, blending Swiss technical rigor with the vibrant artistic inspirations of Central Africa.',
    },
    content: {
      FR: [
        'L’ADN de DollarD est né d’un pont invisible entre deux mondes. D’un côté, la rigueur inflexible des montagnes helvétiques, berceau des complications les plus folles du temps. De l’autre, la poésie, les matières nobles et la splendeur visuelle du Cameroun.',
        'Nos calibres de base sont assemblés et réglés en collaboration avec des ateliers suisses réputés, avant de rejoindre nos ateliers camerounais pour recevoir leur habit d’apparat : cadrans gravés à la main représentant des motifs traditionnels, aiguilles façonnées sur-mesure, et boîtiers sertis à la loupe par nos joailliers.',
      ],
      EN: [
        'DollarD’s DNA was born of an invisible bridge between two distinct worlds: the uncompromising rigor of Swiss watchmaking mountains and the poetry, rich materials, and visual splendor of Cameroon.',
        'Our base calibers are assembled and regulated in collaboration with renowned Swiss ateliers before arriving at our Cameroonian workshop to receive their majestic embellishments: hand-engraved traditional motifs, bespoke hands, and cases meticulously set under magnifier glass by our jewelers.',
      ],
    },
  }
];

export const TRANSLATIONS = {
  FR: {
    brandName: 'DollarD Bijoux',
    brandSub: 'Haute Horlogerie & Joaillerie d’Exception',
    explore: 'Explorer la Maison',
    viewCollection: 'Découvrir la Collection',
    contactUs: 'Prendre Rendez-vous',
    whatsappConsult: 'Conciergerie WhatsApp',
    home: 'Accueil',
    about: 'La Maison',
    boutique: 'Boutique',
    journal: 'Journal',
    contact: 'Service Privé',
    conceptTitle: 'Concept Haute Joaillerie & Horlogerie',
    sloganMarquee: '• HAUTE HORLOGERIE • JOAILLERIE D’EXCEPTION • CONÇU À YAOUNDÉ, DISTRIBUÉ DANS LE MONDE • MATÉRIAUX RESPONSABLES • ÉDITIONS LIMITÉES ',
    limited: 'Édition Limitée',
    new: 'Nouveauté',
    addToCart: 'Acquérir la pièce',
    addedToCart: 'Pièce réservée au panier',
    checkout: 'Finaliser l’acquisition',
    privateConsultation: 'Demander une consultation privée',
    specifications: 'Caractéristiques techniques',
    cartTitle: 'Votre Coffret d’Acquisitions',
    cartEmpty: 'Votre coffret est vide pour le moment.',
    totalPrice: 'Estimation totale',
    requestPrivateViewing: 'Demander une présentation à domicile',
    aboutIntro: 'Héritage & Vision Camerounaise',
    aboutParagraph1: 'Fondée à Yaoundé, la Maison DollarD Bijoux s’affirme comme la première signature de haute horlogerie et joaillerie de luxe du Cameroun, destinée à une élite internationale.',
    aboutParagraph2: 'Nous fusionnons la virtuosité artisanale transmise à travers les générations et l’excellence des complications mécaniques les plus pointues pour sculpter des objets de transmission intergénérationnelle.',
    craftSteps: [
      { title: 'Conception', desc: 'Chaque pièce naît d’une esquisse d’art, mariant motifs ancestraux d’Afrique Centrale et design épuré contemporain.' },
      { title: 'Sourcing Éthique', desc: 'Nos ors et diamants proviennent de filières camerounaises 100% certifiées, respectant l’humain et la nature.' },
      { title: 'Haute Précision', desc: 'Nos calibres automatiques sont assemblés avec le savoir-faire helvétique le plus strict.' },
      { title: 'Sertissage & Finitions', desc: 'Chaque gemme est ajustée au microscope, chaque boîtier est poli et gravé entièrement à la main.' }
    ],
    configuratorTitle: 'L’Atelier Virtuel de Personnalisation',
    configuratorSubtitle: 'Configurez la montre de vos rêves',
    dialColor: 'Couleur du Cadran',
    strapMetal: 'Métal du Boîtier & Bracelet',
    diamondsOpt: 'Option Sertissage Diamants',
    diamondsNone: 'Sertissage classique d’index',
    diamondsBezel: 'Lunette sertie de Diamants VVS (+3 279 785 FCFA)',
    dialDeepBlue: 'Bleu Océan Kribi',
    dialVolcanic: 'Noir Volcanique',
    dialChampagne: 'Champagne Impérial',
    metalRoseGold: 'Or Rose 18k',
    metalPlatinum: 'Platine Poli 950',
    metalWhiteGold: 'Or Blanc Ciselé',
    priceEstimate: 'Estimation personnalisée',
    customOrderBtn: 'Commander cette pièce unique',
    filterAll: 'Toutes les créations',
    filterWatch: 'Montres',
    filterJewelry: 'Joaillerie',
    filterLimited: 'Éditions Limitées',
    readMore: 'Lire la suite',
    storiesTitle: 'Le Journal DollarD',
    storiesSubtitle: 'Chroniques du luxe et récits de nos ateliers',
    contactTitle: 'Demande de Rendez-vous Privé',
    contactSubtitle: 'Nos conseillers vous répondent dans le monde entier sous 24h',
    formName: 'Votre Nom complet',
    formEmail: 'Adresse Électronique',
    formPhone: 'Numéro de Téléphone (avec WhatsApp)',
    formInterest: 'Création d’intérêt',
    formMsg: 'Précisez votre demande (sur-mesure, rdv physique, livraison)',
    formSubmit: 'Soumettre la demande impériale',
    formSuccess: 'Votre demande a été enregistrée avec la plus haute distinction. Notre conciergerie vous contactera incessamment.',
    footerText: 'Maison DollarD Bijoux — Haute Joaillerie et Horlogerie de prestige. Conçu à Yaoundé, distribué et apprécié à travers le monde.',
    allRightsReserved: 'Tous droits réservés. Maison DollarD Bijoux',
  },
  EN: {
    brandName: 'DollarD Bijoux',
    brandSub: 'Exquisite High Horology & Jewelry',
    explore: 'Explore the Maison',
    viewCollection: 'Discover the Collection',
    contactUs: 'Book a Private Appointment',
    whatsappConsult: 'WhatsApp Concierge',
    home: 'Home',
    about: 'The Maison',
    boutique: 'Boutique',
    journal: 'Journal',
    contact: 'Private Service',
    conceptTitle: 'High Jewelry & Horology Concept',
    sloganMarquee: '• HIGH HOROLOGY • EXQUISITE JEWELRY • DESIGNED IN YAOUNDE, DISTRIBUTED GLOBALLY • ETHICALLY SOURCED • LIMITED EDITIONS ',
    limited: 'Limited Edition',
    new: 'New Arrival',
    addToCart: 'Acquire timekeeper',
    addedToCart: 'Piece reserved in chest',
    checkout: 'Finalize Acquisition',
    privateConsultation: 'Request a Private Consultation',
    specifications: 'Technical Specifications',
    cartTitle: 'Your Acquisition Chest',
    cartEmpty: 'Your chest is currently empty.',
    totalPrice: 'Total Estimation',
    requestPrivateViewing: 'Request a Private Home Presentation',
    aboutIntro: 'Cameroonian Heritage & Vision',
    aboutParagraph1: 'Founded in Yaounde, Maison DollarD Bijoux stands proudly as the first elite high watchmaking and fine jewelry brand from Cameroon, designed for global connoisseurs.',
    aboutParagraph2: 'We fuse ancestral artistic virtuosity passed down through generations with the precision of high mechanical complications to craft objects of eternal inheritance.',
    craftSteps: [
      { title: 'Bespoke Design', desc: 'Each piece begins as an artistic sketch, pairing Central African motifs with contemporary minimalist design.' },
      { title: 'Ethical Sourcing', desc: 'Our gold and diamonds are sourced from 100% certified Cameroonian mines, preserving nature and dignity.' },
      { title: 'High Precision', desc: 'Our automatic calibers are engineered to meet the highest Swiss horological standards.' },
      { title: 'Gem Setting', desc: 'Each gemstone is micro-set and every case is hand-polished and hand-engraved in our private workshops.' }
    ],
    configuratorTitle: 'The Bespoke Virtual Atelier',
    configuratorSubtitle: 'Tailor-make your master timekeeper',
    dialColor: 'Dial Color',
    strapMetal: 'Case & Strap Metal',
    diamondsOpt: 'Diamond Sinking Option',
    diamondsNone: 'Classic index set diamonds',
    diamondsBezel: 'VVS Diamond bezel pave (+3,279,785 FCFA)',
    dialDeepBlue: 'Kribi Ocean Blue',
    dialVolcanic: 'Volcanic Basalt Black',
    dialChampagne: 'Imperial Champagne',
    metalRoseGold: '18k Rose Gold',
    metalPlatinum: '950 Polished Platinum',
    metalWhiteGold: 'Hand-chiseled White Gold',
    priceEstimate: 'Personalized Estimate',
    customOrderBtn: 'Commission this unique piece',
    filterAll: 'All Creations',
    filterWatch: 'Horology',
    filterJewelry: 'Jewelry',
    filterLimited: 'Limited Editions',
    readMore: 'Read Article',
    storiesTitle: 'The DollarD Journal',
    storiesSubtitle: 'Chronicles of luxury and workshop secrets',
    contactTitle: 'Request a Private Consultation',
    contactSubtitle: 'Our personal advisors respond globally within 24 hours',
    formName: 'Your Full Name',
    formEmail: 'Email Address',
    formPhone: 'Phone Number (with WhatsApp)',
    formInterest: 'Creation of interest',
    formMsg: 'Specify details (bespoke request, in-person meeting, delivery)',
    formSubmit: 'Submit Imperial Request',
    formSuccess: 'Your request has been filed with absolute distinction. Our concierge service will contact you shortly.',
    footerText: 'Maison DollarD Bijoux — Elite High Jewelry & Horology. Designed in Yaounde, appreciated and worn around the globe.',
    allRightsReserved: 'All rights reserved. Maison DollarD Bijoux',
  }
};
