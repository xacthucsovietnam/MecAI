import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

interface PublicRouteProps {
  element: React.ReactNode;
  restrictAuthenticated?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ 
  element, 
  restrictAuthenticated = true 
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/';

  // If authenticated and this route should redirect authenticated users,
  // redirect to the page they came from or to the dashboard
  if (isAuthenticated && restrictAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // Otherwise, render the public component
  return <>{element}</>;
};

export default PublicRoute; 