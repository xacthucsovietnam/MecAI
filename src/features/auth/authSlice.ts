import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: any | null; // Type this properly based on your user structure
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    setCredentials: (state, action: PayloadAction<{ token: string; user?: any }>) => {
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      state.token = token;
      state.isAuthenticated = true;
      if (user) {
        state.user = user;
      }
    },
  },
  extraReducers: (builder) => {
    // When login is successful, save the token
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.access_token;
        state.isAuthenticated = true;
        localStorage.setItem('token', payload.access_token);
      }
    );
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer; 