import React from "react"
import './group.css'
import Header from '../../components/Header/Header'
import LeftBar from '../../components/LeftBar/LeftBar'
import ProfileMid from '../../components/ProfileMid/ProfileMid'
import { useLocation } from 'react-router-dom'

const Group = () => {
  const location = useLocation();
  return (
    <div >
        <div className="groupHeader">
        <Header title = {location.state.group} showHeaderCenter={true} showHeaderRight={true} link = "/home" username = {location.state.username}/>
        </div>
        <div className="groupBody">
    
            <div className="groupBodyLeft">
                <LeftBar />
            </div>
            <div className="groupBodyMid">
                <ProfileMid username = {location.state.group}  />
            </div>
        </div>
    </div>
  )
}

export default Group
