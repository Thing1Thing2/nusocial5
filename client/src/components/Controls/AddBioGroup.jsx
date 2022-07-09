import React, { useState } from "react";

const AddBioGroup = ({ username, groupName }) => {
  const [bioData, setBioData] = useState({
    bio: "",
  });
  function handle(e) {
    const newdata = { ...bioData };
    newdata[e.target.id] = e.target.value;
    setBioData(newdata);
  }
  const addBio = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bioData.bio);
    formData.append("username", username);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/groupmemberships/addBio",
      settings
    )
      .then((result) => result.text())
      .then((msg) => {
        window.alert(msg);
      });
  };
  return (
    <div>
      <form onSubmit={(e) => addBio(e)}>
        <input
          type="text"
          placeholder="Add bio"
          id="bio"
          onChange={(e) => handle(e)}
        />
      </form>
    </div>
  );
};

export default AddBioGroup;
