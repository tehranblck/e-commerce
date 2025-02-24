export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  type: string;
  slug: string;
  quantity?: number;
  created_at?: string;
  updated_at?: string;
  token_placeholder: null | string;
  need_token: boolean;
  token?: string;
  colors: { id: number; code: string, name: string }[];
  sizes: { id: number; name: string }[];
  selectedColor?: number;
  selectedSize?: number;
}

export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
