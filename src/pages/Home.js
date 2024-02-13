import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../redux/slices/appConfigSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  return (
    <div>
      <Navbar />
      <div className="Outlet" style={{ marginTop: "60px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
