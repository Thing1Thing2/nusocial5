import React from "react";
import "./profile.css";
import Header from "../../components/Header/Header";
import LeftBar from "../../components/LeftBar/LeftBar";
import ProfileMid from "../../components/ProfileMid/ProfileMid";
import { useLocation } from "react-router-dom";

const Profile = () => {
  let Images = [];
  const albumImages = async () => {
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
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/students/albumPictures",
      settings
    ).then(async (results) => {
      let imgs = await results.json();
      let count = 0;
      imgs.forEach(async (img) => {
        if (count === 0 || count === 5 || count === 8) {
          Images.push([img, `picture${count}`, 2, 2]);
        } else if (count === 3 || count === 4 || count === 11) {
          Images.push([img, `picture${count}`, 1, 2]);
        } else {
          Images.push([img, `picture${count}`, 1, 1]);
        }
        count += 1;
        console.log(count);
        console.log(img);
        console.log(Images);
      });
      while (count <= 11) {
        if (count === 0 || count === 5 || count === 8) {
          Images.push(["", `picture${count}`, 2, 2]);
        } else if (count === 3 || count === 4 || count === 11) {
          Images.push(["", `picture${count}`, 1, 2]);
        } else {
          Images.push(["", `picture${count}`, 1, 1]);
        }
        count += 1;
        console.log(count);
        console.log(Images);
      }
    });
  };
  window.onload = function () {
    albumImages();
  };
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
          Images
          {Images}
          <ProfileMid username={location.state.username} Images={Images} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
