import React, { useState } from "react";
import "./leftBar.css";
import { Groups, Trending, Events } from "../test-data/test-data";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {
  const navigate = useNavigate();

  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
  });

  function handle(e) {
    const newdata = { ...groupData };
    newdata[e.target.id] = e.target.value;
    setGroupData(newdata);
  }

  const createGroup = (e) => {
    e.preventDefault();
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("groupName", groupData.groupName);
    formData.append("image", fileField.files[0]);
    formData.append("description", groupData.description);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/groupnames/addGroupName",
      settings
    )
      .then((result) => result.text())
      .then((msg) => {
        window.alert(msg);
      });
  };

  return (
    <div className="leftBar">
      <div className="leftBarComponentContainer">
        <form onSubmit={(e) => createGroup(e)}>
          <input
            type="text"
            placeholder="Enter Group Name"
            id="groupName"
            onChange={(e) => handle(e)}
          />
          <input
            type="text"
            placeholder="Entre Group Description"
            id="description"
            onChange={(e) => handle(e)}
          />
          <input
            type="file"
            id="image"
            name="filename"
            placeholder="upload post picture"
          />
          <input type="submit" placeholder="submit group create request" />
        </form>
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
