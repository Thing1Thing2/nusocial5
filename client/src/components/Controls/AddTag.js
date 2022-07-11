import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddTag = ({ eventID, type }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [taggingDetail, setTaggingDetail] = useState({
    tag: "",
  });
  function handle(e) {
    const newdata = { ...taggingDetail };
    newdata[e.target.id] = e.target.value;
    setTaggingDetail(newdata);
  }
  const addTag = (e) => {
    setOpen(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventID", eventID);
    formData.append("type", type);
    formData.append("tag", taggingDetail.tag);

    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/trending/addTag", settings)
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
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
      <form onSubmit={(e) => addTag(e)}>
        <input
          type="text"
          placeholder="tag"
          id="tag"
          onChange={(e) => handle(e)}
        />
        <button onClick={(e) => addTag(e)}>Add Tag</button>
      </form>
    </div>
  );
};

export default AddTag;
