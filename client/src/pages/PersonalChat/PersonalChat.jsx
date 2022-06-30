import React, {useState} from "react"
import './personalChat.css'
import SideBar from './SideBar'
import ChatBar from './ChatBar'
import Header from '../../components/Header/Header'
//import io from "socket.io-client"
import { useLocation } from 'react-router-dom'

//SideBar contains contacts 
// ChatBar shows chat history and section to write and send message
// Header is by default shown on top to allow navigation to other pages
 const PersonalChat = ({username}) => {

 // const socket = io.connect("http://localhost:3001");
  const [clickedChat, setClickedChat] = useState("");
  const [isOnline, setIsOnline] = useState("offline");

  const location = useLocation();
  /*

  const getClickedChat = (chat) => {
    setClickedChat(chat);
    console.log("Now in personalchat : " + chat)
  }

  const getIsOnline = (online) => {
    setIsOnline(online);
    console.log("Now in personalchat online status: " + online)
  }
  */
  return (  
    <div className = "PersonalChat">
    <div className = "personalchat">
  <Header title = "Chat"  showHeaderCenter={true} showHeaderRight = {true} link = "/home" username = "username"/>
    <div className = "personalchat_body">
    {console.log(clickedChat)}
      <SideBar />
      <ChatBar  />
      </div>
      </div>
    </div>
  )
}

export default PersonalChat
