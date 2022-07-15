import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LaunchPage.css";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Content from "./Content";

const LaunchPage = () => {
  const navigate = useNavigate();
  //container intialisation
  const container = React.useRef(null);
  const handleSign = () => {
    container.current?.classList.toggle("registerMode");
  };

  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [msgLog, setMsgLog] = useState("");

  const setAlertLogin = (msg) => {
    setMsgLog(msg);
    setLoginAlertOpen(true);
  };

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function submitLoginForm(e) {
    e.preventDefault();
    const info = {
      username: data.username,
      password: data.password,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch("https://nusocial5.herokuapp.com/api/students/findStudent", settings)
      .then((response) => response.text())
      .then((msg) => {
        if (msg === "successful login") {
          navigate("/home", { state: { username: data.username } });
        } else {
          setAlertLogin(msg);
        }
      });
  }

  const [msgReg, setMsgReg] = useState("");
  const [openReg, setOpenReg] = useState(false);
  const [severityReg, setSeverityReg] = useState("error");

  const setAlertReg = (severity, msg) => {
    setMsgReg(msg);
    setOpenReg(true);
    setSeverityReg(severity);
  };

  const [dataReg, setDataReg] = useState({
    username: "",
    nus_email: "",
    password: "",
  });

  function handleReg(e) {
    const newdata = { ...dataReg };
    newdata[e.target.id] = e.target.value;
    setDataReg(newdata);
  }

  function submitRegistrationForm(e) {
    setOpenReg(false);
    e.preventDefault();
    const dataRegistration = {
      username: dataReg.username,
      nus_email: dataReg.nus_email,
      password: dataReg.password,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRegistration),
    };
    fetch("https://nusocial5.herokuapp.com/api/students/addStudent", settings)
      .then((response) => response.text())
      .then((msg) => {
        if (msg === "successfully registered") {
          setAlertReg("success", msg);
        } else {
          setAlertReg("error", msg);
        }
      });
  }

  return (
    <div className="launchPage">
      <div className="container" ref={container}>
        <div className="formContainer">
          <div className="loginRegister">
            <form className="loginForm" onSubmit={(e) => submitLoginForm(e)}>
              <h2 className="title">Login</h2>
              <div id="alert">
                <Collapse in={loginAlertOpen}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setLoginAlertOpen(false);
                        }}
                      >
                        {" "}
                        <CloseIcon fontSize="inherit" />{" "}
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {msgLog}
                  </Alert>
                </Collapse>
              </div>
              <div className="inputField">
                <PersonIcon className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={data.username}
                  onChange={(e) => handle(e)}
                  onKeyDown={(e) => {
                    if (e.key.toLowerCase() === "enter") {
                      handle(e);
                    }
                  }}
                />
              </div>
              <div className="inputField">
                <HttpsIcon className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) => handle(e)}
                  onKeyDown={(e) => {
                    if (e.key.toLowerCase() === "enter") {
                      submitLoginForm(e);
                    }
                  }}
                />
              </div>
              <input
                type="submit"
                value="Login"
                id="submitLogin"
                className="btn solid"
              />
              <p
                className="guest"
                onClick={() =>
                  navigate("/home", { state: { username: "guest" } })
                }
              >
                Or continue as an anonymous guest
              </p>
            </form>
            <form
              className="registerForm"
              onSubmit={(e) => submitRegistrationForm(e)}
            >
              <h2 className="title">Register</h2>
              <h5>
                Please enter a valid email address for us to be able to help you
                in case you forget your password.
              </h5>
              <div id="alert">
                <Collapse in={openReg}>
                  <Alert
                    severity={severityReg}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpenReg(false);
                        }}
                      >
                        {" "}
                        <CloseIcon fontSize="inherit" />{" "}
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {msgReg}
                  </Alert>
                </Collapse>
              </div>
              <div className="inputField">
                <PersonIcon className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={(e) => handleReg(e)}
                  onKeyDown={(e) => {
                    if (e.key.toLowerCase() === "enter") {
                      handleReg(e);
                    }
                  }}
                />
              </div>
              <div className="inputField">
                <EmailIcon className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  id="nus_email"
                  onChange={(e) => handleReg(e)}
                  onKeyDown={(e) => {
                    if (e.key.toLowerCase() === "enter") {
                      handleReg(e);
                    }
                  }}
                />
              </div>
              <div className="inputField">
                <HttpsIcon className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => handleReg(e)}
                  onKeyDown={(e) => {
                    if (e.key.toLowerCase() === "enter") {
                      submitRegistrationForm(e);
                    }
                  }}
                />
              </div>
              <input
                type="submit"
                value="Register"
                id="submitRegister"
                className="btn solid"
              />
              <p
                className="guest"
                onClick={() =>
                  navigate("/home", { state: { username: "guest" } })
                }
              >
                Or continue as an anonymous guest
              </p>
            </form>
          </div>
        </div>

        <Content handleSign={handleSign} />
      </div>
    </div>
  );
};

export default LaunchPage;
