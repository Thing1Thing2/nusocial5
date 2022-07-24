import './addPost.css';
import React, { useState } from "react";
import { Alert } from "@mui/material";
import { Avatar } from '@mui/material'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import Picker from "emoji-picker-react"
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const AddPost = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [postData, setPostData] = useState({
    body: "",
  });
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (event, emojiObj) => {
    setShowPicker(false);
}
  function submitPost(e) {
    setOpen(false);
    console.log("username given: " + username.toString());
    e.preventDefault();
    const fileField = document.querySelector('input[id="photo"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", fileField.files[0]);
    formData.append("body", postData.body);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/posts/addPost", settings)
      .then((response) => response.text())
      .then((msg) => {
        setMsg(msg);
        setOpen(true);
      });
  }

  function handle(e) {
    const newdata = { ...postData };
    newdata[e.target.id] = e.target.value;
    setPostData(newdata);
  }

  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              {" "}
              <CloseIcon fontSize="inherit" />{" "}
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
      <div className="AddPost">
        <Collapse in={open}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {" "}
                <CloseIcon fontSize="inherit" />{" "}
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        </Collapse>
        <form onSubmit={(e) => submitPost(e)}>
          <input
            type="text"
            placeholder="Enter message body"
            id="body"
            onChange={(e) => handle(e)}
          />
          <input
            type="file"
            id="photo"
            name="filename"
            placeholder="upload post picture"
          />
          <input type="submit" placeholder="submit post" />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
