import { apiSlice } from './apiSlice';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/oauth/token',
        method: 'POST',
        headers: {
          'Authorization': 'Basic Y2xpZW50OnNlY3JldA==', // Basic auth header from Postman collection
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: credentials.username,
          password: credentials.password,
        }).toString(),
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi; 