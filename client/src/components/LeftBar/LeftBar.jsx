import React from "react";
import "./leftBar.css";
import { Groups, Trending, Events } from "../test-data/test-data";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();
  return (
    <div className="leftBar">
      <div className="leftBarComponentContainer">
        <div className="containerTitle">Your Groups</div>
        {Groups.map((u) => (
          <div
            className="group"
            onClick={() => navigate("/group", { state: { group: u.name } })}
          >
            <div className="groupAvatar">
              <Avatar src={u.avatar} />
            </div>
            <div className="groupContainerRight">
              <div className="groupName">{u.name}</div>
              <div className="groupDescription">{u.description}</div>
            </div>
          </div>
        ))}
        <div className="showMore">Show more</div>
      </div>
      <div className="leftBarComponentContainer">
        <div className="containerTitle">Trending</div>
        {Trending.map((u) => (
          <div className="trending">{u.trend}</div>
        ))}
        <div className="showMore">Show more</div>
      </div>
      <div className="leftBarComponentContainer">
        <div className="containerTitle">Recent Events</div>
        {Events.map((u) => (
          <div className="event">
            <div className="eventAvatar">
              <Avatar src={u.avatar} alt="" />
            </div>
            <div className="eventContainerRight">
              <div className="eventName">{u.name}</div>
              <div className="eventTime">{u.time}</div>
            </div>
          </div>
        ))}
        <div className="showMore">Show more</div>
      </div>
    </div>
  );
};

export default LeftBar;
