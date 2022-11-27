import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import useSeller from "../hooks/useSeller";
import Spinner from "../Pages/Shared/Spinner/Spinner";

const SellerRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  if (loading || isSellerLoading) {
    return <Spinner></Spinner>;
  }
  if (user?.uid && isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
