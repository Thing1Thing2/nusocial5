import React, {useState, useEffect} from "react"
import { Users, FriendSuggestion, Deadlines } from "../test-data/test-data";
import './rightBar.css';
import Online from "../Online/Online";
import { Avatar } from "@mui/material";



const RightBar = ({username, changeProfilePic}) => {
  
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
    let count = 0;
    setFriendsSuggestion([]);
    arr.forEach(stu => {
      if(count <= 4){
        count += 1;
      setFriendsSuggestion((list) => [...list, stu]);
      }
    })
  }

  

  const addProfilePicture = event => {
    const fileField = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('username', username);
    formData.append('photo', fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    }
  fetch("https://nusocial5.herokuapp.com/api/students/addProfilePicture", settings).then(response => response.json()).then(data => {
  console.log("DATA.URL" + data.profilePicURL);
  changeProfilePic(data.profilePicURL)
  }).catch(error => {
    console.error(error)
  })
};


  
  const getProfilePicture = async (name) => {
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
    return data.profilePictureURL;
  })
  }

useEffect(() => {
  getAllStudents();
}, []);

  return (
    <div className="rightBar">
      <div className="rightbarComponentContainer">
       <input type="file" id="myFile" name="filename" placeholder="upload profile picture" />
  <input type="submit" onClick = {addProfilePicture} value="upload image" />
  <input type="submit" placeholder="refresh feed" onClick = {getAllStudents} value = "refresh suggestion" />
        <div className="containerTitle">
          Suggestions For You
        </div>
        {friendsSuggestion.map((u) => (
          <div className="friendSuggestionRequest">
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionAvatar">
                <Avatar src = {getProfilePicture(u.username)} />
              </div>
              <div className="friendSuggestionName">
                {u.username}
              </div>
            </div>
            <div className="friendSuggestionRight">
              <button className="sendFriendRequest" onClick = {() => sendFriendRequest(u.username)}>Friend request</button>
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
