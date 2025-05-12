import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated) {
    console.log('PrivateRoute: Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('PrivateRoute: Authenticated, rendering protected content');
  return children ? children : <Outlet />;
};

export default PrivateRoute;
