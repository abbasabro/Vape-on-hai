import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function StoreLocation() {
  return (
    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visit Us In Person</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-8">OUR FLAGSHIP STORE</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-tight mb-2">Location</h4>
                <p className="text-white/50 text-sm leading-relaxed">Shop #4, Saba Avenue, DHA Phase 5, Karachi, Pakistan</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <Clock size={24} className="text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-tight mb-2">Opening Hours</h4>
                <p className="text-white/50 text-sm leading-relaxed">Mon - Sat: 11:00 AM - 11:00 PM<br />Sun: 4:00 PM - 11:00 PM</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                <Phone size={24} className="text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-bold uppercase tracking-tight mb-2">Contact</h4>
                <p className="text-white/50 text-sm leading-relaxed">+92 300 1234567<br />info@vapeonhai.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[500px] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-cyan-500/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.503460456187!2d67.06554557537024!3d24.81244497796068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c6971572273%3A0x29cfc0a9c791d047!2sSaba%20Ave%2C%20DHA%20Phase%20V%20Ext%20Phase%205%20Defence%20Housing%20Authority%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711280000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
