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
      username: chat,
    };

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://nusocial5.herokuapp.com/api/students/isOnline", settings)
      .then((response) => response.text())
      .then((data) => {
        console.log("ONLINE STATUS IS" + data);
        if (data === "true") {
          isOnline("online");
        } else {
          isOnline("offline");
        }
      });
    socket.emit("join_room", "ourchats");
  };

  const showConfirmedFriends = async () => {
    setChats([]);

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
    arr.forEach((f) => {
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
      fetch(
        "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
        settings
      )
        .then((response) => response.text())
        .then((data) => {
          pic = data;
          setChats((list) => [...list, [f[0], pic]]);
        });
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
              }
            }}
          />
          <input
            type="submit"
            placeholder="refresh feed"
            onClick={showConfirmedFriends}
            value="refresh suggestion"
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
