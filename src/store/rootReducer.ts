import { combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  product: productReducer,
  // Add other reducers here as your application grows
}); 