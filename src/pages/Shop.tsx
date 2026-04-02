import React, { useState, useEffect } from 'react';
import { BRANDS } from '../constants';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import { Search, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products
  .filter(p => {
    const name = (p.name || '').toLowerCase();
    const brand = (p.brand || '').toLowerCase();
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      name.includes(search) ||
      brand.includes(search);

    const matchesCategory =
      !category || (p.category || '') === category;

    const matchesBrand =
      !selectedBrand || p.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  })
  .sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'best-selling') return (b.reviews || 0) - (a.reviews || 0);
    return 0;
  });
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2">
              THE SHOP
            </h1>
            <p className="text-white/50 font-medium tracking-widest uppercase text-xs">
              Showing {filteredProducts.length} Products
            </p>
          </div>

          {/* SEARCH + SORT */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">

            {/* SEARCH */}
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* SORT */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-zinc-900 border border-white/10 rounded-xl py-3 pl-6 pr-12 text-white font-bold uppercase tracking-widest text-xs focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
              >
                <option value="latest">Latest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="best-selling">Best Selling</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
            </div>

          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              No products found
            </h3>
            <p className="text-white/50">
              Try adjusting your search.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}