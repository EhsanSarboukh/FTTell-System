import React from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirecting

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  // If the token exists, render the child components; otherwise, redirect to the login page
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute; // Export the PrivateRoute component
