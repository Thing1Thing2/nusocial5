import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewGroup = ({ username, groupName }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [desc, setDesc] = useState("");
  const [numOfMembers, setNumOfMembers] = useState(0);
  const [memberAdmin, setMemberAdmin] = useState(false);

  const handleClick = () => {
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
        console.log(m);
        if (m === "admin") {
          setMemberAdmin(true);
        }
      });
    };
    getGroupData();
    getNumOfMembers();
    isAdmin();
    console.log(profilePic);
    console.log(coverPic);
    console.log(desc);
    console.log(numOfMembers);
    console.log(memberAdmin);

    navigate("/group", {
      state: {
        username: username,
        groupName: groupName,
        profilePicture: profilePic,
        coverPicture: coverPic,
        bio: desc,
        numOfMembers: numOfMembers,
        isAdmin: memberAdmin,
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
