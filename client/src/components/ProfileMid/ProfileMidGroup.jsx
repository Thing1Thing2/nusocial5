import React, { useState } from "react";
import "./profile.css";
import { ImageList, ImageListItem } from "@mui/material";
import { ProfileAlbumList } from "../test-data/test-data";
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

const ProfileMidGroup = ({ groupName, username }) => {
  const [desc, setDesc] = useState("bio");

  window.onload = () => {
    getGroupData();
    getNumOfMembers();
  };

  const [coverPic, setCoverPic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
  );
  const [profilePic, setProfilePic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
  );

  const [numOfMembers, setNumOfMembers] = useState("0");

  const getGroupData = async () => {
    const data = {
      groupName: groupName,
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
      "https://nusocial5.herokuapp.com/api/groupnames/getGroupData",
      settings
    )
      .then(async (dataBio) => {
        await dataBio.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  const getNumOfMembers = async () => {
    const data = {
      groupName: groupName,
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
      "https://nusocial5.herokuapp.com/api/groupmemberships/getNumOfMembers",
      settings
    )
      .then(async (number) => {
        await number.text();
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="profileMid">
      <div className="profileTopContainer">
        <img className="profileCoverImg" src={coverPic} alt="" />
        <div className="profileAvatarInfoContainer">
          <img className="profileAvatar" src={profilePic} alt="" />
          <div className="profileInfoContainer">
            <div className="profileName">{groupName}</div>
            <div className="profileFriendsNumber">{numOfMembers} Member(s)</div>
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
            <div className="bioDetails">{desc}</div>
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
        <div className="profileBottomRight"></div>
      </div>
    </div>
  );
};

export default ProfileMidGroup;
