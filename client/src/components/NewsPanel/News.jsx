import React, { useState } from "react";
import "./news.css";
import NewsFeed from "./NewsFeed";
import { NewsData } from "../test-data/test-data";
import Post from "../Post/Post";
import AddPost from "../Controls/AddPost.jsx";

const News = ({ username }) => {
  const [PostList, setPostList] = useState([]);

  const getAllPosts = async () => {
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
      "https://nusocial5.herokuapp.com/api/posts/getAllPosts",
      settings
    ).then(async (result) => {
      let posts = await result.json();

      posts.forEach(async (post) => {
        const data = {
          username: post.from,
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
        setPostList((list) => [
          ...list,
          [
            useAvatar,
            post.from,
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
      <AddPost username={username} />
      <input
        type="submit"
        placeholder="refresh feed"
        onClick={getAllPosts}
        value="refresh suggestion"
      />

      <div className="newsFeed">
        {PostList.map((post) => (
          <Post post={post} username={post[1]} />
        ))}
      </div>
    </>
  );
};

export default News;
