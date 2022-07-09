import React from "react";

const JoinGroup = ({ groupName, username }) => {
  const joinGroup = async (groupName) => {
    const info = {
      username: username,
      groupName: groupName,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/groupmemberships/joinGroup",
      settings
    )
      .then((result) => result.text())
      .then((result) => {
        window.alert(result);
      });
  };
  return (
    <div>
      <button
        className="postBottomSendButton"
        onClick={() => joinGroup(groupName)}
      >
        Join Group
      </button>
    </div>
  );
};

export default JoinGroup;
