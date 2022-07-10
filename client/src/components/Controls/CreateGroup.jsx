import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const CreateGroup = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
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
        setMsg(msg);
      });
  };
  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
  });
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
