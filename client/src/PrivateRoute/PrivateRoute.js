import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...props }) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAuthenticated && !auth.loading) {
    return <Redirect to="/login" />;
  }
  return <Component {...props} />;
};
export default PrivateRoute;
