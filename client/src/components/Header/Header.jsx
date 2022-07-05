import React, {useState} from 'react';
import './Header.css';
import { Chat, Home, Notifications, Search } from "@mui/icons-material";
import { Avatar } from '@mui/material';
import Logo from "../Logo/Logo";
import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = ({link, title,showHeaderCenter, showHeaderRight, username, socket}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected]= useState("");
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
fetch("https://nusocial5.herokuapp.com/api/students/logoutStudent", settings).then(response => response.text()).then(data => {
  console.log(data)
  if (data === "successfully logged out"){
    navigate("/");
  }
})
}

const handleSelect = (e) => {
  e.target.value === "My Profile"? navigate("/profile", {state:{username: location.state.username}})
  : e.target.value === "Log Out"? logoutFetch(): setSelected("")}

  const getProfilePicture = async (name) => {
    let url;
    const data = {
      username: name,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  await fetch("https://nusocial5.herokuapp.com/api/students/getProfilePicture", settings).then(response => response.text()).then(data => {
    console.log(data)
    url = data;
  })
  setProfilePic(url);
  }

  const [profilePic, setProfilePic] = useState("https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/ec/83/3a/ec833a37-1e6f-958e-9e60-4f358795405f/source/512x512bb.jpg");
  return (
    <div className="header">
        <div className="headerLeft">
          <Logo link = {link} title = {title} username = {location.state.username}/>
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
     
        <Chat fontSize='large' htmlColor='#1f3d85' onClick = {() => navigate("/personalChat", {state:{username: location.state.username, socket: location.state.socket}})} />
          <DoubleArrowTwoToneIcon htmlColor='#1f3d85' onClick = {() => navigate("/quicklinks", {state:{username: location.state.username}})} />
      
        <span className="iconBadge">3</span>
      </div>
    </div>

   
  <Select
    IconComponent={() => (
      <Avatar src={profilePic}>
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
