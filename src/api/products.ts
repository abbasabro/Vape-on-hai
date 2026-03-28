// src/api/products.ts
import { supabase } from '../supabase';

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}