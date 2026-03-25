import React from 'react';
import { ShieldCheck, Truck, Zap, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

const PROPS = [
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    desc: "We source directly from official distributors. No clones, ever."
  },
  {
    icon: Truck,
    title: "Same-Day Delivery",
    desc: "Order before 6 PM for same-day delivery across Karachi."
  },
  {
    icon: Zap,
    title: "Wide Variety",
    desc: "From pods to mods, we stock the latest tech in the industry."
  },
  {
    icon: Headphones,
    title: "Expert Support",
    desc: "Our team consists of veteran vapers ready to help you."
  }
];

export default function ValueProp() {
  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Why Vape On Hai?</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">THE ELITE EXPERIENCE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROPS.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                <prop.icon size={28} className="text-cyan-400 group-hover:text-black transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{prop.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{prop.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
