import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, Truck, ShieldCheck } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(10, 'Full address is required'),
  city: z.string().min(3, 'City is required'),
  paymentMethod: z.enum(['cod', 'card']),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cod',
      city: 'Karachi'
    }
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, [cart, navigate]);

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-black min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-12">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <section>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm">1</span>
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Full Name</label>
                    <input 
                      {...register('fullName')}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Email Address</label>
                    <input 
                      {...register('email')}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Phone Number</label>
                    <input 
                      {...register('phone')}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="+92 300 1234567"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.phone.message}</p>}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm">2</span>
                  Shipping Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Full Address</label>
                    <textarea 
                      {...register('address')}
                      rows={3}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      placeholder="Street, Area, Phase..."
                    />
                    {errors.address && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.address.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest">City</label>
                    <input 
                      {...register('city')}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      placeholder="Karachi"
                    />
                    {errors.city && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.city.message}</p>}
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center text-sm">3</span>
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      {...register('paymentMethod')} 
                      value="cod" 
                      className="hidden peer"
                    />
                    <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl peer-checked:border-cyan-500 transition-all flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                        <Truck size={20} className="text-white/50 group-hover:text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold uppercase tracking-tight">Cash on Delivery</p>
                        <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Pay when you receive</p>
                      </div>
                    </div>
                  </label>

                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      {...register('paymentMethod')} 
                      value="card" 
                      className="hidden peer"
                    />
                    <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl peer-checked:border-cyan-500 transition-all flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                        <CreditCard size={20} className="text-white/50 group-hover:text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold uppercase tracking-tight">Credit / Debit Card</p>
                        <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Secure online payment</p>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing Order...' : 'Complete Purchase'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-10 bg-zinc-900 rounded-3xl border border-white/10 sticky top-32">
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-8">YOUR ORDER</h3>
              
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-bold text-white">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Delivery</span>
                  <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between text-2xl font-black text-white">
                  <span>Total</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-6 bg-black/50 rounded-2xl border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-cyan-500" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Authentic Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-cyan-500" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Same-Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
