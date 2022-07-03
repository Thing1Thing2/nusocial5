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
  const navigate = useNavigate();

  //container intialisation
  const container = React.useRef(null);
  const handleSign = () => {
    container.current?.classList.toggle("registerMode");
  };

  const [loginAlertOpen, setLoginAlertOpen] = useState(false);
  const [severityLog, setSeverityLog] = useState("");
  const [msgLog, setMsgLog] = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
    //Login handlers and variables
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const addUsername = (username, nextField) => {
    //validate username for login
    let severity = "error", usernameValid;
  //validate username for login
  if (username === "") {
    usernameValid = "entre a username";
    document.getElementById(nextField).disabled = true;
    setAlertLogin(severity, usernameValid);
  } else {
    setUsernameLog(username);
    document.getElementById(nextField).disabled = false;
    setUsernameValid(true);
    setLoginAlertOpen(false);
  } 
  }

  const addPassword = (password, nextField) => {
    //validate password for login
    let passwordValid, severity = "error";
  //validate password for registration
  if(password === ""){
    passwordValid = "Enter a password";
    document.getElementById(nextField).disabled = true;
  setAlertLogin(severity, passwordValid);
  } else {
  setPasswordLog(password);
    document.getElementById(nextField).disabled = false;
    setLoginAlertOpen(false);
    setPasswordValid(true);
  } 
  }
  const setAlertLogin = (severity, msg) => {
    setSeverityLog(severity);
    setMsgLog(msg);
    setLoginAlertOpen(true);
  }

  const serverLogin = async() => {
    if(usernameValid && passwordValid) {
      const data = {
        username: usernameLog,
        password: passwordLog,
      };
      console.log("usernameLog: "+ usernameLog);
      console.log("passwordLog: "+ passwordLog);
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
      fetch("https://nusocial5.herokuapp.com/api/students/findStudent", settings).then(response => response.text()).then(msg => {
        if (msg === "successful login") {
          console.log("correct login creds");
          navigate("/home", {state:{username:usernameLog}});
        } else {
          setAlertLogin("error", msg);
        }
      })
    } else {
      setAlertReg("error", "check input fields");
    }
  
}


//Registration handlers and variables
const [usernameReg, setUsernameReg] = useState("");
const [nus_email, setNus_email] = useState("");
const [passwordReg,setPasswordReg] = useState("");
const [validatedUsername, setValidatedUsername] = useState(false);
const [validatedEmail, setValidatedEmail] = useState(false);
const [validatedPassword, setValidatedPassword] = useState(false);

const [severityReg, setSeverityReg] = useState("");
const [msgReg, setMsgReg] = useState(""); //for setting Alert message
const [open, setOpen] = useState(false);

const addUsernameReg = (username, nextField) => {
  let severity = "error", usernameRegValid;
  setOpen(false);
  //validate username for registration
  const guardCode = (username.indexOf("$") === -1) &&
  (username.indexOf("$") === -1) &&
  (username.indexOf("!") === -1) &&
  (username.indexOf("_") === -1) &&
  (username.indexOf(":") === -1) &&
  (username.indexOf(";") === -1) &&
  (username.indexOf(".") === -1) &&
  (username.indexOf(",") === -1) &&
  (username.indexOf("=") === -1) &&
  (username.indexOf("%") === -1) &&
  (username.indexOf("@") === -1);
  if (!guardCode) {
    usernameRegValid =  "username cannot contain special characters $ ! _ : ; , . % @ space tab =";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, usernameRegValid);
  } else if (username === ""){
    usernameRegValid = "no username input";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, usernameRegValid);
  } else if (username.length < 6) {
    usernameRegValid = "username too short, make it descriptive!";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, usernameRegValid);
  } else {
    setUsernameReg(username);
    document.getElementById(nextField).disabled = false;
    setValidatedUsername(true);
    setOpen(false);
  }

}
  const addEmail = (email, nextField) => {
    //validate email for registration
    setOpen(false);
    let nus_emailValid, severity = "error";
    let validEmail = !email.startsWith("@nus.edu.sg") 
    && !email.startsWith("@u.nus.edu")
    &&
    (email.endsWith("@nus.edu.sg") || email.endsWith("@u.nus.edu"));
      if (email === "") {
      nus_emailValid = "no email input";
      document.getElementById(nextField).disabled = true;
      setAlertReg(severity, nus_emailValid);
    } else if (!validEmail) {
      nus_emailValid = "not a valid nus email address";
      document.getElementById(nextField).disabled = true;
      setAlertReg(severity, nus_emailValid);
    } else {
      setNus_email(email);
      document.getElementById(nextField).disabled = false;
      setValidatedEmail(true);
      setOpen(false);
    }
  
  }


