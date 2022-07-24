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
      <div className="posting">
            <div>
                <div className="avatar">
                    <Avatar src="https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg" />
                </div>
                <div className="postContextContainer">
                    <input 
                        className="postContext"
                        placeholder="Write something to share with your friends here"
                        id="body"
                        onChange={
                          (e) => handle(e)
                        }

                    />
                </div>
            </div>
            <div className="postingBottom">
                <div className="postingAdditional">
                    <div className="postImage">
                        <input type="file" id="photo" name="filename" />
                        <InsertPhotoIcon sx={{ fontSize: 40 }} className ="icon" />
                    </div>
                    <div className="postEmoji">
                        <InsertEmoticonIcon sx={{ fontSize: 40 }} className="icon" onClick = {() => setShowPicker(val => !val)}/>
                        <i>
                            {showPicker && <Picker onEmojiClick={ onEmojiClick}/> }
                        </i>
                    </div>
                </div>
                <button className="postingButton" onClick={(e) => submitPost(e)}>
                    Post
                </button>
            </div>  
        </div>
    </div>
  );
};

export default AddPost;
