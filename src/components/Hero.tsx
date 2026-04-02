import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 md:pt-40 pb-20 flex items-center overflow-hidden bg-black">
      {/* Background with glow effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4"
          >
            Premium Vape Store in Karachi
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
            THE REAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">VAPE CULTURE</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Quality + Speed + Authenticity. Experience Karachi's most elite vape destination at Saba Avenue. Same-day delivery available.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center gap-3 group"
            >
              Shop Now
              <ShoppingBag size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="https://wa.me/923001234567" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-3"
            >
              Order via WhatsApp
              <MessageCircle size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          <img 
            src="https://images.unsplash.com/photo-1616065787198-a41b9ab94ef2?auto=format&fit=crop&w=800&q=80" 
            alt="Premium Vape Device" 
            className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
          />
          
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 z-20 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl"
          >
            <p className="text-cyan-400 font-black text-xl">100%</p>
            <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Authentic</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-6 -left-6 z-20 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl"
          >
            <p className="text-purple-400 font-black text-xl">FAST</p>
            <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Delivery</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
