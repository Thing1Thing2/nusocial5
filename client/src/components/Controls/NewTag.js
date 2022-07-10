import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const NewTag = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [tag, setTag] = useState({
    tag: "",
  });

  function handle(e) {
    const newdata = { ...tag };
    newdata[e.target.id] = e.target.value;
    setTag(newdata);
  }

  const createTag = (e) => {
    setOpen(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("tag", tag.tag);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/trendingtags/createTag",
      settings
    )
      .then((result) => result.text())
      .then((msg) => {
        setOpen(true);
        setMsg(msg);
        console.log(msg);
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

      <form onSubmit={(e) => createTag(e)}>
        <input
          type="text"
          placeholder="tag"
          id="tag"
          onChange={(e) => handle(e)}
        />
        <button type="submit">Create Tag</button>
      </form>
    </div>
  );
};

export default NewTag;
