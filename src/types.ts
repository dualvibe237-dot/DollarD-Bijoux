export type Language = 'FR' | 'EN';
export type Theme = 'dark' | 'light';

export interface Product {
  id: string;
  name: {
    FR: string;
    EN: string;
  };
  description: {
    FR: string;
    EN: string;
  };
  category: 'watch' | 'jewelry' | 'limited';
  categoryLabel: {
    FR: string;
    EN: string;
  };
  price: number;
  metal: {
    FR: string;
    EN: string;
  };
  stone?: {
    FR: string;
    EN: string;
  };
  image: string;
  rating: number;
  specifications: {
    FR: string[];
    EN: string[];
  };
  limitedEdition: boolean;
  isNew: boolean;
  ref: string;
}

export interface Collection {
  id: string;
  name: {
    FR: string;
    EN: string;
  };
  slogan: {
    FR: string;
    EN: string;
  };
  description: {
    FR: string;
    EN: string;
  };
  image: string;
  quote: {
    FR: string;
    EN: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  role: {
    FR: string;
    EN: string;
  };
  text: {
    FR: string;
    EN: string;
  };
  rating: number;
}

export interface Story {
  id: string;
  title: {
    FR: string;
    EN: string;
  };
  category: {
    FR: string;
    EN: string;
  };
  readTime: string;
  date: string;
  image: string;
  summary: {
    FR: string;
    EN: string;
  };
  content: {
    FR: string[];
    EN: string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizedDial?: string;
  customizedStrap?: string;
}
