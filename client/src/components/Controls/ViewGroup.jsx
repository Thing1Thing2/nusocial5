import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewGroup = ({ username, groupName }) => {
  const navigate = useNavigate();
  const data = {
    profilePic:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fischotter%2C_Lutra_Lutra.JPG/640px-Fischotter%2C_Lutra_Lutra.JPG",
    coverPic:
      "https://static.theprint.in/wp-content/uploads/2021/04/Sea_Otter._Little_Tutka_Bay_Alaska-scaled-e1617874012943.jpg?compress=true&quality=80&w=376&dpr=2.6",
    bio: "",
    numOfMembers: 0,
    memberAdmin: false,
  };
  const handleClick = async () => {
    const dataGroup = {
      groupName: groupName,
      username: username,
    };
    const getGroupData = async () => {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataGroup),
      };
      await fetch(
        "https://nusocial5.herokuapp.com/api/groupnames/getGroupData",
        settings
      ).then(async (info) => {
        let gd = await info.json();
        console.log(gd);
        if (gd.profilePictureURL !== null || gd.profilePictureURL !== "") {
          data.profilePic = gd.profilePictureURL;
        }
        if (gd.coverPictureURL !== null || gd.coverPictureURL !== "") {
        }
        data.bio = gd.description;
      });
    };
    const getNumOfMembers = async () => {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataGroup),
      };
      await fetch(
        "https://nusocial5.herokuapp.com/api/groupmemberships/getNumOfMembers",
        settings
      ).then(async (number) => {
        let n = await number.text();
        data.numOfMembers = n;
      });
    };

    const isAdmin = async () => {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataGroup),
      };
      await fetch(
        "https://nusocial5.herokuapp.com/api/groupmemberships/isAdmin",
        settings
      ).then(async (member) => {
        let m = await member.text();
        if (m === "admin") {
          data.memberAdmin = true;
        }
      });
    };
    await getGroupData();
    await getNumOfMembers();
    await isAdmin();
    console.log(data);

    navigate("/group", {
      state: {
        username: username,
        groupName: groupName,
        data: data,
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
