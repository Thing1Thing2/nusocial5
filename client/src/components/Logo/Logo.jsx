import React from "react";
import "./logo.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const Logo = ({ link, title, username }) => {
  const navigate = useNavigate();
  return (
    <div
      className="logoAndHeader"
      onClick={() =>
        navigate(link, {
          state: { username: username },
        })
      }
    >
      <div className="logo">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="pageTitle">{title}</div>
    </div>
  );
};

Logo.defaultProps = {
  title: "NUSocial",
};

export default Logo;
