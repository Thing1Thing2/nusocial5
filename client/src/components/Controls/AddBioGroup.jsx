import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddBioGroup = ({ username, groupName }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [bioData, setBioData] = useState({
    bio: "",
  });
  function handle(e) {
    const newdata = { ...bioData };
    newdata[e.target.id] = e.target.value;
    setBioData(newdata);
  }
  const addBio = (e) => {
    setOpen(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", bioData.bio);
    formData.append("username", username);
    formData.append("groupName", groupName);
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
        if (msg === "Added bio") {
          setSeverity("success");
        } else {
          setSeverity("error");
        }
        setOpen(true);
        setMsg(msg);
      });
  };
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
