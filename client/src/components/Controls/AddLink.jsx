import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddLink = (username) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [linkData, setLinkData] = useState({
    link: "",
    info: "",
  });

  const addLink = (e) => {
    console.log(username);
    setOpen(false);
    e.preventDefault();
    const fileField = document.querySelector('input[id="photoPic"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("info", linkData.info);
    formData.append("link", linkData.link);
    formData.append("image", fileField.files[0]);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/links/addLink", settings)
      .then((response) => response.text())
      .then((data) => {
        setMsg(data);
      })
      .catch((error) => {
        console.log(error);
        setMsg("error");
      });
    setOpen(true);
  };

  function handle(e) {
    const newdata = { ...linkData };
    newdata[e.target.id] = e.target.value;
    setLinkData(newdata);
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
      <form onSubmit={(e) => addLink(e)}>
        <input
          type="text"
          id="link"
          name="link"
          placeholder="link url"
          onChange={(e) => handle(e)}
        />
        <input
          type="text"
          id="info"
          name="info"
          placeholder="describe the link"
          onChange={(e) => handle(e)}
        />
        <input
          type="file"
          id="photoPic"
          name="filename"
          placeholder="upload link picture"
        />
        <input type="submit" placeholder="submit image" />
      </form>
    </div>
  );
};

export default AddLink;
