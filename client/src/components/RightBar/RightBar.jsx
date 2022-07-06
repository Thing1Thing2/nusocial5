import React, { useState } from "react";
import { Users, Deadlines } from "../test-data/test-data";
import "./rightBar.css";
import Online from "../Online/Online";
import { Avatar } from "@mui/material";

const RightBar = ({ username }) => {
  const sendFriendRequest = async (friendUsername) => {
    const data = {
      username: username,
      friend: friendUsername,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://nusocial5.herokuapp.com/api/friends/addFriend", settings)
      .then((response) => response.json())
      .then((data) => {
        window.alert(data);
      });
  };
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
          pic = data;
        });
      if (count <= 5) {
        count += 1;
        setFriendsSuggestion((list) => [...list, [stu.username, pic]]);
      }
    });
  };

  function addProfilePicture(e) {
    e.preventDefault();
    const fileField = document.querySelector('input[id="photo"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("photo", fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/students/addProfilePicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        window.alert(data);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });
  }

  return (
    <div className="rightBar">
      <div className="rightbarComponentContainer">
        <form onSubmit={(e) => addProfilePicture(e)}>
          <input
            type="file"
            id="photo"
            name="filename"
            placeholder="upload profile picture"
          />
          <input type="submit" placeholder="submit image" />
        </form>
        <input
          type="submit"
          placeholder="refresh feed"
          onClick={getAllStudents}
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
              <button
                className="sendFriendRequest"
                onClick={() => sendFriendRequest(u[0])}
              >
                Friend request
              </button>
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
        <div className="Friend">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </div>
        <div className="showMore">Show more</div>
      </div>
    </div>
  );
};

export default RightBar;
