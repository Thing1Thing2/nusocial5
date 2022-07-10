import React, { useState } from "react";
import "./leftBar.css";
import { Trending, Events } from "../test-data/test-data";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateGroup from "../Controls/CreateGroup";
import JoinGroup from "../Controls/JoinGroup";
import ViewGroup from "../Controls/ViewGroup";
import NewTag from "../Controls/newTag";

const LeftBar = ({ username }) => {
  const navigate = useNavigate();

  const [Groups, setGroups] = useState([]);

  const getAllGroups = () => {
    setGroups([]);
    const info = {
      username: username,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/groupnames/allMyGroups",
      settings
    ).then(async (result) => {
      let groups = await result.json();
      groups.forEach(async (group) => {
        setGroups((list) => [
          ...list,
          [group.groupName, group.profilePictureURL, group.description],
        ]);
      });
    });
  };

  return (
    <div className="leftBar">
      <div className="leftBarComponentContainer">
        <CreateGroup username={username} />
        <input
          type="submit"
          placeholder="refresh feed"
          onClick={getAllGroups}
          value="refresh suggestion"
        />
        <div className="containerTitle">Your Groups</div>
        {Groups.map((u) => (
          <div className="group">
            <div className="groupAvatar">
              <Avatar
                src={u[1]}
                onClick={() => navigate("/group", { state: { group: u[0] } })}
              />
            </div>
            <div className="groupContainerRight">
              <div className="groupName">{u[0]}</div>
              <div className="groupDescription">{u[2]}</div>
            </div>

            <ViewGroup username={username} groupName={u[0]} />
          </div>
        ))}
        <div className="showMore">Show more</div>
      </div>
      <div className="leftBarComponentContainer">
        <NewTag />
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
