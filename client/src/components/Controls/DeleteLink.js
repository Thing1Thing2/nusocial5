import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const DeleteLink = ({ username, info, link }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  const deleteLink = () => {
    setOpen(false);
    const data = {
      username: username,
      info: info,
      link: link,
    };
    const settings = {};
    fetch("https://nusocial5.herokuapp.com/api/links/deleteLink", settings)
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
      <button onClick={deleteLink}>Delete Link</button>
    </div>
  );
};

export default DeleteLink;
