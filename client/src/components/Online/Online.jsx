import React from "react";
import "./online.css";
import { Avatar } from "@mui/material";

const Online = ({ user }) => {
  return (
    <div className="rightBarFriend">
      <div className="rightBarAvatarContainer">
        <Avatar src={user[1]} alt="" />
        {user[3] === true ? (
          <span className="rightBarOnline"></span>
        ) : (
          <span className="rightBarOffline"></span>
        )}
      </div>
      <div className="rightBarUsername">{user[0]}</div>
    </div>
  );
};

export default Online;
