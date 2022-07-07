import React, { useState } from "react";
import "./sideBar.css";
import { Avatar, IconButton } from "@mui/material";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SideBarChat from "./SideBarChat";

function SideBar({ socket, getClickedChat, isOnline, username }) {
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  const clickedChat = (chat) => {
    getClickedChat(chat);
    console.log("chat was clicked: " + chat);
  };

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
    };
    console.log("in is online");
    fetch(
      "https://nusocial5.herokuapp.com/home/api/students/isOnline",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        console.log("response in isOnline chatBar: " + data);
        isOnline(data);
      });
    socket.emit("join_room", "ourchats");
  };
  const showConfirmedFriends = async () => {
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
    await fetch(
      "http://localhost:5000/api/friends/getAllConfirmedFriends",
      settings
    ).then((friends) => {
      console.log(friends);
    });
  };
  return (
    <div className="sidebar">
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
          <input
            placeholder="Search or start new chat"
            type="text"
            onChange={(event) => {
              setChat(event.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                showConfirmedFriends();
              }
            }}
          />
        </div>
      </div>
      <div className="sidebar_chats">
        {chats.map((chat) => {
          return <SideBarChat chatName={chat} clickAction={joinChatFetch} />;
        })}
      </div>
    </div>
  );
}

export default SideBar;
