import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

const requireUser = () => {
  //if user is not having accesToken ,take it to Login (if valid = then move it to Home outlet)
  const user = getItem(KEY_ACCESS_TOKEN);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default requireUser;
