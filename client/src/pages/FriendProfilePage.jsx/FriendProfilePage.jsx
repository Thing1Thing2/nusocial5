import React, { useState } from "react";
import "./friendProfilePage.css";
import Header from "../../components/Header/Header";
import LeftBar from "../../components/LeftBar/LeftBar";
import { ImageList, ImageListItem } from "@mui/material";
import { ProfileAlbumList } from "../../components/test-data/test-data";
import News from "../../components/NewsPanel/News";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { useLocation } from "react-router-dom";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const FriendProfilePage = () => {
  const location = useLocation();
  const [bio, setBio] = useState("bio description");

  window.onload = () => {
    getProfilePicture(location.state.friend);
    getCoverPicture(location.state.friend);
    showConfirmedFriends();
    getBio();
  };

  const getCoverPicture = async (name) => {
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
    };
    await fetch(
      "https://nusocial5.herokuapp.com/api/students/getCoverPicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        url = data;
      });
    setCoverPic(url);
  };

  const [coverPic, setCoverPic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
  );

  const showConfirmedFriends = async () => {
    const info = {
      username: location.state.friend,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };

    let res = await fetch(
      "https://nusocial5.herokuapp.com/api/friends/getAllConfirmedFriends",
      settings
    );
    let arr = await res.json();
    console.log(arr.length);
    setNumOfFriends(arr.length);
  };

  const [numOfFriends, setNumOfFriends] = useState(0);

  const getProfilePicture = async (name) => {
    let url;
    const data = {
      username: location.state.friend,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(
      "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        url = data;
      });
    setProfilePic(url);
  };

  const [profilePic, setProfilePic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
  );

  const getBio = async () => {
    const data = {
      username: location.state.friend,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let dataBio = await fetch(
      "https://nusocial5.herokuapp.com/api/students/getBio",
      settings
    );
    dataBio = await dataBio.text();
    console.log(dataBio);
    setBio(dataBio);
  };
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
          <div className="profileMid">
            <div className="profileTopContainer">
              <img className="profileCoverImg" src={coverPic} alt="" />
              <div className="profileAvatarInfoContainer">
                <img className="profileAvatar" src={profilePic} alt="" />
                <div className="profileInfoContainer">
                  <div className="profileName">{location.state.friend}</div>
                  <div className="profileFriendsNumber">
                    {numOfFriends} Friend(s)
                  </div>
                </div>
              </div>
            </div>
            <div className="profileBottom">
              <div className="profileBottomLeft">
                <div className="profileBio">
                  <div className="bioTitle">
                    <div className="bioIcon">
                      <FaceTwoToneIcon sx={{ fontSize: 40 }} />
                    </div>
                    <div className="bio">BIO</div>
                  </div>
                  <div className="bioDetails">{bio}</div>
                </div>
                <div className="profileAlbum">
                  <div className="albumTitle">
                    <div className="albumIcon">
                      <PhotoLibraryIcon sx={{ fontSize: 40 }} />
                    </div>
                    Album
                  </div>
                  <div className="albumDetail">
                    <ImageList
                      sx={{ width: 400, height: 450, margin: 0 }}
                      variant="quilted"
                      cols={4}
                      rowHeight={121}
                    >
                      {ProfileAlbumList.map((item) => (
                        <ImageListItem
                          key={item.img}
                          cols={item.cols || 1}
                          rows={item.rows || 1}
                        >
                          <img
                            {...srcset(item.img, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </div>
                </div>
              </div>
              <div className="profileBottomRight">
                <News username={location.state.friend} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfilePage;
