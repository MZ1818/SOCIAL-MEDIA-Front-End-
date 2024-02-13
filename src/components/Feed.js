import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "./Post.js";
import Follower from "./Follower.js";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../redux/slices/feedSlice.js";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  return (
    <div className="Feed">
      <div className="container">
        <div className="left-part">
          {/* <Post />
          <Post />
          <Post />
          <Post /> */}
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className="title">You are following</h3>
            {/* <Follower />
            <Follower />
            <Follower />
            <Follower /> */}
            {feedData?.followings?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
          <div className="suggestions">
            <h3 className="title">Suggestions for you</h3>
            {/* <Follower />
            <Follower />
            <Follower />
            <Follower /> */}
            {feedData?.suggestions?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
