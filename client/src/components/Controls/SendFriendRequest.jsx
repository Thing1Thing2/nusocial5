import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SendFriendRequest = ({ username, friendUsername }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const sendFriendRequest = async () => {
    setOpen(false);
    const data = {
      username: username,
      friend: friendUsername,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://nusocial5.herokuapp.com/api/friends/addFriend", settings)
      .then((response) => response.json())
      .then((data) => {
        setMsg(data);
        setOpen(true);
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
      <button className="sendFriendRequest" onClick={() => sendFriendRequest()}>
        Friend request
      </button>
    </div>
  );
};

export default SendFriendRequest;
