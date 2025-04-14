import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import NotFound from '../pages/NotFound';

// Lazy-loaded components for better performance
const LoginPage = lazy(() => import('../pages/Login'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const PublicProductListPage = lazy(() => import('../pages/Products/Public'));
const AuthProductListPage = lazy(() => import('../pages/Products/Auth'));

// Loading component for lazy-loaded routes
const Loading = () => (
  <div className="global-loading">
    <div className="spinner"></div>
  </div>
);

// Wrap lazy component with Suspense
const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  // Main layout routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(PublicProductListPage),
      },
      {
        path: 'products/public',
        element: withSuspense(PublicProductListPage),
      },
      // Authenticated products route
      {
        path: 'products/auth',
        element: <PrivateRoute element={withSuspense(AuthProductListPage)} />,
      },
    ],
  },
  
  // Dashboard routes (all require authentication)
  {
    path: '/dashboard',
    element: <PrivateRoute element={<MainLayout />} />,
    children: [
      {
        index: true,
        element: withSuspense(DashboardPage),
      },
    ],
  },
  
  // Authentication routes
  {
    path: '/login',
    element: <PublicRoute element={<AuthLayout />} restrictAuthenticated={true} />,
    children: [
      {
        index: true,
        element: withSuspense(LoginPage),
      },
    ],
  },
  
  // Catch-all route for 404 errors
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes; 