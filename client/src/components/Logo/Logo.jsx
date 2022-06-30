import React  from "react";
import "./logo.css";
import logo from "./logo.png";
import { Link } from "@mui/material"

const Logo = ({link, title}) => {
  return (
    <div className = "logoAndHeader">
    <Link href = {link} style={{ textDecoration: 'none' }}s>
    <div className = "logo">  
    <img src={logo} alt="logo" className="logo" />
    </div>
    <div className = "pageTitle">
    {title}
    </div>
    </Link>
    </div>
  )
}

Logo.defaultProps = {
  title: 'NUSocial'
}

export default Logo;
