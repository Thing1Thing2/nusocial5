import React, { useState } from "react";
import "./profile.css";
import { ImageList, ImageListItem } from "@mui/material";
import { ProfileAlbumList, PostList } from "../test-data/test-data";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Post from "../Post/Post";
//import ReactPlayer from 'react-player'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ProfileMid = ({ username }) => {
  const [bioData, setBioData] = useState({
    bio: "",
  });
  const [bio, setBio] = useState("bio description");
  function handle(e) {
    const newdata = { ...bioData };
    newdata[e.target.id] = e.target.value;
    setBioData(newdata);
  }
  window.onload = () => {
    getProfilePicture(username);
    getCoverPicture(username);
    showConfirmedFriends();
  };
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
        console.log(data);
        url = data;
      });
    setProfilePic(url);
  };
  const [profilePic, setProfilePic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
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
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
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
    console.log(arr.length);
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
    dataBio = await dataBio.json();
    console.log(dataBio);
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
            <div className="profileFriendsNumber">{numOfFriends} Friend(s)</div>
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
            <div className="bioDetails">{bio}</div>
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
          {PostList.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileMid;
