import React from "react"
import "./online.css";
import { Avatar } from "@mui/material";

const Online = ({user}) => {
  return (
    <div className="rightBarFriend">
        <div className="rightBarAvatarContainer">
            <Avatar src={user.avatar} alt="" />
            <span className="rightBarOnline"></span>
        </div>
        <div className="rightBarUsername">{user.userName}</div>
    </div>
  )
}

export default Online