import React from "react";

const AddCoverPicGroup = (groupName, username) => {
  const addCoverPicture = (e) => {
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
      "https://nusocial5.herokuapp.com/api/groupmemberships/addCoverPicture",
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
      <form onSubmit={(e) => addCoverPicture(e)}>
        <input
          type="file"
          id="photo"
          name="filename"
          placeholder="upload cover picture"
        />
        <input type="submit" placeholder="submit image" />
      </form>
    </div>
  );
};

export default AddCoverPicGroup;
