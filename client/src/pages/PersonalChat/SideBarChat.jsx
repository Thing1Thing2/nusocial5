import React, { useState } from "react";
import "./sideBarChat.css";
import { Avatar } from "@mui/material";
import "./sideBarChat.css";

const SideBarChat = ({ chatName, clickAction }) => {
  /*
    (1) Show friends list with whom there is no
        chat history
    (2) Prompt to find friends
    (3) Or create emptyChat with only yourself in it
    (4) Make a group 
        */
  const [latestMsg, setLatestMsg] = useState("latest message");
  const latestMessage = async (chatId) => {
    const info = {
      chatId: chatId,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    let results = await fetch(
      "https://nusocial5.herokuapp.com/api/personalchats/latestMessage",
      settings
    );

    let arr = await results.json();

    setLatestMsg(arr.message);
  };
  window.onload = () => {
    latestMessage(chatName[2]);
  };
  return (
    <div
      className="sidebarchat"
      onClick={() => {
        console.log("chat clicked" + chatName[0]);
        clickAction(chatName[0], chatName[2]);
      }}
    >
      <Avatar src={chatName[1]} />
      <div className="sidebarchat_info">
        <h2>{chatName[0]}</h2>
        <p>{latestMsg}</p>
      </div>
    </div>
  );
};

export default SideBarChat;
