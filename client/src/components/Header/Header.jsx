import React, { useState, useEffect } from "react";
import "./Header.css";
import { Chat, Home, Notifications, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Logo from "../Logo/Logo";
import DoubleArrowTwoToneIcon from "@mui/icons-material/DoubleArrowTwoTone";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({
  link,
  title,
  showHeaderCenter,
  showHeaderRight,
  username,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const logoutFetch = () => {
    let guestID = 0;
    if (location.state.username.startsWith("guest")) {
      let username = location.state.username;
      console.log(username);
      username = username.replace("guest", "");
      console.log(username);
      guestID = username;
      console.log(guestID);
    }
    const data = {
      username: location.state.username,
      guestID: guestID,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(
      "https://nusocial5.herokuapp.com/api/students/logoutStudent",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data.startsWith("successfully logged out")) {
          navigate("/");
        }
      });
  };

  const handleSelect = (e) => {
    getProfileInfo();
    e.target.value === "My Profile"
      ? navigate("/profile", {
          state: { username: location.state.username, data: data },
        })
      : e.target.value === "Log Out"
      ? logoutFetch()
      : setSelected("");
  };

  const getProfilePicture = async (name) => {
    let url;
    const data = {
      username: name,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(
      "https://nusocial5.herokuapp.com/api/students/getProfilePicture",
      settings
    )
      .then((response) => response.text())
      .then((data) => {
        url = data;
      });
    setProfilePic(url);
  };

  const [profilePic, setProfilePic] = useState(
    "http://res.cloudinary.com/nusocial5/image/upload/v1657007433/k15gvt1qasici1xyi0vo.jpg"
  );

  useEffect(() => {
    getProfilePicture(username);
    getProfileInfo();
  });

  const data = {
    profilePic:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Fischotter%2C_Lutra_Lutra.JPG/640px-Fischotter%2C_Lutra_Lutra.JPG",
    coverPic:
      "https://static.theprint.in/wp-content/uploads/2021/04/Sea_Otter._Little_Tutka_Bay_Alaska-scaled-e1617874012943.jpg?compress=true&quality=80&w=376&dpr=2.6",
    bio: "",
    numOfFriends: 0,
  };

  const getProfileInfo = async () => {
    const dataProfile = {
      username: username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataProfile),
    };
    await fetch(
      "http://localhost:5000/api/students/getStudentDetails",
      settings
    ).then(async (info) => {
      let gd = await info.json();
      console.log(gd);

      if (gd[0] !== null || gd[0] !== "") {
        data.profilePic = gd[0];
      }
      if (gd[1] !== null || gd[1] !== "") {
        data.coverPic = gd[1];
      }
      data.bio = gd[2];
      console.log(data);
    });
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <Logo link={link} title={title} username={location.state.username} />
      </div>
      {showHeaderCenter && (
        <div className="headerCenter">
          <div className="searchBar">
            <Search style={{ marginLeft: "20px", fontSize: "25px" }} />
            <input
              placeholder="search for modules, friends,..."
              className="searchInput"
            ></input>
          </div>
        </div>
      )}
      {showHeaderRight && (
        <div className="headerRight">
          <div className="headerIcon">
            <div className="iconItem">
              <Home
                fontSize="large"
                htmlColor="#1f3d85"
                onClick={() =>
                  navigate("/home", {
                    state: { username: location.state.username },
                  })
                }
              />
            </div>
            <div className="iconItem">
              <Notifications
                fontSize="large"
                htmlColor="#1f3d85"
                onClick={() =>
                  navigate("/newsandnots", {
                    state: { username: location.state.username },
                  })
                }
              />
              <span className="iconBadge">4</span>
            </div>
            <div className="iconItem">
              <Chat
                fontSize="large"
                htmlColor="#1f3d85"
                onClick={() =>
                  navigate("/personalChat", {
                    state: {
                      username: location.state.username,
                    },
                  })
                }
              />
              <DoubleArrowTwoToneIcon
                htmlColor="#1f3d85"
                onClick={() =>
                  navigate("/quicklinks", {
                    state: { username: location.state.username },
                  })
                }
              />

              <span className="iconBadge">3</span>
            </div>
          </div>

          <Select
            IconComponent={() => <Avatar src={profilePic}>3</Avatar>}
            value={selected}
            sx={{ autoWidth: true }}
            onChange={handleSelect}
          >
            <MenuItem value="My Profile">My Profile</MenuItem>
            <MenuItem value="Log Out">Log Out</MenuItem>
          </Select>
        </div>
      )}
    </div>
  );
};

Header.defaultProps = {
  title: "NUSocial",
  showHeaderCenter: false,
  showHeaderRight: false,
};

export default Header;
