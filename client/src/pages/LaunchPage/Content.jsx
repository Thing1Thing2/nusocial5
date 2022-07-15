import React from "react";
import { ReactComponent as Lpimgregister } from "./lpimg.svg";
import { ReactComponent as Lpimglogin } from "./lpimglogin.svg";

const Content = ({ handleSign }) => {
  return (
    <div className="panelsContainer">
      <div className="panel leftPanel">
        <div className="content">
          <h3>What is NUSocial?</h3>
          <p>
            NUSocial is an all-in-one social media platform designed for
            National University of Singapore students providing a wide range of
            functions helping them to socialize, communicate, find a group of
            students with same hobbies, catch up with their studying schedules,
            submissions deadline,... Register an account to join with NUSocial
            community.
          </p>
          <p>Register an account to join with NUSocial community.</p>
          <button onClick={handleSign} className="btn transparent">
            Register
          </button>
        </div>
        <Lpimglogin className="image" alt="" />
      </div>
      <div className="panel rightPanel">
        <div className="content">
          <h3>Already have an account?</h3>
          <p>
            Login with your account here to communicate with your friends,
            people in NUS
          </p>
          <button onClick={handleSign} className="btn transparent">
            Login
          </button>
        </div>
        <Lpimgregister className="image" alt="" />
      </div>
    </div>
  );
};

export default Content;
