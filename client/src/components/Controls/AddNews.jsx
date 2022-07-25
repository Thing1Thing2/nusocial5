import React, { useState } from "react";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AddNews = ({ username }) => {
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [newsData, setNewsData] = useState({
    title: "",
    url: "",
  });

  function addNews(e) {
    setOpen(false);
    e.preventDefault();
    const fileField = document.querySelector('input[id="coverImage"]');
    const formData = new FormData();
    formData.append("coverImage", fileField.files[0]);
    formData.append("username", username);
    formData.append("url", newsData.url);
    formData.append("title", newsData.title);
    const settings = {
      method: "POST",
      body: formData,
    };
    fetch("https://nusocial5.herokuapp.com/api/news/addNews", settings)
      .then((response) => response.text())
      .then((msg) => {
        setMsg(msg);
        setOpen(true);
      });
  }

  function handle(e) {
    const newdata = { ...newsData };
    newdata[e.target.id] = e.target.value;
    setNewsData(newdata);
  }
  return (
    <div>
      <div className="AddNews">
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
        <form onSubmit={(e) => addNews(e)}>
          <input
            type="text"
            placeholder="Enter title"
            id="title"
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
            id="coverImage"
            name="filename"
            placeholder="upload news picture"
          />
          <input type="submit" placeholder="submit news" />
        </form>
      </div>
    </div>
  );
};

export default AddNews;
