// change or modify the types as your requirement

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  aboutItem?: string[];
  price: number;
  discount: number;
  rating: number;
  reviews?: Review[];
  brand?: string;
  color?: string[];
  colors?: string[];
  stock: number;
  stockItems?: number;
  images: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Review = {
  author: string;
  image: string;
  content: string;
  rating:number
  date: Date;
};

export type SearchParams = {
  page: string;
  category: string;
  brand: string;
  search: string;
  min: string;
  max: string;
  color: string;
};

export type CartItem = Product & {
  selectedColor: string;
  quantity: number;
};
