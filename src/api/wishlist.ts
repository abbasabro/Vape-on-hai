import { supabase } from '../supabase';

export async function addToWishlist(userId: string, productId: string) {
  return await supabase.from('wishlist').insert({
    user_id: userId,
    product_id: productId
  });
}

export async function removeFromWishlist(userId: string, productId: string) {
  return await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
}

export async function getWishlist(userId: string) {
  const { data, error } = await supabase
    .from('wishlist')
    .select('product_id, products(*)')
    .eq('user_id', userId);

  return data;
}