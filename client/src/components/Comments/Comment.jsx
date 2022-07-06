import React, { useState } from "react";
import "./post.css";
import { Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Collapse } from "@mui/material";

const Comment = ({ comment }) => {
  const deleteComment = (commentID) => {
    const data = {
      commentID: commentID,
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
      "https://nusocial5.herokuapp.com/api/comments/deleteComment",
      settings
    )
      .then((result) => result.text())
      .then((result) => {
        window.alert(result);
      });
    setOpenComment(false);
  };

  const [openComment, setOpenComment] = useState(true);
  return (
    <Collapse in={openComment} fontSize="inherit">
      <div className="comment">
        <div className="postBottomAvatar">
          <Avatar src={comment[0]} />
        </div>
        <div className="commentBubble">
          <div className="commentName">{comment[1]}</div>
          <p>{comment[2]}</p>
        </div>
        <button className="postBottomSendButton" onClick={deleteComment}>
          Delete Comment
        </button>
        <CloseIcon onClick={() => setOpenComment(false)} />
      </div>
    </Collapse>
  );
};

export default Comment;
