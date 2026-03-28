import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, Zap, Star, ChevronLeft } from 'lucide-react';
import { useCart } from '../components/CartProvider';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../components/WishlistProvider';
import { removeFromWishlist, addToWishlist, getWishlist } from '../api/wishlist';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  
  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setProduct(data);

        if (data) {
          const { data: related, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category', data.category)
            .neq('id', data.id)
            .limit(4);

          if (relatedError) console.error(relatedError);

          setRelatedProducts(related || []);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }

    }

    if (id) fetchProduct();


  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading product...
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">PRODUCT NOT FOUND</h1>
          <Link to="/shop" className="text-cyan-400 font-bold uppercase tracking-widest underline underline-offset-4">Back to Shop</Link>
        </div>
      </div>
    );
  }




  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors font-bold uppercase tracking-widest text-xs mb-12">
          <ChevronLeft size={16} />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              {product.discount && (
                <span className="absolute top-8 left-8 bg-cyan-500 text-black text-xs font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-2xl">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={cn(i < Math.floor(product.rating) ? "text-cyan-400 fill-cyan-400" : "text-white/10")} />
                ))}
              </div>
              <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{product.reviews} Customer Reviews</span>
            </div>

            <p className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm mb-2">{product.brand}</p>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">{product.name}</h1>

            <div className="flex items-end gap-4 mb-10">
              <span className="text-4xl font-black text-white">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/30 line-through font-bold mb-1">Rs. {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => addToCart(product)}
                className="flex-grow md:flex-none px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
              >
                Add to Cart
                <ShoppingCart size={20} />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400 transition-all">
                <Heart
                  size={24}
                  className={isWishlisted(product.id) ? "text-red-500" : "text-white/50"} />
              </button>
              <button
                onClick={handleShare}
                className="w-16 h-16 border border-white/10 rounded-2xl flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400 transition-all">
                <Share2 size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10">
              <div className="flex items-center gap-4">
                <ShieldCheck size={24} className="text-cyan-500" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">100% Authentic</span>
              </div>
              <div className="flex items-center gap-4">
                <Truck size={24} className="text-cyan-500" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Same-Day Delivery</span>
              </div>
              <div className="flex items-center gap-4">
                <Zap size={24} className="text-cyan-500" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Premium Quality</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">You May Also Like</span>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">RELATED PRODUCTS</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
