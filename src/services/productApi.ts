import { apiSlice } from './apiSlice';
import { Product, ProductApiResponse } from '../features/product/productSlice';

// Define the search parameters interface based on the API requirements
export interface ProductSearchParams {
  ten?: string;
  tenNhom?: string;
  tenNhomChinh?: string;
}

// Define the search request structure
export interface ProductSearchRequest {
  data: ProductSearchParams;
}

// Define the Product search response structure
export interface ProductSearchResponse {
  products: Product[];
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Public product search endpoint
    searchProducts: builder.mutation<ProductApiResponse, ProductSearchParams>({
      query: (params) => ({
        url: '/services/wcbcore_PublicApiService/searchListProduct',
        method: 'POST',
        body: { data: params },
      }),
    }),
    
    // Authenticated product search endpoint
    searchProductsAuth: builder.mutation<ProductApiResponse, ProductSearchParams>({
      query: (params) => ({
        url: '/services/wcbcore_PublicApiService/searchListPrAuthen',
        method: 'POST',
        body: { data: params },
      }),
    }),
  }),
});

export const { 
  useSearchProductsMutation,
  useSearchProductsAuthMutation
} = productApi; 