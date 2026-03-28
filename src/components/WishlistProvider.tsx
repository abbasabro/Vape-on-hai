import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

interface WishlistItem {
  product_id: string;
}

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  // 🔹 Get user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // 🔹 Load wishlist from DB
  useEffect(() => {
    if (!user) return;

    async function loadWishlist() {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        console.error(error);
        return;
      }

      setWishlist(data.map((item: WishlistItem) => item.product_id));
    }

    loadWishlist();
  }, [user]);

  // 🔥 Toggle
  const toggleWishlist = async (productId: string) => {
    if (!user) {
      alert('Login first');
      return;
    }

    const exists = wishlist.includes(productId);

    if (exists) {
      await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      await supabase.from('wishlist').insert({
        user_id: user.id,
        product_id: productId
      });

      setWishlist(prev => [...prev, productId]);
    }
  };

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}