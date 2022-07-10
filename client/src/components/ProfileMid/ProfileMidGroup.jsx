import React, { useState } from "react";
import "./profile.css";
import { ImageList, ImageListItem } from "@mui/material";
import { ProfileAlbumList } from "../test-data/test-data";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AddBioGroup from "../Controls/AddBioGroup";
import AddCoverPicGroup from "../Controls/AddCoverPicGroup";
import AddProfilePictureGroup from "../Controls/AddProfilePictureGroup";

//import ReactPlayer from 'react-player'

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ProfileMidGroup = ({ groupName, username, data }) => {
  return (
    <div className="profileMid">
      <div className="profileTopContainer">
        <img className="profileCoverImg" src={data.coverPic} alt="" />
        <div className="profileAvatarInfoContainer">
          <img className="profileAvatar" src={data.profilePic} alt="" />
          <div className="profileInfoContainer">
            <div className="profileName">{groupName}</div>
            <div className="profileFriendsNumber">
              {data.numOfMembers} Member(s)
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
              {data.memberAdmin ? (
                <AddBioGroup groupName={groupName} username={username} />
              ) : (
                <></>
              )}
            </div>
            <div className="bioDetails">{data.bio}</div>
          </div>
          <div className="profileAlbum">
            {data.memberAdmin ? (
              <AddCoverPicGroup groupName={groupName} username={username} />
            ) : (
              <></>
            )}
            {data.memberAdmin ? (
              <AddProfilePictureGroup
                groupName={groupName}
                username={username}
              />
            ) : (
              <></>
            )}
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
