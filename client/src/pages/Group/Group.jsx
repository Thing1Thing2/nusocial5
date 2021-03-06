import React from "react";
import "./group.css";
import Header from "../../components/Header/Header";
import LeftBar from "../../components/LeftBar/LeftBar";
import ProfileMidGroup from "../../components/ProfileMid/ProfileMidGroup";

import { useLocation } from "react-router-dom";

const Group = () => {
  const location = useLocation();
  return (
    <div>
      <div className="groupHeader">
        <Header
          title={location.state.groupName}
          showHeaderCenter={true}
          showHeaderRight={true}
          link="/home"
          username={location.state.username}
        />
      </div>
      <div className="groupBody">
        <div className="groupBodyLeft">
          <LeftBar username={location.state.username} />
        </div>
        <div className="groupBodyMid">
          <ProfileMidGroup
            username={location.state.username}
            groupName={location.state.groupName}
            data={location.state.data}
          />
        </div>
      </div>
    </div>
  );
};

export default Group;
