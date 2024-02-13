import React, { useState, useRef } from "react";
import "./Navbar.scss";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/appConfigSlice";
import { axiosClient } from "../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../utils/localStorageManager";

const Navbar = () => {
  const navigate = useNavigate();
  // const loadingRef = useRef();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  // const [loading, setLoading] = useState(false);

  // function toggleLoadingBar() {
  //   // if (loading) {
  //   // setLoading(false);
  //   // loadingRef.current.complete();
  //   dispatch(setLoading(true));
  //   // } else {
  //   //   // setLoading(true);
  //   //   // loadingRef.current.continuousStart();
  //   // }
  // }

  async function handleLogoutClicked() {
    try {
      dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));
    } catch (e) {}
  }

  return (
    <div className="Navbar">
      {/* <LoadingBar height={5} color="#5f9fff" ref={loadingRef} /> */}
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Social-Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
