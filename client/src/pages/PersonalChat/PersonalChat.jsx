import React, { useState, useEffect } from "react";
import "./personalChat.css";
import SideBar from "./SideBar";
import ChatBar from "./ChatBar";
import Header from "../../components/Header/Header";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

//SideBar contains contacts
// ChatBar shows chat history and section to write and send message
// Header is by default shown on top to allow navigation to other pages
const PersonalChat = ({ username }) => {
  const socket = io.connect("https://nusocial5.herokuapp.com/");
  const [clickedChat, setClickedChat] = useState("");
  const [clickedChatId, setClickedChatId] = useState("");
  const [isOnline, setIsOnline] = useState("offline");
  const [chatHistory, setChatHistory] = useState([]);

  const location = useLocation();

  const getClickedChat = (chat, chatId) => {
    setClickedChat(chat);
    setClickedChatId(chatId);
  };

  const getChatHistory = (arr) => {
    setChatHistory(arr);
  };

  const getIsOnline = (online) => {
    setIsOnline(online);
  };

  const setSocket = (chatId) => {
    socket.emit("join_room", chatId);
  };

  const sendMessageSocket = async (data) => {
    await socket.emit("send_message", data);
  };

  return (
    <div className="PersonalChat">
      <div className="personalchat">
        <Header
          title="Chat"
          showHeaderCenter={true}
          showHeaderRight={true}
          link="/home"
          username={location.state.username}
        />
        <div className="personalchat_body">
          {console.log(clickedChat)}
          <SideBar
            socket={setSocket}
            getClickedChat={getClickedChat}
            isOnline={getIsOnline}
            username={location.state.username}
            chatHistory={getChatHistory}
          />
          <ChatBar
            socket={sendMessageSocket}
            username={location.state.username}
            chat={clickedChat}
            chatId={clickedChatId}
            isOnline={isOnline}
            chatHistory={chatHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalChat;
