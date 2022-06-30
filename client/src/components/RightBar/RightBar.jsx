import { Users, FriendSuggestion, Deadlines } from "../test-data/test-data";
import './rightBar.css';
import Online from "../Online/Online";
import { Avatar } from "@mui/material";

import React from 'react';


const RightBar = ({username}) => {
  /*
  const sendFriendRequest = async (friendUsername) => {
    const data = {
      friendUsername: friendUsername,
      yourUsername: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  fetch("http://localhost:8000/api/friends/addFriend", settings).then(response => response.text()).then(data => {
  console.log(data);
  })};
  */

  const addProfilePicture = event => {
    const fileField = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('username', username);
    formData.append('path', fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    }
  fetch("http://localhost:8000/api/students/addProfilePicture", settings).then(response => response.text()).then(data => {
  console.log(data);
  
  }).catch(error => {
    console.error(error)
  })
};


  return (
    <div className="rightBar">
      <div className="rightbarComponentContainer">
       <input type="file" id="myFile" name="filename" />
  <input type="submit" onClick = {addProfilePicture} />
        <div className="containerTitle">
          Suggestions For Yous
        </div>
        {FriendSuggestion.map((u) => (
          <div className="friendSuggestionRequest">
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionAvatar">
                <Avatar src= {u.avatar} />
              </div>
              <div className="friendSuggestionName">
                {u.username}
              </div>
            </div>
            <div className="friendSuggestionRight">
              <button className="sendFriendRequest">Friend request</button>
            </div>
          </div>
        ))}
        <div className="showMore">
          Show more
        </div>
      </div>
      <div className="upcomingDeadline">
        <div className="rightbarComponentContainer">
          <div className="containerTitle">
            Upcoming Tests & Deadlines
          </div>
          {Deadlines.map((u) => (
            <div className="deadlineAndTest">
              <div className="moduleName">
                {u.module}
              </div>
              <div className="deadlineOrTest">
                {u.type}
              </div>
              <div className="date">
                {u.date}
              </div>
            </div>
          ))}
          <div className="showMore">
            Show more
          </div>
        </div>
      </div>
      <div className="rightbarComponentContainer">
        <div className="containerTitle">
          Friends & Recent Chat
        </div>
        <div className="Friend">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </div>
        <div className="showMore">
          Show more
        </div>
      </div>
    </div>
  )
}

export default RightBar
