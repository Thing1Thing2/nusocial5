import React, {useState} from 'react'
import "./NewsAndNots.css"
import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom'; 
import { Avatar } from "@mui/material";


const NewsAndNots = () => {
  const [allNews, setAllNews] = useState([]);
  const getAllNewsAndNots =  async () => {
    setAllNews([]);
    const username = await location.state.username;
    console.log(username);
    let data = {
      username: username,
    }
    let settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  let res = await fetch("https://nusocial5.herokuapp.com/api/friends/getAllFriendRequestsPending", settings);
  let arr = await res.json();
  let pic;
  arr.forEach(stu => {
    console.log(stu);
    console.log(stu[0]);
    console.log(stu[1]);
    console.log(stu[2]);
    stu.forEach(stu => {
      pic = "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg";
      if(stu[0] === "sent") {
          let data = {
            username: username,
          }
          let settings = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
          fetch("https://nusocial5.herokuapp.com/api/students/getProfilePicture", settings).then(response => response.text()).then(data => {
      pic = data;
      setAllNews((list) => [...list, [stu,  "You sent " + stu[1] + " a friend request at" + stu[2], "View " + stu[1] + "'s profile", pic ]]);
    })
        } else if (stu[0] === "received") {
           data = {
            username: stu[1]
          }
          settings = {
            method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      fetch("https://nusocial5.herokuapp.com/api/students/getProfilePicture", settings).then(response => response.text()).then(data => {
      pic = data;
      setAllNews((list) => [...list, [stu,  "Confirm " + stu[1] + "'s friend request at " + stu[2],"Confirm", pic ]]);
    })
      } else {
        setAllNews((list) => [...list, [stu, "Dummy message" , "ButtonMsg", pic ]]);
      }
      })
  })
  }

  const location = useLocation();

  const handleButton = (stu) => {
    console.log(stu)
    if(stu[1].startsWith("Confirm")) {
      confirmFriendRequest(stu[0][1]);
    }
  }

  const confirmFriendRequest = (friendUsername) => {
    console.log(friendUsername);
    const data = {
      username: location.state.username,
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
    fetch("https://nusocial5.herokuapp.com/api/friends/confirmFriend", settings).then(response => response.json()).then(d => {
      console.log(d);
      }).catch(error => {
        console.error(error)
      })
    }

  return (
    <div >
    <div className = "header">
    <Header title = "News and Notifications" showHeaderCenter={true} showHeaderRight={true} link = "/home" username = {location.state.username}/>
    </div> 
      <div>
      <input type="submit" placeholder="refresh feed" onClick = {getAllNewsAndNots} value = "refresh suggestion" />
      {allNews.map((u) => (
          <div className="friendSuggestionRequest">
          <Avatar src={u[3]} />
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionName">
                {u[1]}
              </div>
            </div>
            <div className="friendSuggestionRight">
              <button className="sendFriendRequest" onClick = {handleButton(u)}>{u[2]}</button>
            </div>
          </div>
        ))}
     
    </div>
    </div>
  )
}

export default NewsAndNots;
