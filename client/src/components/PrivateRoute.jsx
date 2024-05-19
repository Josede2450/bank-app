import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom"; // To get the childrens
//Make the dashboard private

// Difference between navigate and use navigate, is that navigate is a component and usenavigate is a hook
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
