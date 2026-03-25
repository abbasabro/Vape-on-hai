export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  image: string;
  description: string;
  isTrending?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Vapes' | 'Disposable Vapes' | 'Pod Systems' | 'E-liquids' | 'Accessories';
