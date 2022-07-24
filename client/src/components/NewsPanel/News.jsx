import React, { useState, useRef, useEffect } from "react";
import "./news.css";
import NewsFeed from "./NewsFeed";
import Post from "../Post/Post";
import AddPost from "../Controls/AddPost.jsx";
import AddNews from "../Controls/AddNews.jsx";

const News = ({ username }) => {
  let guest = username.includes("guest");
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

  const [News, setNews] = useState([]);

  const getNews = () => {
    setNews([]);
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
    fetch("https://nusocial5.herokuapp.com/api/news/getNews", settings)
      .then(async (arr) => {
        let data = await arr.json();
        setNews(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPosts;
    getNews;
  }, []);
  
  if (guest) {
    return (
      <>
        <div className="News">
          {News.map((news) => (
            <NewsFeed
              img={news[1]}
              profileIcon={news[1]}
              title={news[0]}
              link={news[2]}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>

        <div className="News">
          {News.map((news) => (
            <NewsFeed
              img={news[1]}
              profileIcon={news[1]}
              title={news[0]}
              link={news[2]}
            />
          ))}
            <AddNews username={username} />
        </div>
        <AddPost username={username} />

        <div className="newsFeed">
          {PostList.map((post) => (
            <Post post={post} username={post[1]} />
          ))}
        </div>
      </>
    );
  }
};

export default News;
