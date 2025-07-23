// PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Auth/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
