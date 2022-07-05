import React, {useState} from 'react'
import "./NewsAndNots.css"
import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom'; 
import { Avatar } from "@mui/material";


const NewsAndNots = () => {
  const [allNews, setAllNews] = useState([]);
  const getAllPersonalNewsAndNots =  async () => {
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
  let res = await fetch("https://nusocial5.herokuapp.com/api/personalnewsandnots/getNews", settings);
  let arr = await res.json();
  let buttonMsg;
  console.log(arr);
  let pic;
  arr.forEach(stu => {
    setAllNews([]);
    stu.forEach(stu => {
      pic = "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg";
      console.log(stu.to + stu.from);
      if(stu.from === location.state.username) {
          buttonMsg = `View ${stu.to}'s profile`;
          stu.body = `You sent ${stu.to} a friend request`;
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
      pic = "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg"
      console.log(data)
      pic = data;
      setAllNews((list) => [...list, [stu, buttonMsg, pic ]]);
    })
        } else if (stu.to === location.state.username) {
          stu.body = `Confirm ${stu.from}'s friend request`;  
          buttonMsg = "Confirm";
          data = {
            username: stu.from
          }
          settings = {method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
          fetch("https://nusocial5.herokuapp.com/api/students/getProfilePicture", settings).then(response => response.text()).then(data => {
      pic = "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg"
      console.log(data)
      pic = data;
      setAllNews((list) => [...list, [stu, buttonMsg, pic ]]);
    })
      } else {
        buttonMsg = "Add button msg";
        setAllNews((list) => [...list, [stu, buttonMsg, pic ]]);
      }
      })
  })
  

  }

  const location = useLocation();

  const handleButton = (buttonmsg) => {
    console.log(buttonmsg)
    if(buttonmsg[1].startsWith("Confirm")) {
      confirmFriendRequest(buttonmsg[0].from);
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
      <input type="submit" placeholder="refresh feed" onClick = {getAllPersonalNewsAndNots} value = "refresh suggestion" />
      {allNews.map((u) => (
          <div className="friendSuggestionRequest">
          <Avatar src={u[2]} />
            <div className="friendSuggestionLeft">
              <div className="friendSuggestionName">
                {u[0].body}{u[0].createdAt}
              </div>
            </div>
            <div className="friendSuggestionRight">
              <button className="sendFriendRequest" onClick = {handleButton(u)}>{u[1]}</button>
            </div>
          </div>
        ))}
     
    </div>
    </div>
  )
}

export default NewsAndNots;
