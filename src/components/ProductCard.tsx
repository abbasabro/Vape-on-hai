import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistProvider';
import { useCart } from './CartProvider';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden relative"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.discount && (
          <span className="bg-cyan-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
            -{product.discount}%
          </span>
        )}
        {product.isTrending && (
          <span className="bg-purple-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
            Trending
          </span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault(); // 🔥 important (prevents link click)
          toggleWishlist(product.id);
        }}
        className="absolute top-4 right-4 z-10 transition-colors"
      >
        <Heart
          size={20}
          className={
            isWishlisted(product.id)
              ? "text-red-500"
              : "text-white/30 hover:text-cyan-400"
          }
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-cyan-400 fill-cyan-400" />
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{product.rating} ({product.reviews})</span>
        </div>

        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">{product.brand}</p>
        <h3 className="text-lg font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-white/30 line-through font-medium">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-xl font-black text-white">Rs. {product.price.toLocaleString()}</span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:bg-cyan-400 transition-all shadow-lg shadow-white/5"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
