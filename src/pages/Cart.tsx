import React from 'react';
import { useCart } from '../components/CartProvider';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-24 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} className="text-white/20" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">YOUR CART IS EMPTY</h1>
          <p className="text-white/50 mb-8">Looks like you haven't added anything to your cart yet. Start exploring our premium collection.</p>
          <Link 
            to="/shop" 
            className="inline-block px-10 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-cyan-500/20"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-12">YOUR CART</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-zinc-900/50 border border-white/5 rounded-3xl items-center"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1">{item.brand}</p>
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-white/50 text-sm font-medium">Rs. {item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4 bg-black/50 p-2 rounded-xl border border-white/5">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right min-w-[120px]">
                  <p className="text-xl font-black text-white">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500/50 hover:text-red-500 transition-colors mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="p-10 bg-zinc-900 rounded-3xl border border-white/10 sticky top-32">
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-8">ORDER SUMMARY</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Delivery</span>
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between text-2xl font-black text-white">
                  <span>Total</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
              >
                Checkout Now
                <ArrowRight size={20} />
              </Link>
              
              <p className="text-[10px] text-white/30 text-center mt-6 uppercase font-bold tracking-widest">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
