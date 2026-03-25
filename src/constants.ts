import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  'Vapes',
  'Disposable Vapes',
  'Pod Systems',
  'E-liquids',
  'Accessories'
];

export const BRANDS = [
  'OXVA',
  'Vaporesso',
  'Uwell',
  'Voopoo',
  'GeekVape',
  'Smok'
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'OXVA Xlim Pro Pod Kit',
    price: 6500,
    originalPrice: 7500,
    category: 'Pod Systems',
    brand: 'OXVA',
    image: 'https://picsum.photos/seed/pod1/600/600',
    description: 'The OXVA Xlim Pro is the pro edition of the Xlim series product equipped with 1000mAh bigger battery & Top Fill Cartridge!',
    isTrending: true,
    isBestSeller: true,
    discount: 13,
    rating: 4.9,
    reviews: 124
  },
  {
    id: '2',
    name: 'Vaporesso XROS 3 Nano',
    price: 5800,
    originalPrice: 6500,
    category: 'Pod Systems',
    brand: 'Vaporesso',
    image: 'https://picsum.photos/seed/pod2/600/600',
    description: 'XROS 3 NANO is a stylish item with ergonomic design to show your style.',
    isTrending: true,
    discount: 10,
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    name: 'Uwell Caliburn G3',
    price: 6200,
    category: 'Pod Systems',
    brand: 'Uwell',
    image: 'https://picsum.photos/seed/pod3/600/600',
    description: 'The Caliburn G3 is the first G series pod system that supports 0.6 ohm, max 25W output power.',
    isBestSeller: true,
    rating: 4.7,
    reviews: 56
  },
  {
    id: '4',
    name: 'Voopoo Drag 4 Kit',
    price: 12500,
    originalPrice: 14000,
    category: 'Vapes',
    brand: 'Voopoo',
    image: 'https://picsum.photos/seed/vape1/600/600',
    description: 'DRAG 4 is the 4th Gen of VOOPOO DRAG IP in advanced MOD, features a timeless design combined with solid woody.',
    discount: 11,
    rating: 4.9,
    reviews: 42
  },
  {
    id: '5',
    name: '7 Daze Fusion - Strawberry Mango',
    price: 3500,
    category: 'E-liquids',
    brand: '7 Daze',
    image: 'https://picsum.photos/seed/liquid1/600/600',
    description: 'A delicious blend of sweet strawberries and tropical mango.',
    isTrending: true,
    rating: 4.6,
    reviews: 210
  },
  {
    id: '6',
    name: 'GeekVape Aegis Legend 2',
    price: 15500,
    category: 'Vapes',
    brand: 'GeekVape',
    image: 'https://picsum.photos/seed/vape2/600/600',
    description: 'Smaller and lighter, Geekvape L200 leaps with pride and honor.',
    rating: 5.0,
    reviews: 15
  }
];
