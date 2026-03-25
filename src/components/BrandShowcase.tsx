import React from 'react';
import { BRANDS } from '../constants';
import { motion } from 'motion/react';

export default function BrandShowcase() {
  return (
    <section className="py-20 bg-zinc-950 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center">
        <span className="text-white/30 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Trusted By Vapers</span>
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">ELITE BRANDS WE STOCK</h2>
      </div>

      <div className="flex overflow-hidden group">
        <div className="flex gap-12 md:gap-24 animate-marquee whitespace-nowrap py-4">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div 
              key={`${brand}-${index}`}
              className="text-4xl md:text-6xl font-black text-white/10 hover:text-cyan-400/50 transition-colors cursor-default uppercase tracking-tighter"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
}
