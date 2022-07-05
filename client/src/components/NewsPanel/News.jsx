import React, { useState } from "react";
import "./news.css";
import NewsFeed from "./NewsFeed";
import { NewsData, PostList } from "../test-data/test-data";
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
  });

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
            placeholder="Entre message body"
            id="body"
            onChange={(e) => handle(e)}
          />
          <input
            type="file"
            id="image"
            name="filename"
            placeholder="upload profile picture"
          />
          <input type="submit" placeholder="submit image" />
        </form>
      </div>

      <div className="newsFeed">
        {PostList.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </>
  );
};

export default News;
