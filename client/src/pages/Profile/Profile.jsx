import React from "react";
import "./profile.css";
import Header from "../../components/Header/Header";
import LeftBar from "../../components/LeftBar/LeftBar";
import ProfileMid from "../../components/ProfileMid/ProfileMid";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  return (
    <div className="profile">
      <div className="profileHeader">
        <Header
          title="Profile"
          showHeaderCenter={true}
          showHeaderRight={true}
          link="/home"
          username={location.state.username}
        />
      </div>
      <div className="profileBody">
        <div className="profileBodyLeft">
          <LeftBar username={location.state.username} />
        </div>
        <div className="profileBodyMid">
          <ProfileMid username={location.state.username} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
