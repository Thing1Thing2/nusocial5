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
              groupName: groupName,
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
