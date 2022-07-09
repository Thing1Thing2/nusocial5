import React from "react";
import "./online.css";
import { Avatar } from "@mui/material";

const Online = ({ user }) => {
  return (
    <div className="rightBarFriend">
      <div className="rightBarAvatarContainer">
        <Avatar src={user[1]} alt="" />
        <span className="rightBarOnline">{user[3]}</span>
      </div>
      <div className="rightBarUsername">{user[0]}</div>
    </div>
  );
};

export default Online;
