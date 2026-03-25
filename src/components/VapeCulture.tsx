import React from 'react';
import { motion } from 'motion/react';

export default function VapeCulture() {
  return (
    <section className="relative py-32 px-4 md:px-8 overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/vape-culture/1920/1080?grayscale" 
          alt="Vape Culture" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 font-bold tracking-[0.4em] uppercase text-xs mb-6 block"
          >
            Inspired by Karachi Vapers
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8 uppercase"
          >
            THE REAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">LIFESTYLE</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-10"
          >
            Vaping isn't just a habit; it's a statement. At Vape On Hai, we don't just sell products—we cultivate the elite vape culture of Karachi. Join the movement of authentic vapers who demand nothing but the best.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex gap-8 items-center"
          >
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">10K+</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Community Members</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">500+</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Premium Products</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full hidden lg:block"
      />
    </section>
  );
}
