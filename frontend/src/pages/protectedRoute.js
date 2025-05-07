// pages/protectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('userEmail') === 'admin@gmail.com';
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
