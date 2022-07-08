import React, { useEffect, useState } from "react";
import "./chatBar.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import Picker from "emoji-picker-react";
import Draggable from "react-draggable";

const clickedMenu = () => {
  console.log("clicked menu");
};

const ChatBar = ({ socket, username, chat, chatId, isOnline, chatHistory }) => {
  const anchorPoint = { x: 0, y: 0 };
  const show = false;
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const sendMessage = async () => {
    if (input !== "") {
      console.log(input);

      const messageData = {
        sentBy: username,
        message: input,
        createdAt:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        chatId: chatId,
      };
      /*
      const data = {
        username: username,
        chat: "ourchats",
        body: input,
      };
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      */
      console.log(messageData);

      try {
        await socket.emit("send_message", messageData);
        /*
        fetch(
          "https://nusocial5.herokuapp.com/api/personalchats/addMessage",
          settings
          
        )
          .then((res) => res.text())
          .then((msg) => console.log(msg));
          */
        setInputs((list) => [...list, messageData]);
        setInput("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onEmojiClick = (event, emojiObj) => {
    setInput((prevInput) => prevInput + emojiObj.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setInputs((list) => [...list, data]);
      console.log(inputs);
    });
  }, [socket]);

  const getProfilePicture = async (name) => {
    console.log("getting profile pic");
    let url;
    const data = {
      username: name,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(
      "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        url = data;
      });
    setProfilePic(url);
  };
  const [profilePic, setProfilePic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
  );
  window.onload = () => {
    getProfilePicture(username);
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={profilePic} />

        <div className="chat_headerInfo">
          <h3>{chat}</h3>
          <p>{isOnline}</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {chatHistory.map((msg) => {
          console.log(msg);
          return (
            <div
              className={username === msg.sentBy ? "message" : "message_other"}
            >
              <span className="chat_name">{msg.sentBy}</span>
              {msg.message}
              <span className="chat_timeStamp">{msg.createdAt}</span>
            </div>
          );
        })}
        {inputs.map((msg) => {
          console.log(msg);
          return (
            <div
              className={username === msg.sentBy ? "message" : "message_other"}
            >
              <span className="chat_name">{msg.sentBy}</span>
              {msg.message}
              <span className="chat_timeStamp">{msg.createdAt}</span>
            </div>
          );
        })}
      </div>

      <div className="chat_footer">
        <Draggable>
          <div className="emoji_picker">
            <InsertEmoticon
              fontSize="large"
              onClick={() => setShowPicker((val) => !val)}
            />
            {showPicker && <Picker onEmojiClick={onEmojiClick} />}
          </div>
        </Draggable>

        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <Mic />
      </div>
      <div className="contextMenu">
        {show ? (
          <ul
            className="menu"
            style={{
              top: anchorPoint.y,
              left: anchorPoint.x,
            }}
          >
            <li onClick={clickedMenu}>Share to..</li>
            <li>Cut</li>
            <li>Copy</li>
            <li>Paste</li>
            <hr className="divider" />
            <li>Refresh</li>
            <li>Exit</li>
          </ul>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default ChatBar;
