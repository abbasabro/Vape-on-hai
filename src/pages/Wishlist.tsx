import React, { useState, useEffect } from 'react';
import { useWishlist } from '../components/WishlistProvider';
import { supabase } from '../supabase';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadProducts() {
      if (wishlist.length === 0) {
        setProducts([]);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', wishlist);

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data || []);
    }

    loadProducts();
  }, [wishlist]);

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} className="text-white/20" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">
            YOUR WISHLIST IS EMPTY
          </h1>
          <p className="text-white/50 mb-8">
            Save your favorite products here to keep an eye on them.
          </p>
          <Link
            to="/shop"
            className="inline-block px-10 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all"
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
        <h1 className="text-5xl font-black text-white mb-12">
          YOUR WISHLIST
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}