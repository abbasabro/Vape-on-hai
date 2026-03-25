import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const REVIEWS = [
  {
    name: "Ahmed Khan",
    role: "Verified Buyer",
    text: "The best vape store in Karachi. Authentic products and the delivery was super fast. Highly recommended!",
    rating: 5
  },
  {
    name: "Sara Malik",
    role: "Cloud Chaser",
    text: "Finally found a store that actually stocks original OXVA pods. Saba Avenue branch is my go-to spot now.",
    rating: 5
  },
  {
    name: "Zain Ali",
    role: "Tech Enthusiast",
    text: "Great customer service. They helped me choose the right pod system for my needs. Very professional team.",
    rating: 5
  }
];

export default function Reviews() {
  return (
    <section className="py-24 px-4 md:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Customer Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">WHAT THEY SAY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-3xl bg-black border border-white/5 relative group hover:border-cyan-500/30 transition-all"
            >
              <Quote size={40} className="text-cyan-500/10 absolute top-8 right-8 group-hover:text-cyan-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-cyan-400 fill-cyan-400" />
                ))}
              </div>

              <p className="text-white/70 text-lg italic leading-relaxed mb-8">
                "{review.text}"
              </p>

              <div>
                <h4 className="text-white font-bold uppercase tracking-tight">{review.name}</h4>
                <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
