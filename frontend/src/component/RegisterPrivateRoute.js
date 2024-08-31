// This component is intended to limit access to the relevant screens only to pediatricians
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RegisterPrivateRoute = ({ children }) => {
  // Retrieve the 'canAccessRegister' flag from localStorage to check if the user has access permissions.
  const canAccessRegister = localStorage.getItem('canAccessRegister');
  const location = useLocation();

  // If the user tries to access the "/register" route and doesn't have the correct access flag, redirect them to "/login".
  if (location.pathname === '/register' && canAccessRegister !== 'true') {
    return <Navigate to="/login" />;
  }
  // If the user has the correct permissions, render the children components.
  return children;
};

export default RegisterPrivateRoute;
