import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/UserContext";
import useUser from "../hooks/useUser";
import Spinner from "../Pages/Shared/Spinner/Spinner";

const UserRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isUser, isUserLoading] = useUser(user?.email);
  if (loading || isUserLoading) {
    return <Spinner></Spinner>;
  }
  if (user?.uid && isUser) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default UserRoute;
