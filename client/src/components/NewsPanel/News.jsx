import React from 'react'
import "./news.css"
import NewsFeed from'./NewsFeed'
import { NewsData, PostList } from '../test-data/test-data'
import Post from '../Post/Post'

//Change props of NewsFeed to alter content of News panel
const News = () => {
  return (
    <>
      <div className = "News">
      {NewsData.map(news => (
        <NewsFeed img = {news.img} profileIcon = {news.profileIcon} title = {news.title} link = {news.link} />
      ))}
      </div>
      <div className="newsFeed">
        {PostList.map(post => (
          <Post post = {post} />
        ))}
      </div>
    </>
  )
}

export default News;



