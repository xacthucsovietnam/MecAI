import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { API_URL } from '../config';

// Base URL from the Postman collection
const baseUrl = API_URL;

export const apiSlice = createApi({
  reducerPath: '/api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the state
      const token = (getState() as RootState).auth.token;
      
      // If we have a token, set it in the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: () => ({}),
}); 