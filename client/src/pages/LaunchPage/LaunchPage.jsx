import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import "./LaunchPage.css";
import { ReactComponent as Lpimgregister } from './lpimg.svg';
import { ReactComponent as Lpimglogin } from './lpimglogin.svg';
import PersonIcon from '@mui/icons-material/Person';
import HttpsIcon from '@mui/icons-material/Https';
import EmailIcon from '@mui/icons-material/Email';
import { Alert } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const LaunchPage = () => {
  const container = document.querySelector(".container");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sentData, setSentData] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  
const serverLoginFetch = async() => {
  const data = {
    username: username,
    password: password,
  };
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
fetch("https://nusocial4.herokuapp.com/api/students/findStudent", settings).then(response => response.text()).then(data => {
setSentData(data);
console.log(data);
setOpen(true);
console.log(sentData);
})
}

const login = (e) => {
  if (e.keyCode === 13) {
    serverLoginFetch();
  }
}

const loginAlert = <div><Collapse in={open}> <Alert
severity= "warning"
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
    {sentData}
  </Alert></Collapse></div>;

const [usernameReg, setUsernameReg] = useState("");
const [nus_email, setnus_email]= useState("");
const [passwordReg, setPasswordReg] = useState("");
const [sentDataReg, setSentDataReg]  = useState("");

const addStudentFetch = async() => {
  const data = {
    username: usernameReg,
    nus_email: nus_email,
    password: passwordReg,
  };
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
fetch("https://nusocial4.herokuapp.com/api/students/addStudent", settings).then(response => response.text()).then(data => {
setSentDataReg(data);
console.log(data);
})

}
const register = (e) => {
  if (e.keyCode === 13) {
    addStudentFetch();
    }
}

const regAlert = (severity) => <div><Collapse in={open}> <Alert
severity= {severity}
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
    {sentDataReg}
  </Alert></Collapse></div>;
  return (
    <div class="launchPage">  
      <div class="container">
      <div class="formContainer">
        <div class="loginRegister">
          <form action="#" class="loginForm">
            <h2 class="title">Login</h2>
            {sentData === "successful login" && navigate("/home", {state:{username:username}})}
            {sentData !=="" && loginAlert}
           
            <div class="inputField">
              <PersonIcon className="icon"/>
              <input type="text" placeholder="Username"onChange = {(e) => {
         setUsername(e.target.value);
       }}
       onKeyDown = {(e) => login(e)} />
            </div>
            <div class="inputField">
              <HttpsIcon className="icon"/>
              <input type="password"  placeholder="Password" onChange = {(e) => {
         setPassword(e.target.value);
       }}
        onKeyDown = {(e) => login(e)}/>
            </div>
            <input type="submit" value="Login" class="btn solid"  onClick  = {serverLoginFetch}/>
            <p class="guest" onClick = {() => navigate("/home", {state:{username:"guest"}})}>Or continue as an anonymous guest</p>
          </form>
          <form action="#" class="registerForm">

          
            <h2 class="title">Register</h2>
            {sentDataReg === "successfully registered"?regAlert("success"):sentDataReg === "error occured"?regAlert("error"):<div></div>} 
           
            <div className="inputField">
              <PersonIcon className="icon"/>
              <input type="text" placeholder="Username"  onChange = {(e) => {
         setUsernameReg(e.target.value);
       }}
        onKeyDown = {(e) => register(e)}  />
            </div>
            <div className="inputField">
              <EmailIcon className="icon"/>
              <input type="email" placeholder="Email" onChange = {(e) => {
         setnus_email(e.target.value);
       }}
        onKeyDown = {(e) => register(e)} />
            </div>
            <div class="inputField">
              <HttpsIcon className="icon"/>
              <input type="password" placeholder="Password" onChange = {(e) => {
         setPasswordReg(e.target.value);
       }}
        onKeyDown = {(e) => () => register(e)} />
            </div>
            <input type="submit" class="btn" value="Register" onClick = {addStudentFetch}/>
            <p class="guest" onClick = {() => navigate("/home", {state:{username:"guest"}})}>Or continue as an anonymous guest</p>
          </form>
        </div>
      </div>

      <div class="panelsContainer">
        <div class="panel leftPanel">
          <div class="content">
            <h3>What is NUSocial?</h3>
            <p>
              NUSocial is an all-in-one social media platform designed for
              National University of Singapore students providing a wide range
              of functions helping them to socialize, communicate, find a group
              of students with same hobbies, catch up with their studying schedules,
              submissions deadline,... Register an account to join with NUSocial community.
            </p>
            <p>
              Register an account to join with NUSocial community.
            </p>
            <button onClick={() => {container.classList.add("registerMode")}} class="btn transparent">
              Register
            </button>
          </div>
          <Lpimglogin class="image" alt="" />
        </div>
        <div class="panel rightPanel">
          <div class="content">
            <h3>Already have an account?</h3>
            <p>
              Login with your account here to communicate with your friends, people in NUS
            </p>
            <button onClick={() => {container.classList.remove("registerMode")}} class="btn transparent">
              Login
            </button>
          </div>
          <Lpimgregister class="image" alt="" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default LaunchPage;