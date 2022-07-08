import React from "react";
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
        <p>Last message ...</p>
      </div>
    </div>
  );
};

export default SideBarChat;
