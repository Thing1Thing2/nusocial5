import React, { useState } from "react";
import "./post.css";
import { Avatar } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { ChatBubbleOutline } from "@mui/icons-material";
import Picker from "emoji-picker-react";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post[5]);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post[6]);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (event, emojiObj) => {
    setComment((prevInput) => prevInput + emojiObj.emoji);
    setShowPicker(false);
  };
  const sendMessage = async () => {
    if (comment !== "") {
      setCommentsList((list) => [...list, messageData]);
      setComments(comments + 1);
      const messageData = {
        sender_nusocial_id: "sender_id",
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
      fetch("https://nusocial5.herokuapp.com/api/posts/addPost", settings)
        .then((response) => response.text())
        .then((data) => {
          setComment("");
        });
    }
  };

  return (
    <div className="postContainer">
      <div className="postTop">
        <div className="avatarContainer">
          <Avatar src={post[0]} />
        </div>
        <div className="posterInfo">
          <div className="postOwner">{post[1]}</div>
          <div className="postTime">{post[2]}</div>
        </div>
      </div>
      <div className="postDetail">
        <div className="postText"> {post[3]} </div>
        <img className="postImages" src={post[4]} alt="" />
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
              event.key === "Enter" && sendMessage();
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
        <button className="postBottomSendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Post;
