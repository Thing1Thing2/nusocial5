import React, {useState} from 'react'
import Header from '../../components/Header/Header'
import News from '../../components/NewsPanel/News'
import LeftBar from '../../components/LeftBar/LeftBar'
import RightBar from '../../components/RightBar/RightBar'
import './home.css'
import { useLocation } from 'react-router-dom'


const Home = () => {

  const [profilePicURL, setProfilePicURL] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg");

  const getChangedProfilePicture = (url) => {
    setProfilePicURL(url);
    console.log("changed profile picture: " + url)
  }
  
  const location = useLocation();
  return (
    <>
    <div className = "homeHeader">
    <Header showHeaderCenter={true} showHeaderRight= {true} username = {location.state.username} profilePicURL = {profilePicURL}/>
   
    </div>
    <div className = "homeBody">
      <div className="homeLeftBar">
        <LeftBar />
      </div>
      <div className="homeNewsFeed">
        <News  />
      </div>
      <div className="homeRightBar">
        <RightBar username = {location.state.username} changeProfilePic = {getChangedProfilePicture}/>
      </div>
    </div>
    </>
  )
}

export default Home;
