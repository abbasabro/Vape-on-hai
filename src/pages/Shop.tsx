import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES, BRANDS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('latest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesBrand = !selectedBrand || p.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'best-selling') return b.reviews - a.reviews;
    return 0; // Default latest
  });

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2">THE SHOP</h1>
            <p className="text-white/50 font-medium tracking-widest uppercase text-xs">Showing {filteredProducts.length} Products</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
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
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 rounded-xl text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <div className="relative group">
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

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-6">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        !selectedCategory ? "bg-cyan-500 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                      )}
                    >
                      All
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                          selectedCategory === cat ? "bg-cyan-500 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-6">Brands</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSelectedBrand(null)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        !selectedBrand ? "bg-cyan-500 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                      )}
                    >
                      All
                    </button>
                    {BRANDS.map(brand => (
                      <button 
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                          selectedBrand === brand ? "bg-cyan-500 text-black" : "bg-white/5 text-white/50 hover:bg-white/10"
                        )}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-end">
                  <button 
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                      setSearchQuery('');
                    }}
                    className="text-white/30 hover:text-white text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">No products found</h3>
            <p className="text-white/50">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
