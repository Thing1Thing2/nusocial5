import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddEvent = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [eventData, setEventData] = useState({
    eventName: "",
    date: "",
    time: "",
    url: "",
  });
  function addEvent(e) {
    setOpen(false);
    console.log("username given: " + username.toString());
    e.preventDefault();
    const fileField = document.querySelector('input[id="photo"]');
    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", fileField.files[0]);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("eventName", eventData.eventName);
    formData.append("url", eventData.url);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/recentevents/addEvent", settings)
      .then((response) => response.text())
      .then((msg) => {
        setMsg(msg);
        setOpen(true);
      });
  }

  function handle(e) {
    const newdata = { ...eventData };
    newdata[e.target.id] = e.target.value;
    setEventData(newdata);
  }
  return (
    <div>
      <div className="AddPost">
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
        <form onSubmit={(e) => addEvent(e)}>
          <input
            type="text"
            placeholder="Enter eventName"
            id="eventName"
            onChange={(e) => handle(e)}
          />
          <input
            type="text"
            placeholder="Enter date"
            id="date"
            onChange={(e) => handle(e)}
          />
          <input
            type="text"
            placeholder="Enter time"
            id="time"
            onChange={(e) => handle(e)}
          />
          <input
            type="text"
            placeholder="Enter url"
            id="url"
            onChange={(e) => handle(e)}
          />
          <input
            type="file"
            id="photo"
            name="filename"
            placeholder="upload event picture"
          />
          <input type="submit" placeholder="submit post" />
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
