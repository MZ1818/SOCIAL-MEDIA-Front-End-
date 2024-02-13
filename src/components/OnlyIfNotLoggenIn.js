import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";
import { Navigate, Outlet } from "react-router-dom";

const OnlyIfNotLoggenIn = () => {
  const user = getItem(KEY_ACCESS_TOKEN);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default OnlyIfNotLoggenIn;
