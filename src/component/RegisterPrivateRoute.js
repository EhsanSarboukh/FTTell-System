import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RegisterPrivateRoute = ({ children }) => {
  const canAccessRegister = localStorage.getItem('canAccessRegister');
  const location = useLocation();

  console.log('canAccessRegister:', canAccessRegister); 

  if (location.pathname === '/register' && canAccessRegister !== 'true') {
    console.log('Redirecting to login as canAccessRegister is not true');
    return <Navigate to="/login" />;
  }

  return children;
};

export default RegisterPrivateRoute;
