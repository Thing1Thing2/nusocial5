import React, { useState } from "react";
import "./post.css";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { ChatBubbleOutline } from "@mui/icons-material";
import Picker from "emoji-picker-react";
import CloseIcon from "@mui/icons-material/Close";
import { Collapse } from "@mui/material";

const Post = ({ post, username }) => {
  const [likes, setLikes] = useState(post[6]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post[7]);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (event, emojiObj) => {
    setComment((prevInput) => prevInput + emojiObj.emoji);
    setShowPicker(false);
  };
  const sendComment = async () => {
    if (comment !== "") {
      setCommentsList((list) => [...list, messageData]);
      setComments(comments + 1);
      const messageData = {
        postID: post[8],
        from: username,
        body: comment,
      };
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      };
      fetch("https://nusocial5.herokuapp.com/api/comments/addComment", settings)
        .then((response) => response.text())
        .then((data) => {
          window.alert(data);
          setComment("");
        });
    }
  };

  const deletePost = () => {
    const data = {
      title: post[3],
      username: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("https://nusocial5.herokuapp.com/api/posts/deletePost", settings)
      .then((result) => result.text())
      .then((result) => {
        window.alert(result);
      });
    setOpenPost(false);
  };

  const [openPost, setOpenPost] = useState(true);
  return (
    <div className="postContainer">
      <Collapse in={openPost} fontSize="inherit">
        <div className="postTop">
          <div className="avatarContainer">
            <Avatar src={post[0]} />
          </div>
          <div className="posterInfo">
            <div className="postOwner">{post[1]}</div>
            <div className="postTime">{post[2]}</div>
            <CloseIcon onClick={() => setOpenPost(false)} />
          </div>
        </div>
        <div className="postDetail">
          <div className="postText">
            {" "}
            {post[3]} : {post[4]}{" "}
          </div>
          <img className="postImages" src={post[5]} alt="" />
        </div>
        <div className="postInteraction">
          <div>
            <FavoriteBorderIcon
              className="interactIcon"
              onClick={() => {
                setLikes(isLiked ? likes - 1 : likes + 1);
                setIsLiked(!isLiked);
              }}
            />
            {likes}
          </div>
          <div>
            <ChatBubbleOutline
              className="interactIcon"
              onClick={() => setComments(comments + 1)}
            />
            {comments}
          </div>
        </div>
        <div className="commentSection">
          {commentsList.map((comment) => {
            return (
              <div className="comment">
                <div className="postBottomAvatar">
                  <Avatar src="https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg" />
                </div>
                <div className="commentBubble">
                  <div className="commentName">Samoyed Hoang</div>
                  <p>{comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="postBottom">
          <div className="postBottomAvatar">
            <Avatar src="https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg" />
          </div>
          <div className="postBottomCommentBox">
            <input
              className="reply"
              type="text"
              placeholder="Add comment"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendComment();
              }}
            ></input>
            <div className="additionStuff">
              <InsertEmoticonIcon
                className="emoji"
                onClick={() => setShowPicker((val) => !val)}
              />
              {showPicker && <Picker onEmojiClick={onEmojiClick} />}
              <InsertPhotoIcon />
            </div>
          </div>
          <button className="postBottomSendButton" onClick={sendComment}>
            Send
          </button>
          <button className="postBottomSendButton" onClick={deletePost}>
            Delete Post
          </button>
        </div>
      </Collapse>
    </div>
  );
};

export default Post;
