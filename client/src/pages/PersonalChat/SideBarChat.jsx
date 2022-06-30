import React from 'react'
import './sideBarChat.css'
import { Avatar } from '@mui/material'
import './sideBarChat.css'

const SideBarChat = ({chatName, clickAction}) => {
    /*
    (1) Show friends list with whom there is no
        chat history
    (2) Prompt to find friends
    (3) Or create emptyChat with only yourself in it
    (4) Make a group 
        */
      
  return  (
    <div className = "sidebarchat" onClick = {() => {console.log("chat clicked" + chatName); clickAction(chatName)}}>
    <Avatar src ="https://avatars.dicebear.com/api/micah/frend.svg" />
    <div className = "sidebarchat_info">
        <h2>{chatName}</h2>
        <p>Last message ...</p>
    </div>
    </div>
  )
}

export default SideBarChat;
