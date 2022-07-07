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
    await fetch(
      "https://nusocial5.herokuapp.com/api/friends/getAllConfirmedFriends",
      settings
    ).then(async (friends) => {
      let friendsList = await friends.json();
      friendsList.forEach((f) => {
        let pic =
          "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg";
        const data = {
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
          .then((result) => {
            result.text();
          })
          .then((result) => {
            pic = result;
            console.log(result);
          });
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
