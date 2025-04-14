import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

// Create router with our routes
const router = createBrowserRouter(routes);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter; 