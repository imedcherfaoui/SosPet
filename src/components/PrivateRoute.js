import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/userContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect the user to the login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;