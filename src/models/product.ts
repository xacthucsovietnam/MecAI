export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  mainCategory: string;
  imageUrl?: string;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductSearchParams {
  name?: string;
  category?: string;
  mainCategory?: string;
  page?: number;
  pageSize?: number;
} 