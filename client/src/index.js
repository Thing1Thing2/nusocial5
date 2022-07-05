import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LaunchPage from "./pages/LaunchPage/LaunchPage";
import Home from "./pages/Home/Home";
import PersonalChat from "./pages/PersonalChat/PersonalChat";
import QuickLinks from "./pages/QuickLinks/QuickLinks";
import Profile from "./pages/Profile/Profile";
import NewsAndNots from "./pages/NewsAndNots/NewsAndNots";
import Group from "./pages/Group/Group";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LaunchPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/personalchat" element={<PersonalChat />} />
      <Route path="/quicklinks" element={<QuickLinks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/newsandnots" element={<NewsAndNots />} />
      <Route path="/group" element={<Group />} />
    </Routes>
  </BrowserRouter>
);
