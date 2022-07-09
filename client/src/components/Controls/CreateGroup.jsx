import React, { useState } from "react";

const CreateGroup = ({ username }) => {
  function handle(e) {
    const newdata = { ...groupData };
    newdata[e.target.id] = e.target.value;
    setGroupData(newdata);
  }
  const createGroup = (e) => {
    e.preventDefault();
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("groupName", groupData.groupName);
    formData.append("image", fileField.files[0]);
    formData.append("description", groupData.description);
    formData.append("username", username);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/groupnames/addGroupName",
      settings
    )
      .then((result) => result.text())
      .then((msg) => {
        window.alert(msg);
      });
  };
  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
  });
  return (
    <div>
      {" "}
      <form onSubmit={(e) => createGroup(e)}>
        <input
          type="text"
          placeholder="Enter Group Name"
          id="groupName"
          onChange={(e) => handle(e)}
        />
        <input
          type="text"
          placeholder="Entre Group Description"
          id="description"
          onChange={(e) => handle(e)}
        />
        <input
          type="file"
          id="image"
          name="filename"
          placeholder="upload post picture"
        />
        <input type="submit" placeholder="submit group create request" />
      </form>
    </div>
  );
};

export default CreateGroup;
