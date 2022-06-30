import React, {useState} from 'react';
import './Header.css';
import { Chat, Home, Notifications, Search } from "@mui/icons-material";
import { Avatar } from '@mui/material';
import Logo from "../Logo/Logo";
import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({link, title,showHeaderCenter, showHeaderRight, username}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected]= useState("");
  /*
  const logOut = () => {
    const data = {
    username: location.state.username
};
axios.post("http://localhost:8000/api/students/logoutStudent", data).then(response => {
   console.log(response.data);
navigate("/")
}).catch(
  function (error) {
if (error.response) {
  // The request was made and the server responded with a status code
  // that falls out of the range of 2xx
  console.log(error.response.data);
  console.log(error.response.status);
  console.log(error.response.headers);
}})}*/


const logoutFetch = () => {
  const data = {
    username: location.state.username,
  };
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
fetch("https://nusocial4.herokuapp.com/api/students/logoutStudent", settings).then(response => response.text()).then(data => {
  console.log(data)
})
}

const handleSelect = (e) => {
  e.target.value === "My Profile"? navigate("/profile", {state:{username: location.state.username}})
  : e.target.value === "Log Out"? logoutFetch(): setSelected("")}
  

  return (
    <div className="header">
        <div className="headerLeft">
          <Logo link = {link} title = {title} />
          </div>
        {showHeaderCenter &&   <div className="headerCenter">
  <div className="searchBar">
    <Search style={{marginLeft: "20px", fontSize: "25px"}}/>
    <input 
      placeholder="search for modules, friends,..." 
      className="searchInput"
    >
    </input>
  </div>
  </div>}
        {showHeaderRight && <div className="headerRight">
    <div className="headerIcon">
      <div className="iconItem">
        <Home fontSize='large' htmlColor='#1f3d85' onClick = {() => navigate("/home", {state:{username: location.state.username}})}/>
      </div>
      <div className="iconItem">
   
        <Notifications fontSize='large' htmlColor='#1f3d85' onClick = {() => navigate("/newsandnots", {state:{username: location.state.username}})}/>
        <span className="iconBadge">4</span>
      </div>
      <div className="iconItem">
     
        <Chat fontSize='large' htmlColor='#1f3d85' onClick = {() => navigate("/personalChat", {state:{username: location.state.username}})}/>
          <DoubleArrowTwoToneIcon htmlColor='#1f3d85' onClick = {() => navigate("/quicklinks", {state:{username: location.state.username}})} />
      
        <span className="iconBadge">3</span>
      </div>
    </div>

   
  <Select
    IconComponent={() => (
      <Avatar src="https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg">
    3
    </Avatar>
    )}
    value = {selected}
    sx={{autoWidth:true}}
    onChange = {handleSelect}
  >
    <MenuItem value="My Profile" >My Profile</MenuItem>
    <MenuItem value="Log Out">Log Out</MenuItem>
  </Select>
  
  </div>}  

    </div>
  )
}

Header.defaultProps = {
  title: 'NUSocial',
  showHeaderCenter: false,
  showHeaderRight: false
}

export default Header
//https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg