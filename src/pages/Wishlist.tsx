import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('vape_on_hai_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} className="text-white/20" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">YOUR WISHLIST IS EMPTY</h1>
          <p className="text-white/50 mb-8">Save your favorite products here to keep an eye on them. Start exploring our premium collection.</p>
          <Link 
            to="/shop" 
            className="inline-block px-10 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-cyan-500/20"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-12">YOUR WISHLIST</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
