// private routing where user must be logged in to access that component

import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
const PrivateRoute = () => {
  
  var { currentUser } = useAuth();
  if (
    currentUser &&
    currentUser !== JSON.parse(localStorage.getItem("localKey"))
  ) {
    localStorage.setItem("localKey", JSON.stringify(currentUser));
  } else {
    if (localStorage.getItem("localKey")) {
      const user = JSON.parse(localStorage.getItem("localKey"));
      currentUser = user;
    }
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;