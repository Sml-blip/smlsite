import { supabase } from './supabase';
import { Product } from '@/types';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    images: product.images || [product.image],
    description: product.description || '',
    category: product.category,
    brand: product.brand || 'Generic',
    rating: product.rating || 5,
    discount: product.discount || 0,
    stock: product.stock || 0,
    stockItems: product.stock || 0,
    color: product.colors || [],
    aboutItem: [],
    reviews: []
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    console.error('Error fetching product:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    price: data.price,
    images: data.images || [data.image],
    description: data.description || '',
    category: data.category,
    brand: data.brand || 'Generic',
    rating: data.rating || 5,
    discount: data.discount || 0,
    stock: data.stock || 0,
    stockItems: data.stock || 0,
    color: data.colors || [],
    aboutItem: [],
    reviews: []
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    images: product.images || [product.image],
    description: product.description || '',
    category: product.category,
    brand: product.brand || 'Generic',
    rating: product.rating || 5,
    discount: product.discount || 0,
    stock: product.stock || 0,
    stockItems: product.stock || 0,
    color: product.colors || [],
    aboutItem: [],
    reviews: []
  }));
}

export async function getCategories(): Promise<Map<string, Product[]>> {
  const products = await getProducts();
  const map = new Map<string, Product[]>();

  products.forEach((product) => {
    const cat = product.category;
    if (!map.has(cat)) {
      map.set(cat, []);
    }
    map.get(cat)?.push(product);
  });

  return map;
}
