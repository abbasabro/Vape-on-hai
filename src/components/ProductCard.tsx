import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
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
      {/* BADGES */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">

        {product.stock === 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            OUT OF STOCK
          </span>
        )}


        {product.isTrending && (
          <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">
            TRENDING
          </span>
        )}

        {product.isBestSeller && (
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            BEST SELLER
          </span>
        )}
      </div>

      {/* WISHLIST */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-4 right-4 z-10"
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

      {/* IMAGE */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-cyan-400 fill-cyan-400" />
          <span className="text-xs text-white/50">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <p className="text-xs text-cyan-400 uppercase mb-1">{product.brand}</p>

        <h3 className="text-lg font-bold text-white mb-4">
          {product.name}
        </h3>

        <div className="flex justify-between items-center">

          <div>
            {product.originalPrice && (
              <p className="text-xs text-white/30 line-through">
                Rs. {product.originalPrice}
              </p>
            )}
            <p className="text-xl font-bold text-white">
              Rs. {product.price}
            </p>
          </div>

          <button
            disabled={product.stock === 0}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              product.stock === 0
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-white hover:bg-cyan-400'
            }`}
          >
            <ShoppingCart 
            size={18}
            className={product.stock === 0 ? "text-white/50" : "text-black"} 
            />
          </button>

        </div>
      </div>
    </motion.div>
  );
}