import React, { useState } from "react";
import "./news.css";
import NewsFeed from "./NewsFeed";
import { NewsData } from "../test-data/test-data";
import Post from "../Post/Post";

//Change props of NewsFeed to alter content of News panel
const News = ({ username }) => {
  function submitPost(e) {
    e.preventDefault();
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("username", postData.username);
    formData.append("image", fileField.files[0]);
    formData.append("body", postData.body);
    formData.append("title", postData.title);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/posts/addPost", settings)
      .then((response) => response.text())
      .then((msg) => {
        window.alert(msg);
      });
  }

  function handle(e) {
    const newdata = { ...postData };
    newdata[e.target.id] = e.target.value;
    setPostData(newdata);
  }

  const [postData, setPostData] = useState({
    username: username,
    body: "",
    title: "",
  });

  const [PostList, setPostList] = useState([]);

  const getAllMyPosts = async () => {
    setPostList([]);
    let useAvatar = "";

    const info = {
      username: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/posts/getMyPosts",
      settings
    ).then(async (result) => {
      let myPosts = await result.json();

      const data = {
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
      await fetch(
        "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
        settings
      )
        .then((res) => res.text())
        .then((gotPic) => {
          useAvatar = gotPic;
        });

      myPosts.reverse().forEach(async (post) => {
        setPostList((list) => [
          ...list,
          [
            useAvatar,
            username,
            post.createdAt,
            post.title,
            post.body,
            post.image,
            post.likesCount,
            post.commentsCount,
            post.postID,
          ],
        ]);
      });
    });
  };

  return (
    <>
      <div className="News">
        {NewsData.map((news) => (
          <NewsFeed
            img={news.img}
            profileIcon={news.profileIcon}
            title={news.title}
            link={news.link}
          />
        ))}
      </div>
      <div className="AddPost">
        <form onSubmit={(e) => submitPost(e)}>
          <input
            type="text"
            placeholder="Entre message title"
            id="title"
            onChange={(e) => handle(e)}
          />
          <input
            type="text"
            placeholder="Entre message body"
            id="body"
            onChange={(e) => handle(e)}
          />
          <input
            type="file"
            id="image"
            name="filename"
            placeholder="upload post picture"
          />
          <input type="submit" placeholder="submit image" />
        </form>
        <input
          type="submit"
          placeholder="refresh feed"
          onClick={getAllMyPosts}
          value="refresh suggestion"
        />
      </div>

      <div className="newsFeed">
        {PostList.map((post) => (
          <Post post={post} username={username} />
        ))}
      </div>
    </>
  );
};

export default News;
