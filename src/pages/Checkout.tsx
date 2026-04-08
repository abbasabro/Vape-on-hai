import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartProvider';
import { supabase } from '../supabase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck } from 'lucide-react';

const DELIVERY_FEE = 200;

const checkoutSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  apartment: z.string().optional(),
  city: z.string().min(2),
  postalCode: z.string().optional()
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartTotal + DELIVERY_FEE;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: 'Karachi'
    }
  });

  useEffect(() => {
    if (cart.length === 0) navigate('/orders');
  }, [cart]);


  // ONLY REPLACE YOUR onSubmit FUNCTION WITH THIS

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first");
        return;
      }

      // ✅ STEP 1 — CHECK + UPDATE STOCK (ONLY ONCE)
      for (const item of cart) {
        const { data: product, error } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.id)
          .single();

        if (error || !product) {
          toast.error("Product not found");
          return;
        }

        if ((product.stock || 0) < item.quantity) {
          toast.error(`${item.name} is out of stock`);
          return;
        }

        const { data: updated, error: updateError } = await supabase
          .from('products')
          .update({
            stock: product.stock - item.quantity
          })
          .eq('id', item.id)
          .select();

        console.log("UPDATE RESULT:", updated);
        console.log("UPDATE ERROR:", updateError);
      }

      const fullName = `${data.firstName || ''} ${data.lastName}`.trim();

      // ✅ STEP 2 — CREATE ORDER
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          full_name: fullName,
          email: data.email,
          phone: data.phone,
          address: `${data.address} ${data.apartment || ''}`,
          city: data.city,
          total_amount: total,
          payment_method: 'cod'
        })
        .select()
        .single();

      if (error || !order) {
        toast.error("Order creation failed");
        return;
      }

      // ✅ STEP 3 — INSERT ITEMS
      const items = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(items);

      if (itemsError) {
        toast.error("Order items failed");
        return;
      }

      toast.success('Order placed successfully 🚀');

      clearCart();
      navigate('/orders');

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-black min-h-screen pt-[140px] pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-10">

          <h1 className="text-5xl font-black text-white uppercase tracking-tight">
            Checkout
          </h1>

          {/* DELIVERY */}
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-6">

            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Delivery — Pakistan
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <input {...register('firstName')} placeholder="First name (optional)"
                className="input" />
              <input {...register('lastName')} placeholder="Last name"
                className="input" />
            </div>

            <input {...register('address')} placeholder="Address"
              className="input" />

            <input {...register('apartment')} placeholder="Apartment, suite (optional)"
              className="input" />

            <div className="grid md:grid-cols-2 gap-6">
              <input {...register('city')} placeholder="City" className="input" />
              <input {...register('postalCode')} placeholder="Postal code (optional)" className="input" />
            </div>

            <input {...register('phone')} placeholder="Phone"
              className="input" />

            <input {...register('email')} placeholder="Email"
              className="input" />

            {/* ERRORS */}
            {Object.values(errors).map((err, i) => (
              <p key={i} className="text-red-500 text-xs">{err?.message}</p>
            ))}

          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-xl shadow-xl hover:bg-white transition disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : `Complete Purchase — Rs. ${total}`}
          </motion.button>
        </form>

        {/* SUMMARY */}
        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 h-fit sticky top-32">

          <h3 className="text-2xl font-black text-white mb-8 uppercase">
            Your Order
          </h3>

          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-white/70 text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>Rs. {(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>Rs. {cartTotal}</span>
            </div>

            <div className="flex justify-between text-white/60">
              <span>Delivery</span>
              <span>Rs. {DELIVERY_FEE}</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} /> Authentic products
            </div>
            <div className="flex items-center gap-2">
              <Truck size={14} /> Fast delivery
            </div>
          </div>

        </div>

      </div>

      {/* GLOBAL INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 16px;
          color: white;
          outline: none;
          transition: 0.2s;
        }
        .input:focus {
          border-color: #06b6d4;
        }
      `}</style>
    </div>
  );
}