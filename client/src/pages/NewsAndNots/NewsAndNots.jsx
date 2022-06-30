import React, {useState}from 'react'
import "./NewsAndNots.css"
import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom'; 


const NewsAndNots = () => {
  
  const sendFriendRequest = async (username) => {
    const data = {
      friendUsername: friendUsername,
      yourUsername: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
fetch("http://localhost:8000/api/friends/addFriend", settings).then(response => response.text()).then(data => {
  console.log(data);
})};

  const location = useLocation();
  const [friendUsername, setFriendUsername] = useState("");
  return (
    <div >
    <div className = "header">
    <Header title = "News and Notifications" showHeaderCenter={true} showHeaderRight={true} link = "/home" username = {location.state.username}/>
    </div>
      
      <div>
      <input placeholder = "friend username" onChange = {(e) => {
        setFriendUsername(e.target.value);
      }}   onKeyPress = { (event) => {
      event.key === 'Enter' && sendFriendRequest(location.state.username);
    }}/>
    </div>
    </div>
  )
}

export default NewsAndNots;
