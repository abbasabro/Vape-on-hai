import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../constants';
import { useCart } from './CartProvider';

import { supabase } from '../supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-3xl">
              <input 
                autoFocus
                type="text" 
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/10 py-8 text-3xl md:text-5xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-cyan-500 transition-colors uppercase tracking-tighter"
              />
              <p className="mt-6 text-white/30 text-xs font-bold uppercase tracking-widest">Press Enter to Search</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="bg-black text-white text-[10px] md:text-xs py-2 px-4 text-center font-medium tracking-wider uppercase border-b border-white/10 relative z-50">
          Same-Day Delivery in Karachi • Authentic Products Guaranteed • Discounts Available
        </div>
        <nav 
          className={cn(
            "transition-all duration-300 px-4 md:px-8 py-4 flex items-center justify-between",
            isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-3" : "bg-transparent"
          )}
        >
          <div className="flex items-center gap-8">
            <Link to="/" className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">VAPE ON HAI</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase leading-none mt-1">Saba Avenue</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {CATEGORIES.map((cat) => (
                <Link 
                  key={cat} 
                  to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                  className="text-sm font-medium text-white/70 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-white/70 hover:text-cyan-400 transition-colors"
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="text-white/70 hover:text-cyan-400 transition-colors hidden sm:block">
              <Heart size={20} />
            </Link>
            <Link to="/account" className="text-white/70 hover:text-cyan-400 transition-colors hidden sm:flex items-center gap-2">
              <User size={20} />
              {user && <span className="text-[10px] font-bold uppercase tracking-widest max-w-[80px] truncate">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>}
            </Link>
            <Link to="/cart" className="text-white/70 hover:text-cyan-400 transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to="/" className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white">VAPE ON HAI</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">Saba Avenue</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {CATEGORIES.map((cat) => (
                <Link 
                  key={cat} 
                  to={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                  className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest"
                >
                  {cat}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-4" />
              <Link to="/account" className="text-xl font-medium text-white/70 flex items-center gap-4">
                <User size={24} /> My Account
              </Link>
              <Link to="/wishlist" className="text-xl font-medium text-white/70 flex items-center gap-4">
                <Heart size={24} /> Wishlist
              </Link>
            </div>

            <div className="mt-auto pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-4">Visit our store in DHA Phase 5</p>
              <p className="text-white font-bold">Saba Avenue, Karachi</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
