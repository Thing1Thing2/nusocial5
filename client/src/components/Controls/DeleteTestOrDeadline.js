import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { deleteTestOrDeadline } from "../../../../controllers/testsAndDeadlinesController";

const DeleteTestOrDeadline = ({ id, username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  const deleteTestOrDeadline = async () => {
    setOpen(false);
    const info = {
      id: id,
      username: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/testsanddeadlines/deleteTestOrDeadline",
      settings
    )
      .then((result) => result.text())
      .then((result) => {
        setMsg(result);
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
      <button className="deleteTestOrDeadline" onClick={deleteTestOrDeadline}>
        Delete
      </button>
    </div>
  );
};

export default DeleteTestOrDeadline;
