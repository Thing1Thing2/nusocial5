import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewGroup = ({ username, groupName }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [desc, setDesc] = useState("");
  const [numOfMembers, setNumOfMembers] = useState(0);
  const [memberAdmin, setMemberAdmin] = useState(false);
  const data = {
    profilePic: "",
    coverPic: "",
    bio: "",
    numOfMembers: 0,
    memberAdmin: false,
  };
  const handleClick = async () => {
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
      ).then(async (info) => {
        let gd = await info.json();
        console.log(gd);
        setProfilePic(gd.profilePictureURL);
        setCoverPic(gd.coverPictureURL);
        setDesc(gd.description);
        data.profilePic = gd.profilePictureURL;
        data.coverPic = gd.coverPictureURL;
        data.bio = gd.description;
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
      ).then(async (number) => {
        let n = await number.text();
        setNumOfMembers(n);
        data.numOfMembers = n;
      });
    };

    const isAdmin = async () => {
      const data = {
        groupName: groupName,
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
      await fetch(
        "https://nusocial5.herokuapp.com/api/groupmemberships/isAdmin",
        settings
      ).then(async (member) => {
        let m = await member.text();
        if (m === "admin") {
          setMemberAdmin(true);
          data.memberAdmin = true;
        }
      });
    };
    await getGroupData();
    getNumOfMembers();
    isAdmin();

    navigate("/group", {
      state: {
        username: username,
        groupName: groupName,
        profilePicture: data.profilePic,
        coverPicture: data.coverPic,
        bio: data.bio,
        numOfMembers: data.numOfMembers,
        isAdmin: data.memberAdmin,
      },
    });
  };

  return (
    <div>
      <button className="postBottomSendButton" onClick={handleClick}>
        View Group
      </button>
    </div>
  );
};

export default ViewGroup;
