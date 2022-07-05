import React, {useState, useEffect} from "react"
import { Users, Deadlines } from "../test-data/test-data";
import './rightBar.css';
import Online from "../Online/Online";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";



const RightBar = ({username}) => {
  
  const sendFriendRequest = async (friendUsername) => {
    console.log("sendFriendRequest");
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
    }
  fetch("https://nusocial5.herokuapp.com/api/friends/addFriend", settings).then(response => response.json()).then(data => {
  console.log(data)});

}
  const [friendsSuggestion, setFriendsSuggestion] = useState([]);

  const getAllStudents = async()=> {
    const data = {
      username: username
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const res = await fetch("https://nusocial5.herokuapp.com/api/friends/getAllStudentsNotFriends", settings);
    const arr = await res.json();
    let count = 1;
    setFriendsSuggestion([]);
    arr.forEach(stu => {
      getProfilePicture(stu.username, count);
      const pic = `profilePic${count}`
      if(count <= 5){
        count += 1;
      setFriendsSuggestion((list) => [...list, [stu, pic]]);
      }
    })
  }


  const addProfilePicture = async event => {
    const fileField = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('username', username);
    formData.append('photo', fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    }
  await fetch("https://nusocial5.herokuapp.com/api/students/addProfilePicture", settings).then(response => response.json()).then(data => {
  }).catch(error => {
    console.log(error)
  })
};

const [profilePic1, setProfilePic1] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg")
const [profilePic2, setProfilePic2] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg")
const [profilePic3, setProfilePic3] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg")
const [profilePic4, setProfilePic4] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg")
const [profilePic5, setProfilePic5] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg")
  
  const getProfilePicture = async (name, count) => {
    let url;
    const data = {
      username: name,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  await fetch("https://nusocial5.herokuapp.com/api/students/getProfilePicture", settings).then(response => response.text()).then(data => {
    console.log(data)
    url = data;
  })
  if (count === 1) {
    setProfilePic1(url);
  } else if (count === 2) {
    setProfilePic2(url);
  } else if (count === 3) {
    setProfilePic3(url);
  } else if (count === 4) {
    setProfilePic4(url);
  } else if (count === 5) {
    setProfilePic5(url);
  }
  }

useEffect(() => {
  getAllStudents();
}, []);

  return (
    <div className="rightBar">
      <div className="rightbarComponentContainer">
       <input type="file" id="myFile" name="filename" placeholder="upload profile picture" />
  <input type="submit" onClick = {addProfilePicture} value="upload image"/>
  <input type="submit" placeholder="refresh feed" onClick = {getAllStudents} value = "refresh suggestion" />
        <div className="containerTitle">
          Suggestions For You
        </div>
        {friendsSuggestion.map((u) => (
          <div className="friendSuggestionRequest">
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionAvatar">
                <Avatar src = {profilePic1} />
              </div>
              <div className="friendSuggestionName">
                {u[0].username}
              </div>
            </div>
            <div className="friendSuggestionRight">
              <button className="sendFriendRequest" onClick = {() => sendFriendRequest(u[0].username)}>Friend request</button>
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
