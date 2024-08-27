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
}

export interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}
