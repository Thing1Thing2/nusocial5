import React, { useState, useEffect } from "react";
import "./profile.css";
import { ImageList, ImageListItem } from "@mui/material";
import News from "../NewsPanel/News";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

//import ReactPlayer from 'react-player'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ProfileMid = ({ username, data, Images }) => {
  const [bioData, setBioData] = useState({
    bio: "",
  });
  const [bio, setBio] = useState("bio description");
  function handle(e) {
    const newdata = { ...bioData };
    newdata[e.target.id] = e.target.value;
    setBioData(newdata);
  }
  
  useEffect(() => {
    getProfilePicture(username);
  }, []);
  useEffect(() => {
    getCoverPicture(username);
  }, []);
  useEffect(() => {
    showConfirmedFriends();
  }, []);
  useEffect(() => {
    getBio();
  }, []);

  const getProfilePicture = async (name) => {
    let url;
    console.log("getting profile pic");
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
    "https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
  );

  function addCoverPicture(e) {
    e.preventDefault();
    const fileField = document.querySelector('input[id="photo"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("photo", fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/students/addCoverPicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        window.alert(data);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error);
      });
  }

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
    "https://www.facebook.com/106558717708937/photos/a.106559117708897/106559104375565/?type=3"
  );

  const showConfirmedFriends = async () => {
    const info = {
      username: username,
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
    setNumOfFriends(arr.length);
  };

  const [numOfFriends, setNumOfFriends] = useState(0);

  const addBio = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bioData.bio);
    formData.append("username", username);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/students/addBio", settings)
      .then((result) => result.text())
      .then((msg) => {
        window.alert(msg);
      });
  };

  const getBio = async () => {
    const data = {
      username: username,
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
    setBio(dataBio);
  };

  return (
    <div className="profileMid">
      <div className="profileTopContainer">
        <img className="profileCoverImg" src={coverPic} alt="" />
        <div className="profileAvatarInfoContainer">
          <img className="profileAvatar" src={profilePic} alt="" />
          <div className="profileInfoContainer">
            <div className="profileName">{username}</div>
            <div className="profileFriendsNumber">
              {data.numOfFriends} Friend(s)
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
              <form onSubmit={(e) => addBio(e)}>
                <input
                  type="text"
                  placeholder="Enter Group Name"
                  id="groupName"
                  onChange={(e) => handle(e)}
                />
              </form>
            </div>
            <div className="bioDetails">{data.bio}</div>
          </div>
          <div className="profileAlbum">
            <form onSubmit={(e) => addCoverPicture(e)}>
              <input
                type="file"
                id="photo"
                name="filename"
                placeholder="upload cover picture"
              />
              <input type="submit" placeholder="submit image" />
            </form>
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
                {Images.map((item) => (
                  <ImageListItem key={item[0]} cols={item[3]} rows={item[2]}>
                    <img
                      {...srcset(item[0], 121, item[2], item[3])}
                      alt={item[1]}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        </div>
        <div className="profileBottomRight">
          <News username={username} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMid;