const addPasswordReg = (password, nextField) => {
  let passwordRegValid, severity = "error";
  setOpen(false);
  //validate password for registration
  let containsSpecialChar = 
  (password.indexOf("$") !== -1) ||
  (password.indexOf("!") !== -1) ||
  (password.indexOf("*") !== -1) ||
  (password.indexOf("_") !== -1) ||
  (password.indexOf(":") !== -1) ||
  (password.indexOf(";") !== -1) ||
  (password.indexOf(".") !== -1) ||
  (password.indexOf(",") !== -1) ||
  (password.indexOf("=") !== -1) ||
  (password.indexOf("%") !== -1) ||
  (password.indexOf("@") !== -1);

  let containsNumber =   
  (password.indexOf("0") !== -1) ||
  (password.indexOf("1") !== -1) ||
  (password.indexOf("2") !== -1) ||
  (password.indexOf("3") !== -1) ||
  (password.indexOf("4") !== -1) ||
  (password.indexOf("5") !== -1) ||
  (password.indexOf("6") !== -1) ||
  (password.indexOf("7") !== -1) ||
  (password.indexOf("8") !== -1) ||
  (password.indexOf("9") !== -1);

  let containsUpperAndLowerCaseLetters = (password.toLowerCase() !== password) && (password.toUpperCase() !== password);
  if (!containsSpecialChar) {
    passwordRegValid = "password must contain special characters $ ! * _ : ; . , = % @";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, passwordRegValid);
  } else if (!containsNumber) {
    passwordRegValid = "password must contain number";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, passwordRegValid);
  } else if (!containsUpperAndLowerCaseLetters) {
    passwordRegValid = "password must contain a mix of upper and lower case letters";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, passwordRegValid);
  }else if (password === "") {
    passwordRegValid = "no password input";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, passwordRegValid);
  } else if (password.length < 9) {
    passwordRegValid = "password too short, must have more than 8 characters";
    document.getElementById(nextField).disabled = true;
    setAlertReg(severity, passwordRegValid);
  } else {
    document.getElementById(nextField).disabled = false;
    setValidatedPassword(true);
    setOpen(false);
    setPasswordReg(password);
  }
}


const setAlertReg = (severity, msg) => {
  setSeverityReg(severity);
  setMsgReg(msg);
  setOpen(true);
}

const [sentDataReg, setSentDataReg]  = useState("");

const addStudent = async() => {
   if (validatedUsername && validatedEmail && validatedPassword) {
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
fetch("https://nusocial5.herokuapp.com/api/students/addStudent", settings).then(response => response.text()).then(msg => {
setSentDataReg(msg);
console.log("fetch ref");
if (msg === "successfully registered") {
  setAlertReg("success",msg);
  const dataLinks = {
    username: usernameReg,
  };
  const linksSettings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataLinks),
  }
  fetch("http://localhost:5000/api/students/friends", linksSettings)
  fetch("http://localhost:5000/api/students/links", linksSettings)
  fetch("http://localhost:5000/api/students/photos", linksSettings)
  fetch("http://localhost:5000/api/students/newsandnots", linksSettings)
  fetch("http://localhost:5000/api/students/posts", linksSettings)
  fetch("http://localhost:5000/api/students/comments", linksSettings)
  fetch("http://localhost:5000/api/students/groups", linksSettings)
  navigate("/");
} else {
  setAlertReg("error", msg);
}
})
} else {
  setAlertReg("error", "Enter valid credentials first");
}
}


const moveToNextField = (event) => {
  if (event.key.toLowerCase() === "enter") {
    const form = event.target.form;
    const index = [...form].indexOf(event.target);
    form.elements[index + 1].focus();
    event.preventDefault();
  }
}

  return (
    <div class="launchPage" >  
      <div class="container" ref = {container}>
      <div class="formContainer">
        <div class="loginRegister">
          <form action="#" class="loginForm">
            <h2 class="title">Login</h2>
            <div id = "alert" >
            <Collapse in={loginAlertOpen}> 
            <Alert severity= "error" action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setLoginAlertOpen(false);}}> <CloseIcon fontSize="inherit" /> </IconButton>} sx={{ mb: 2 }}>
            {msgLog}
            </Alert>
            </Collapse>
            </div>
            <div class="inputField">
              <PersonIcon className="icon"/>
              <input type="text" id = "username" placeholder="Username"onChange = {(e) => {addUsername(e.target.value, "password");}} onKeyDown = {(e) => moveToNextField(e)} />
            </div>
            <div class="inputField">
              <HttpsIcon className="icon"/>
              <input type="password" id = "password" placeholder="Password" onChange = {(e) => {addPassword(e.target.value, "submitLogin");}} onKeyDown = {(e) =>  {if (e.key.toLowerCase() === "enter") {moveToNextField(e);}}}/>
            </div>
            <input type="submit" value="Login" id = "submitLogin" class="btn solid"  onClick  = {serverLogin}/>
            <p class="guest" onClick = {() => navigate("/home", {state:{username:"guest"}})}>Or continue as an anonymous guest</p>
          </form>
          <form action="#" class="registerForm">
            <h2 class="title">Register</h2>
            <div id = "alert" >
            <Collapse in={open}> 
            <Alert severity= {severityReg} action={ <IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}> <CloseIcon fontSize="inherit" /> </IconButton>} sx={{ mb: 2 }}>
            {msgReg}
            </Alert>
            </Collapse>
            </div>
            <div className="inputField">
              <PersonIcon className="icon"/>
              <input type="text" placeholder="Username"  onChange = {(e) => {addUsernameReg(e.target.value, "email");}} onKeyDown = {(event) => moveToNextField(event)}  />
            </div>
            <div className="inputField">
              <EmailIcon className="icon"/>
              <input type="email" placeholder="Email" id = "email" onChange = {(e) => {addEmail(e.target.value, "pwd");}} onKeyDown = {(e) => moveToNextField(e)} disabled/>
            </div>
            <div class="inputField">
              <HttpsIcon className="icon"/>
              <input type="password" placeholder="Password" id = "pwd" onChange = {(e) => {addPasswordReg(e.target.value, "submitRegister");}} onKeyDown = {(e) => {if (e.key.toLowerCase() === "enter") {moveToNextField(e);}}} disabled/>
            </div>
            <input type="submit" class="btn" id = "submitRegister" value="Register" onClick = {addStudent}/>
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
            <button onClick={handleSign} class="btn transparent">
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
            <button onClick={handleSign} class="btn transparent">
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