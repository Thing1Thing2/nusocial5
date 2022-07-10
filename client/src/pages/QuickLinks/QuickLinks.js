import React from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";

const QuickLinks = () => {
  const getLinks = () => {
    fetch("https://nusocial5.herokuapp.com/api/links/getLinks").then((arr) => {
      console.log(arr.body);
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
