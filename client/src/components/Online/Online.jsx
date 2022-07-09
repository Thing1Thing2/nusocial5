import React from "react";
import "./online.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Online = ({ user, username }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rightBarFriend"
      onClick={() =>
        navigate("/friendprofilepage", {
          state: {
            username: username,
            friend: user[0],
          },
        })
      }
    >
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
