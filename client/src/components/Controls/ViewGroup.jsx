import React from "react";
import { useNavigate } from "react-router-dom";

const ViewGroup = ({ username, groupName }) => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="postBottomSendButton"
        onClick={() =>
          navigate("/group", {
            state: {
              username: username,
              friend: groupName,
            },
          })
        }
      >
        View Group
      </button>
    </div>
  );
};

export default ViewGroup;
