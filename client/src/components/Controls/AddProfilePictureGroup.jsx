import React from "react";

const AddProfilePictureGroup = ({ username, groupName }) => {
  const addProfilePicture = (e) => {
    e.preventDefault();
    const fileField = document.querySelector('input[id="profilePic"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("groupName", groupName);
    formData.append("photo", fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/groupmemberships/changeProfilePicture",
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
  };
  return (
    <div>
      <form onSubmit={(e) => addProfilePicture(e)}>
        <input
          type="file"
          id="profilePic"
          name="filename"
          placeholder="upload profile picture"
        />
        <input type="submit" placeholder="submit image" />
      </form>
    </div>
  );
};

export default AddProfilePictureGroup;
