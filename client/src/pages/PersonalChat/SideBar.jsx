import React, {useState} from "react";
import "./sideBar.css";
import { Avatar, IconButton } from "@mui/material";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SideBarChat from './SideBarChat';


function SideBar({socket, getClickedChat, isOnline, username}) {
  const [chats, setChats] = useState([])
  const [chat, setChat]= useState("")
  const clickedChat = (chat) => {
    getClickedChat(chat);
    console.log("chat was clicked: " + chat);
  }

  const joinChatFetch = (chat) => {
    clickedChat(chat);
    const data = {
      chat: chat,
    };
  
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
      console.log("in is online");
      fetch("https://nusocial4.herokuapp.com/home/api/students/isOnline",settings ).then(response =>response.text()).then( data => {
        console.log("response in isOnline chatBar: " + data);
        isOnline(data);
    });
      socket.emit("join_room", "ourchats");
  }
/*
  const joinChat =  (chat) => {
    clickedChat(chat);
    const data = {
      chat: chat,
    };
      console.log("in is online");
      axios.post("http://localhost:8000/api/students/isOnline", data).then(response => {
        isOnline(response.data);
        console.log("response in isOnline chatBar: " + response.data);
    });
      socket.emit("join_room", chat);
  };
  */
  /*

const addChatToLeftBar = (chat)=> {
  if(chat !== "") {
    const data = {
      chat: chat,
    }
    axios.post("http://localhost:8000/api/chats/verifyChat", data).then(response => {
      console.log("responsedata " + response.data);
     if(response.data === "passed"){
      if(!chats.includes(chat))
      setChats((list) => [...list, chat] )
        } else {
          console.log("Chat already open")
        }
    })
  } 
}
*/
//ADD CHAT TO LEFT BAR if verified AND INITIALISE MSG HISTORY TABLE
const addChatToLeftBarFetch = (chat)=> {
  if(chat !== "") {
    const data = {
      chat: chat,
      username: username,
    }
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    fetch("https://nusocial4.herokuapp.com/api/chats/verifyChat", settings).then(response => response.text()).then(response => {
      console.log("responsedata " + response);
     if(response === "passed"){
      if(!chats.includes(chat)) {
        console.log("wow new friend")
        getClickedChat(chat);
      setChats((list) => [...list, chat] )
        } else {
          console.log("Chat already open")
        }
      }})
  } 
}

  return (
    <div className="sidebar" >
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar-searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" onChange={(event) => {
              setChat(event.target.value)
            }} onKeyPress = {e=>  {
             if(e.key === 'Enter'){
              addChatToLeftBarFetch(chat);
              }
          } }/>
        </div>
      </div>
      <div className="sidebar_chats">
      {
        chats.map(chat => {
           return (
          <SideBarChat  chatName = {chat} clickAction =  {joinChatFetch}/>
           )
        })
    }
      </div>
  
    </div>
  );
}

export default SideBar;
