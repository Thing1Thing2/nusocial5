import React from "react";

const SendFriendRequest = ({ username, friendUsername }) => {
  const sendFriendRequest = async () => {
    const data = {
      username: username,
      friend: friendUsername,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://nusocial5.herokuapp.com/api/friends/addFriend", settings)
      .then((response) => response.json())
      .then((data) => {
        window.alert(data);
      });
  };
  return (
    <div>
      <button className="sendFriendRequest" onClick={() => sendFriendRequest()}>
        Friend request
      </button>
    </div>
  );
};

export default SendFriendRequest;
