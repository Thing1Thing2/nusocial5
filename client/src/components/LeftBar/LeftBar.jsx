import React, { useState } from "react";
import "./leftBar.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateGroup from "../Controls/CreateGroup";
import ViewGroup from "../Controls/ViewGroup";
import NewTag from "../Controls/NewTag";
import AddEvent from "../Controls/AddEvent";

const LeftBar = ({ username }) => {
  let guest = username.includes("guest");
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

  const [TrendingTags, setTrendingTags] = useState([]);
  const getTrendingTags = async () => {
    setTrendingTags([]);
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
      "https://nusocial5.herokuapp.com/api/trendingtags/getTrending",
      settings
    ).then(async (result) => {
      let tags = await result.json();
      console.log(tags);
      setTrendingTags(tags);
    });
  };

  const [Events, setEvents] = useState([]);
  const getEvents = () => {
    setEvents([]);
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
      "https://nusocial5.herokuapp.com/api/recentevents/getEvents",
      settings
    ).then(async (result) => {
      let events = await result.json();
      console.log(events);
      setEvents(events);
    });
  };
  if (guest) {
    return (
      <div className="leftBar">
        <div className="containerTitle">
          <div className="redirect guest" onClick={() => navigate("/")}>
            Login to create and view groups
          </div>
        </div>

        <div className="leftBarComponentContainer">
          <button onClick={getTrendingTags}>Refresh Trending</button>
          <div className="containerTitle">Trending</div>
          {TrendingTags.map((u) => (
            <div className="trending">{u}</div>
          ))}
          <div className="redirect guest" onClick={() => navigate("/")}>
            Login to add an event
          </div>
          <div className="leftBarComponentContainer">
            <button onClick={getEvents}>Refresh Events</button>
            <div className="containerTitle">Recent Events</div>

            {Events.map((u) => (
              <div className="event">
                <div className="eventAvatar">
                  <Avatar src={u[4]} alt="" />
                </div>
                <div className="eventContainerRight">
                  <div className="eventName">{u[0]}</div>
                  <div className="eventTime">
                    {u[1]}
                    {u[2]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
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
          <button onClick={getTrendingTags}>Refresh Trending</button>
          <div className="containerTitle">Trending</div>
          {TrendingTags.map((u) => (
            <div className="trending">{u}</div>
          ))}
          <div className="showMore">Show more</div>
        </div>
        <div className="leftBarComponentContainer">
          <button onClick={getEvents}>Refresh Events</button>
          <div className="containerTitle">Recent Events</div>
          <AddEvent username={username} />
          {Events.map((u) => (
            <div className="event">
              <div className="eventAvatar">
                <Avatar src={u[4]} alt="" />
              </div>
              <div className="eventContainerRight">
                <div className="eventName">{u[0]}</div>
                <div className="eventTime">
                  {u[1]}
                  {u[2]}
                </div>
              </div>
            </div>
          ))}
          <div className="showMore">Show more</div>
        </div>
      </div>
    );
  }
};

export default LeftBar;
