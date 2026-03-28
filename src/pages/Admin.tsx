import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function Admin() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const [products, setProducts] = useState<any[]>([]);

    const [form, setForm] = useState({
        name: '',
        price: '',
        brand: '',
        category: '',
        original_price: '',
        discount: '',
        description: '',
        rating: '',
        reviews: '',
        is_trending: false,
        is_best_seller: false
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            console.log("SESSION:", data.session);
        });
    }, []);

    // 🔐 Admin check
    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return navigate('/account');

            const { data } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', user.id)
                .single();

            if (!data?.is_admin) return navigate('/');

            setIsAdmin(true);
            setLoading(false);
        }

        checkAdmin();
    }, []);

    // 📦 Fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data } = await supabase.from('products').select('*');
        setProducts(data || []);
    }

    // 📸 Image upload
    const handleImageUpload = (e: any) => {
        if (e.target.files?.[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // ➕ Add product
    async function handleAddProduct() {


        try {
            let imageUrl = '';

            if (imageFile) {
                const fileName = `${Date.now()}-${imageFile.name}`;

                const { error } = await supabase.storage
                    .from('products')
                    .upload(fileName, imageFile);

                if (error) {
                    console.error("UPLOAD ERROR:", error);
                    toast.error("Image upload failed");
                    return; // 🚨 STOP EXECUTION
                }

                const { data } = supabase.storage
                    .from('products')
                    .getPublicUrl(fileName);

                imageUrl = data.publicUrl;
            }

            const { error } = await supabase.from('products').insert({
                name: form.name,
                price: Number(form.price),

                brand: form.brand || null,
                category: form.category || null,
                description: form.description || null,

                original_price: form.original_price ? Number(form.original_price) : null,
                discount: form.discount ? Number(form.discount) : null,

                rating: form.rating ? Number(form.rating) : 0,
                reviews: form.reviews ? Number(form.reviews) : 0,

                is_trending: form.is_trending,
                is_best_seller: form.is_best_seller,

                image: imageUrl
            });

            if (error) throw error;

            toast.success('Product added successfully 🚀');

            setForm({
                name: '',
                price: '',
                brand: '',
                category: '',
                original_price: '',
                discount: '',
                description: '',
                rating: '',
                reviews: '',
                is_trending: false,
                is_best_seller: false
            });

            setImageFile(null);

            fetchProducts();

        } catch (err) {
            toast.error('Failed to add product');
        }
    }

    // ❌ Delete
    async function deleteProduct(id: string) {
        const { error } = await supabase.from('products').delete().eq('id', id);

        if (error) {
            toast.error('Delete failed');
            return;
        }

        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Product deleted');
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                Loading admin...
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen pt-[140px] px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                <h1 className="text-5xl font-black text-white uppercase tracking-tight">
                    Admin Panel
                </h1>

                {/* 🔥 FORM */}
                <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-6 max-w-2xl">

                    {[
                        { key: 'name', placeholder: 'Product Name' },
                        { key: 'price', placeholder: 'Price' },
                        { key: 'brand', placeholder: 'Brand' },
                        { key: 'category', placeholder: 'Category' },
                        { key: 'original_price', placeholder: 'Original Price' },
                        { key: 'discount', placeholder: 'Discount %' }
                    ].map(field => (
                        <input
                            key={field.key}
                            placeholder={field.placeholder}
                            value={(form as any)[field.key]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition"
                        />
                    ))}

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                    />
                    <div className="grid grid-cols-2 gap-4">

                        {/* Rating */}
                        <input
                            placeholder="Rating (0-5)"
                            value={form.rating}
                            onChange={(e) => setForm({ ...form, rating: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 outline-none transition"
                        />

                        {/* Reviews */}
                        <input
                            placeholder="Reviews Count"
                            value={form.reviews}
                            onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 outline-none transition"
                        />

                    </div>


                    {/* Checkboxes */}
                    <div className="flex gap-6 pt-2">

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={form.is_trending}
                                onChange={(e) => setForm({ ...form, is_trending: e.target.checked })}
                                className="hidden"
                            />
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition 
      ${form.is_trending ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 group-hover:border-cyan-400'}
    `}>
                                {form.is_trending && (
                                    <div className="w-2 h-2 bg-black rounded-sm" />
                                )}
                            </div>
                            <span className="text-white/70 text-sm font-medium group-hover:text-white transition">
                                Trending
                            </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={form.is_best_seller}
                                onChange={(e) => setForm({ ...form, is_best_seller: e.target.checked })}
                                className="hidden"
                            />
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition 
                                ${form.is_best_seller ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 group-hover:border-cyan-400'}
                                `}>
                                {form.is_best_seller && (
                                    <div className="w-2 h-2 bg-black rounded-sm" />
                                )}
                            </div>
                            <span className="text-white/70 text-sm font-medium group-hover:text-white transition">
                                Best Seller
                            </span>
                        </label>

                    </div> <input type="file" onChange={handleImageUpload} className="text-white" />

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={handleAddProduct}
                        className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl shadow-lg shadow-cyan-500/20"
                    >
                        Add Product
                    </motion.button>
                </div>

                {/* 📦 PRODUCTS */}
                <div className="grid md:grid-cols-2 gap-6">
                    {products.map(p => (
                        <motion.div
                            key={p.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-zinc-900 border border-white/10 rounded-2xl p-6 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-white font-bold">{p.name}</p>
                                <p className="text-white/40 text-sm">Rs. {p.price}</p>
                            </div>

                            <button
                                onClick={() => deleteProduct(p.id)}
                                className="text-red-500 hover:text-red-400 transition"
                            >
                                Delete
                            </button>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}