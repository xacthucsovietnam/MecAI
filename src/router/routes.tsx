import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy-loaded components for better performance
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const DigitalAuthListPage = lazy(() => import('../pages/DigitalAuth/List'));
const DigitalAuthCreatePage = lazy(() => import('../pages/DigitalAuth/Create'));
const DigitalAuthDetailsPage = lazy(() => import('../pages/DigitalAuth/Details'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

export const routes: RouteObject[] = [
  // Private routes (require authentication)
  {
    path: '/',
    element: <PrivateRoute element={<MainLayout />} />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'digital-auth',
        children: [
          {
            index: true,
            element: <DigitalAuthListPage />,
          },
          {
            path: 'create',
            element: <DigitalAuthCreatePage />,
          },
          {
            path: ':id',
            element: <DigitalAuthDetailsPage />,
          },
        ],
      },
    ],
  },
  
  // Public routes (accessible without authentication)
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <PublicRoute element={<LoginPage />} />,
      },
      {
        path: 'register',
        element: <PublicRoute element={<RegisterPage />} />,
      },
      {
        path: 'forgot-password',
        element: <PublicRoute element={<ForgotPasswordPage />} />,
      },
    ],
  },
  
  // Catch-all route for 404 errors
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes; 