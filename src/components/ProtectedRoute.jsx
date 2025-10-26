import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const session = authService.getSession();

  // Ensure both session token and context user exist
  if (!session || !session.token || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
}