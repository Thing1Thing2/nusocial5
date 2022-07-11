import React, { useState } from "react";
import "./profile.css";
import { ImageList, ImageListItem } from "@mui/material";
import { ProfileAlbumList } from "../test-data/test-data";
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
    getBio();
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
    dataBio = await dataBio.text();
    console.log(dataBio);
    setBio(dataBio);
  };

  const [Images, setImages] = useState([]);
  const albumImages = async () => {
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
    fetch(
      "https://nusocial5.herokuapp.com/api/students/albumPictures",
      settings
    ).then(async (results) => {
      console.log(results);
      let imgs = await results.json();
      console.log(imgs);
      setImages(imgs);
    });
    console.log(Images.length);
    ProfileAlbumList = [
      {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Picture1",
        rows: 2,
        cols: 2,
      },
      {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Picture2",
      },
      {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Picture3",
      },
      {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Picture4",
        cols: 2,
      },
      {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Picture5",
        cols: 2,
      },
      {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Picture6",
        author: "@arwinneil",
        rows: 2,
        cols: 2,
      },
      {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Picture7",
      },
      {
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Picture8",
      },
      {
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Picture9",
        rows: 2,
        cols: 2,
      },
      {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Picture10",
      },
      {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Picture11",
      },
      {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Picture12",
        cols: 2,
      },
    ];
  };

  let ProfileAlbumList = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      cols: 2,
    },
  ];

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
              <button onClick={albumImages}>Refresh Images</button>
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
          <News username={username} />
        </div>
      </div>
    </div>
  );
};

export default ProfileMid;
