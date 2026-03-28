import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrders() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/account');
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select(`*,order_items (*)`).eq('user_id', user.id).order('created_at', { ascending: false });

            if (error) {
                toast.error("Something went wrong");
            } else {
                setOrders(data);
            }

            setLoading(false);
        }


        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse space-y-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-zinc-900 rounded-2xl" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                No orders found
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen pt-24 px-6">
            <h1 className="text-4xl font-black text-white mt-10 mb-10 uppercase">
                Your Orders
            </h1>

            <div className="space-y-8">
                {orders.map(order => (
                    <div key={order.id} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8">

                        {/* Top */}
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                            <div>
                                <p className="text-white font-black text-lg">
                                    Order #{order.id.slice(0, 6)}
                                </p>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                                    {new Date(order.created_at).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                    order.status === 'pending' && "bg-yellow-500/20 text-yellow-400",
                                    order.status === 'delivered' && "bg-green-500/20 text-green-400"
                                )}>
                                    {order.status}
                                </span>

                                <span className="text-white font-black text-xl">
                                    Rs. {order.total_amount.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-4">
                            {order.order_items.map((item: any) => (
                                <div key={item.id} className="flex items-center justify-between border-t border-white/5 pt-4">

                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-zinc-800 rounded-xl overflow-hidden">
                                            <img
                                                src={item.image || '/placeholder.png'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-white font-bold text-sm">{item.name}</p>
                                            <p className="text-white/40 text-xs uppercase tracking-widest">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-white font-bold text-sm">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}