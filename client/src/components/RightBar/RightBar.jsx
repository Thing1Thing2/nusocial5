import React, { useState } from "react";
import { Deadlines } from "../test-data/test-data";
import "./rightBar.css";
import Online from "../Online/Online";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddProfilePic from "../Controls/AddProfilePic";
import JoinGroup from "../Controls/JoinGroup";
import SendFriendRequest from "../Controls/SendFriendRequest";

const RightBar = ({ username }) => {
  const navigate = useNavigate();

  const [friendsSuggestion, setFriendsSuggestion] = useState([]);
  const getAllStudents = async () => {
    setFriendsSuggestion([]);
    const data = {
      username: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(
      "https://nusocial5.herokuapp.com/api/friends/getAllStudentsNotFriends",
      settings
    );
    const arr = await res.json();
    let count = 1;
    arr.forEach(async (stu) => {
      let pic =
        "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg";
      const data = {
        username: stu.username,
      };
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      await fetch(
        "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
        settings
      )
        .then((response) => response.text())
        .then((data) => {
          if (count <= 5) {
            count += 1;
            setFriendsSuggestion((list) => [...list, [stu.username, data]]);
          }
        });
    });
  };

  const [Users, setUsers] = useState([]);
  const showConfirmedFriends = async () => {
    setUsers([]);

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

    let res = await fetch(
      "https://nusocial5.herokuapp.com/api/friends/getAllConfirmedFriends",
      settings
    );
    let arr = await res.json();
    let pic;
    arr.forEach(async (f) => {
      pic =
        "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg";
      let data = {
        username: f[0],
      };

      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let picURL = await fetch(
        "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
        settings
      );
      picURL = await picURL.text();
      let info = {
        username: f[0],
      };

      let settingsInfo = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      };
      let online = await fetch(
        "https://nusocial5.herokuapp.com/api/students/isOnline",
        settingsInfo
      );
      online = await online.text();
      console.log(picURL);
      setUsers((list) => [...list, [f[0], picURL, f[2], online]]);
    });
  };

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
      "https://nusocial5.herokuapp.com/api/groupnames/allGroups",
      settings
    ).then(async (result) => {
      let groups = await result.json();
      console.log(groups);
      groups.forEach(async (group) => {
        setGroups((list) => [
          ...list,
          [group.groupName, group.profilePictureURL, group.description],
        ]);
      });
    });
  };

  return (
    <div className="rightBar">
      <div className="rightbarComponentContainer">
        <AddProfilePic username={username} />
        <input
          type="submit"
          placeholder="refresh feed"
          onClick={() => {
            getAllStudents();
            getAllGroups();
          }}
          value="refresh suggestion"
        />
        <div className="containerTitle">Suggestions For You</div>
        {friendsSuggestion.map((u) => (
          <div className="friendSuggestionRequest">
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionAvatar">
                <Avatar src={u[1]} />
              </div>
              <div className="friendSuggestionName">{u[0]}</div>
            </div>
            <div className="friendSuggestionRight">
              <SendFriendRequest username={username} friendUsername={u[0]} />
            </div>
          </div>
        ))}
        {Groups.map((u) => (
          <div className="friendSuggestionRequest">
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionAvatar">
                <Avatar src={u[1]} />
              </div>
              <div className="friendSuggestionName">{u[0]}</div>
            </div>
            <div className="friendSuggestionRight">
              <JoinGroup username={username} groupName={u[0]} />
            </div>
          </div>
        ))}
        <div className="showMore">Show more</div>
      </div>
      <div className="upcomingDeadline">
        <div className="rightbarComponentContainer">
          <div className="containerTitle">Upcoming Tests & Deadlines</div>
          {Deadlines.map((u) => (
            <div className="deadlineAndTest">
              <div className="moduleName">{u.module}</div>
              <div className="deadlineOrTest">{u.type}</div>
              <div className="date">{u.date}</div>
            </div>
          ))}
          <div className="showMore">Show more</div>
        </div>
      </div>
      <div className="rightbarComponentContainer">
        <div className="containerTitle">Friends & Recent Chat</div>
        <input
          type="submit"
          placeholder="refresh feed"
          onClick={showConfirmedFriends}
          value="refresh suggestion"
        />
        <div className="Friend">
          {Users.map((u) => (
            <Online key={u[0]} user={u} username={username} />
          ))}
        </div>
        <div
          className="showMore"
          onClick={() =>
            navigate("/personalChat", {
              state: {
                username: username,
              },
            })
          }
        >
          Show more
        </div>
      </div>
    </div>
  );
};

export default RightBar;
