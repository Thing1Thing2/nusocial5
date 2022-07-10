import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";

const QuickLinks = () => {
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
        console.log(links);
        links.forEach((l) => {
          console.log(l);
          setLinks((list) => [...list, [l.link, l.image, l.createdBy, l.info]]);
        });
        console.log(Links);
      }
    );
  };
  const location = useLocation();
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
        {Links.forEach((u) => (
          <div className="link">
            <div>
              {u[3]}
              <a href={u[0]}>
                <img alt={u[3]} src={u[1]} />
              </a>
              {u[2]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
