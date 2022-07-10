import React from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";

const QuickLinks = () => {
  const getLinks = () => {
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
    fetch("https://nusocial5.herokuapp.com/api/links/getLinks", settings)
      .then(async (arr) => {
        await arr.text();
      })
      .then((d) => {
        console.log(d);
      });
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
        <AddLink />
      </div>
    </div>
  );
};

export default QuickLinks;
