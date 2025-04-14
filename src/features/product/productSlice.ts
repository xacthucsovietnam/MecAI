import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productApi } from '../../services/productApi';

// Define the Product interface based on the API response structure
export interface Product {
  id: string;
  seoUrl?: string;
  hinhAnh?: string;
  tenNhom: string;
  tenNhomChinh: string;
  ma?: string;
  ten: string;
  tenDonViTinh?: string;
  giaTruocKm?: number;
  giaBan?: number;
  moTa?: string;
  noiDung?: string;
}

// Define the search parameters interface
export interface ProductSearchParams {
  tenNhom?: string;
  tenNhomChinh?: string;
  ten?: string;
}

// Define the API response structure
export interface ProductApiResponse {
  result: Product[];
  code: number;
  sign?: string;
  message: string;
}

// Define the product state interface
interface ProductState {
  publicProducts: Product[];
  authProducts: Product[];
  searchParams: ProductSearchParams;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  publicProducts: [],
  authProducts: [],
  searchParams: {},
  isLoading: false,
  error: null
};

// Create the product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<ProductSearchParams>) => {
      state.searchParams = action.payload;
    },
    clearProducts: (state) => {
      state.publicProducts = [];
      state.authProducts = [];
    }
  },
  extraReducers: (builder) => {
    // Handle public product search results
    builder.addMatcher(
      productApi.endpoints.searchProducts.matchFulfilled,
      (state, { payload }) => {
        state.publicProducts = payload.result || [];
        state.isLoading = false;
        state.error = null;
      }
    );
    
    // Handle authorized product search results
    builder.addMatcher(
      productApi.endpoints.searchProductsAuth.matchFulfilled,
      (state, { payload }) => {
        state.authProducts = payload.result || [];
        state.isLoading = false;
        state.error = null;
      }
    );
    
    // Handle pending states
    builder.addMatcher(
      productApi.endpoints.searchProducts.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    
    builder.addMatcher(
      productApi.endpoints.searchProductsAuth.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    
    // Handle error states
    builder.addMatcher(
      productApi.endpoints.searchProducts.matchRejected,
      (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Failed to fetch products';
      }
    );
    
    builder.addMatcher(
      productApi.endpoints.searchProductsAuth.matchRejected,
      (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Failed to fetch authenticated products';
      }
    );
  }
});

export const { setSearchParams, clearProducts } = productSlice.actions;
export default productSlice.reducer; 