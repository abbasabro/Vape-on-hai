import React, { useState, useEffect } from 'react';
import { supabase, signInWithGoogle, logout } from '../supabase';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, LogOut, User as UserIcon, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Successfully signed in!');
      navigate('/shop');
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.info('Signed out successfully.');
    } catch (error) {
      toast.error('Failed to sign out.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />
          
          {user ? (
            <>
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-2 border-cyan-500 p-1">
                <img src={user.user_metadata?.avatar_url || ''} alt={user.user_metadata?.full_name || ''} className="w-full h-full rounded-full object-cover" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">WELCOME BACK</h1>
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-8">{user.user_metadata?.full_name || user.email}</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/shop')}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-3"
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full py-4 bg-transparent border border-white/10 text-white/50 font-bold uppercase tracking-widest hover:text-red-500 hover:border-red-500/30 transition-all flex items-center justify-center gap-3"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <UserIcon size={40} className="text-cyan-400" />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">JOIN THE CULTURE</h1>
              <p className="text-white/50 text-sm mb-10 leading-relaxed">
                Sign in to track your orders, save your wishlist, and get exclusive member-only discounts.
              </p>

              <button 
                onClick={handleLogin}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-white/5"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                Sign in with Google
              </button>

              <div className="mt-10 pt-10 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-cyan-500" />
                  Secure Login
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  <Mail size={14} className="text-cyan-500" />
                  No Spam
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
