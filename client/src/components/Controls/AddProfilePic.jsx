import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddProfilePic = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  function addProfilePicture(e) {
    setOpen(false);
    e.preventDefault();
    const fileField = document.querySelector('input[id="profilePic"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("photo", fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/students/addProfilePicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        setMsg(data);
      })
      .catch((error) => {
        console.log(error);
        setMsg("error");
      });
    setOpen(true);
  }

  return (
    <div>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              {" "}
              <CloseIcon fontSize="inherit" />{" "}
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
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

export default AddProfilePic;
