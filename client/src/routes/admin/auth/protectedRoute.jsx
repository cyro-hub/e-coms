import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = useSelector(
    (state) => state.userState?.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to={"/admin/auth"} replace />;
}

export default ProtectedRoute;
