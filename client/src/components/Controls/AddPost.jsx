import React, { useState } from "react";

const AddPost = (username) => {
  const [postData, setPostData] = useState({
    body: "",
    title: "",
  });
  function submitPost(e) {
    console.log("username given: " + username.toString());
    e.preventDefault();
    const fileField = document.querySelector('input[id="photo"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", fileField.files[0]);
    formData.append("body", postData.body);
    formData.append("title", postData.title);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/posts/addPost", settings)
      .then((response) => response.text())
      .then((msg) => {
        window.alert(msg);
      });
  }

  function handle(e) {
    const newdata = { ...postData };
    newdata[e.target.id] = e.target.value;
    setPostData(newdata);
  }

  return (
    <div>
      <div className="AddPost">
        <form onSubmit={(e) => submitPost(e)}>
          <input
            type="text"
            placeholder="Entre message title"
            id="title"
            onChange={(e) => handle(e)}
          />
          <input
            type="text"
            placeholder="Entre message body"
            id="body"
            onChange={(e) => handle(e)}
          />
          <input
            type="file"
            id="photo"
            name="filename"
            placeholder="upload post picture"
          />
          <input type="submit" placeholder="submit post" />
        </form>
      </div>
    </div>
  );
};

export default AddPost;
