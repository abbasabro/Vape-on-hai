import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import BrandShowcase from '../components/BrandShowcase';
import ValueProp from '../components/ValueProp';
import VapeCulture from '../components/VapeCulture';
import Reviews from '../components/Reviews';
import StoreLocation from '../components/StoreLocation';
import { PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Home() {
  const trendingProducts = PRODUCTS.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="bg-black">
      <Hero />
      <BrandShowcase />
      <CategoryGrid />
      
      {/* Trending Section */}
      <section className="py-24 px-4 md:px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-purple-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Hot Right Now</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">TRENDING PRODUCTS</h2>
            </div>
            <Link to="/shop" className="text-white/50 hover:text-cyan-400 font-bold uppercase tracking-widest text-sm transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ValueProp />

      {/* Best Sellers Section */}
      <section className="py-24 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Customer Favorites</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">BEST SELLERS</h2>
            </div>
            <Link to="/shop" className="text-white/50 hover:text-cyan-400 font-bold uppercase tracking-widest text-sm transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <VapeCulture />
      <Reviews />
      <StoreLocation />

      {/* Final CTA */}
      <section className="py-32 px-4 md:px-8 bg-gradient-to-b from-black to-zinc-900 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] z-0" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 uppercase leading-none">
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">LEVEL UP?</span>
          </h2>
          <p className="text-white/60 text-xl mb-12">
            Order now and get same-day delivery in Karachi. Authentic products, elite service, guaranteed satisfaction.
          </p>
          <Link 
            to="/shop" 
            className="inline-block px-12 py-6 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-cyan-500/20"
          >
            Shop Now – Same Day Delivery
          </Link>
        </div>
      </section>
    </div>
  );
}
