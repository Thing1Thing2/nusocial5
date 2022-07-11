import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";
import DeleteLink from "../../components/Controls/DeleteLink";

const QuickLinks = () => {
  let Links = [];
  const getLinks = () => {
    Links = [];
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
          Links.push(l);
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
        {Links.forEach((l) => {
          <div className="link">{l}</div>;
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
