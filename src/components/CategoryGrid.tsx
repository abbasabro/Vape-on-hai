import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';

export default function CategoryGrid() {
  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Browse Our Collection</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">SHOP BY CATEGORY</h2>
          </div>
          <Link to="/shop" className="text-white/50 hover:text-cyan-400 font-bold uppercase tracking-widest text-sm transition-colors">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative h-[300px] overflow-hidden rounded-3xl border border-white/5",
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              )}
            >
              <img 
                src={`https://picsum.photos/seed/${cat.toLowerCase().replace(/ /g, '-')}/800/600`} 
                alt={cat} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-black text-white tracking-tighter mb-2 uppercase">{cat}</h3>
                <Link 
                  to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                  className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em] hover:text-white transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
