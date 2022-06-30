import React from 'react'
import Header from '../../components/Header/Header'
import News from '../../components/NewsPanel/News'
import LeftBar from '../../components/LeftBar/LeftBar'
import RightBar from '../../components/RightBar/RightBar'
import './home.css'
import { useLocation } from 'react-router-dom'


const Home = () => {
  const location = useLocation();
  return (
    <>
    <div className = "homeHeader">
    <Header showHeaderCenter={true} showHeaderRight= {true} username = {location.state.username}/>
   
    </div>
    <div className = "homeBody">
      <div className="homeLeftBar">
        <LeftBar />
      </div>
      <div className="homeNewsFeed">
        <News  />
      </div>
      <div className="homeRightBar">
        <RightBar username = {location.state.username}/>
      </div>
    </div>
    </>
  )
}

export default Home;
