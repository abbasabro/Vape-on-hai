import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white">VAPE ON HAI</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">Saba Avenue</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Karachi's premier destination for high-end vaping products. We bring the elite vape culture to Saba Avenue with authentic products and expert service.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-cyan-400">Shop Categories</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/category/vapes" className="hover:text-white transition-colors">Vapes</Link></li>
            <li><Link to="/category/disposable-vapes" className="hover:text-white transition-colors">Disposable Vapes</Link></li>
            <li><Link to="/category/pod-systems" className="hover:text-white transition-colors">Pod Systems</Link></li>
            <li><Link to="/category/e-liquids" className="hover:text-white transition-colors">E-liquids</Link></li>
            <li><Link to="/category/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-cyan-400">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
            <li><Link to="/shipping-info" className="hover:text-white transition-colors">Shipping Info</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-cyan-400">Contact Info</h4>
          <ul className="space-y-6 text-sm text-white/60">
            <li className="flex gap-4">
              <MapPin size={20} className="text-cyan-500 shrink-0" />
              <span>Shop #4, Saba Avenue, DHA Phase 5, Karachi, Pakistan</span>
            </li>
            <li className="flex gap-4">
              <Phone size={20} className="text-cyan-500 shrink-0" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex gap-4">
              <Mail size={20} className="text-cyan-500 shrink-0" />
              <span>info@vapeonhai.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Vape On Hai (Saba Avenue). All rights reserved.
        </p>
        <div className="flex gap-6 grayscale opacity-50">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
        </div>
      </div>
    </footer>
  );
}
