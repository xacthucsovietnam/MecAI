import { apiSlice } from './apiSlice';

interface ProductSearchParams {
  tenNhom?: string;
  tenNhomChinh?: string;
  ten?: string;
}

interface ProductSearchRequest {
  data: ProductSearchParams;
}

interface Product {
  id: string;
  ten: string;
  tenNhom: string;
  tenNhomChinh: string;
  // Add other fields as needed based on the actual response
}

interface ProductSearchResponse {
  // Define response structure based on actual API response
  products: Product[];
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Public product search endpoint (no auth required)
    searchProducts: builder.mutation<ProductSearchResponse, ProductSearchParams>({
      query: (params) => ({
        url: '/services/wcbcore_PublicApiService/searchListProduct',
        method: 'POST',
        body: { data: params },
      }),
    }),
    
    // Authenticated product search endpoint
    searchProductsAuth: builder.mutation<ProductSearchResponse, ProductSearchParams>({
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