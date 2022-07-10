import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddTestOrDeadline = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [testOrDeadline, setTestOrDeadline] = useState({
    module: "",
    type: "",
    date: "",
    time: "",
  });
  function handle(e) {
    const newdata = { ...testOrDeadline };
    newdata[e.target.id] = e.target.value;
    setTestOrDeadline(newdata);
  }
  const addTestOrDeadline = (e) => {
    setOpen(false);
    e.preventDefault();
    const formData = new FormData();
    formData.append("module", testOrDeadline.module);
    formData.append("type", testOrDeadline.type);
    formData.append("date", testOrDeadline.date);
    formData.append("time", testOrDeadline.time);
    formData.append("username", username);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/testsanddeadlines/addTestOrDeadline",
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
      <form onSubmit={(e) => addTestOrDeadline(e)}>
        <input
          type="text"
          placeholder="module"
          id="module"
          onChange={(e) => handle(e)}
        />
        <input
          type="text"
          placeholder="type"
          id="type"
          onChange={(e) => handle(e)}
        />
        <input
          type="text"
          placeholder="date"
          id="date"
          onChange={(e) => handle(e)}
        />
        <input
          type="text"
          placeholder="time"
          id="time"
          onChange={(e) => handle(e)}
        />
      </form>
    </div>
  );
};

export default AddTestOrDeadline;
