import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";
import Link from "./Link.js";

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
        let links = await arr.text();
        console.log(links);
        links.forEach((l) => {
          setLinks((list) => [
            ...list,
            [l.link, l.imgsrc, l.createdBy, l.info],
          ]);
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
        {Links.map((u) => (
          <div className="link">
            <Link
              info={u.info}
              imgsrc={u.imgsrc}
              createdBy={u.createdBy}
              link={u.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
