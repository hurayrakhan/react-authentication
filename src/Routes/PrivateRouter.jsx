// components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";


export const PrivateRoute = ({ children }) => {

  const { user, loading, tokens } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  

  if(!tokens){
    return <Navigate to="/login" state={location.pathname} replace />;
  }


  if(!user){
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children ;
};
