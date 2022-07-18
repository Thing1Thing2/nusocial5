import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";
import DeleteLink from "../../components/Controls/DeleteLink";
import { useNavigate } from "react-router-dom";
const QuickLinks = () => {
  const navigate = useNavigate();
  const [Links, setLinks] = useState([]);
  const getLinks = () => {
    setLinks([]);
    const data = {
      username: location.state.username,
    };
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("https://nusocial5.herokuapp.com/api/links/getLinks", settings).then(
      async (arr) => {
        let links = await arr.json();
        setLinks(links);
      }
    );
    console.log(Links);
  };
  const location = useLocation();
  let guest = location.state.username.includes("guest");

  if (guest) {
    return (
      <div>
        <div className="header">
          <Header
            title="News and Notifications"
            showHeaderCenter={true}
            showHeaderRight={true}
            link="/home"
            username={location.state.username}
          />
        </div>
        <div className="redirect guest" onClick={() => navigate("/")}>
          Login to create your own links
        </div>
        <div className="links">
          <button className="getLinks" onClick={getLinks}>
            Get Links
          </button>
          {Links.map((l) => (
            <div className="link">
              <a href={l[0]}>
                {l[1]}
                createBy: {l[3]}
                <DeleteLink
                  username={location.state.username}
                  info={l[1]}
                  link={l[0]}
                />
                <img src={l[2]} alt={l[1]} />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header
          title="Quick Links"
          showHeaderCenter={true}
          showHeaderRight={true}
          link="/home"
          username={location.state.username}
        />

        <button className="getLinks" onClick={getLinks}>
          Get Links
        </button>
        <div className="addLink">
          <AddLink username={location.state.username} />
        </div>

        <div className="links">
          {Links.map((l) => (
            <div className="link">
              <a href={l[0]}>
                {l[1]}
                createBy: {l[3]}
                <DeleteLink
                  username={location.state.username}
                  info={l[1]}
                  link={l[0]}
                />
                <img src={l[2]} alt={l[1]} />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default QuickLinks;
