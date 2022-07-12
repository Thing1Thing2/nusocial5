import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./QuickLinks.css";
import { useLocation } from "react-router-dom";
import AddLink from "../../components/Controls/AddLink";
import DeleteLink from "../../components/Controls/DeleteLink";
import ReactGiphySearchbox from "react-giphy-searchbox";

const QuickLinks = () => {
  const [Links, setLinks] = useState([]);
  const getLinks = () => {
    setLinks([]);
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
        setLinks(links);
      }
    );
    console.log(Links);
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
        {Links.map((l) => (
          <div className="link">
            <a href={l[0]}>
              {l[1]}
              createBy: {l[3]}
              <DeleteLink
                username={location.state.username}
                info={l[1]}
                link={l[0]}
              />
              <img src={l[2]} alt={l[1]} />
            </a>
          </div>
        ))}
      </div>

      <div className="gif">
        <ReactGiphySearchbox
          apiKey="4LNVpKcyYsZK9sTvTBxYQiTToKf9TIsz"
          onSelect={(item) => console.log(item)}
          masonryConfig={[
            { columns: 2, imageWidth: 110, gutter: 5 },
            { mq: "700px", columns: 3, imageWidth: 110, gutter: 5 },
          ]}
        />
      </div>
    </div>
  );
};

export default QuickLinks;
