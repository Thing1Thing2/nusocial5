import React from "react";

const Link = ({ link, imgsrc, createdBy, info }) => {
  return (
    <div>
      {info}
      <a href={link}>
        <img alt={info} src={imgsrc} />
      </a>
      {createdBy}
    </div>
  );
};

export default Link;
