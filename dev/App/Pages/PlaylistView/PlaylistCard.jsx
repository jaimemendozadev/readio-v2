import React from "react";

const PlaylistCard = ({ playlistInfo }) => (
  <div className="playlistcard">
    {console.log("playlistInfo is ", playlistInfo)}
    <h3>{playlistInfo.name}</h3>
  </div>
);

export default PlaylistCard;
