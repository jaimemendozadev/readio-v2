import React from "react";
import PlaylistCard from "./PlaylistCard.jsx";

const renderPlaylistCards = (propMutation, varObjKey, playlists, callback) => {
  return playlists.map(playlist => (
    <PlaylistCard
      key={playlist.id}
      propMutation={propMutation}
      varObjKey={varObjKey}
      callback={callback}
      playlistInfo={playlist}
    />
  ));
};

const PlaylistView = ({ propMutation, varObjKey, playlists, callback }) => (
  <div className="playlistview-container">

    {renderPlaylistCards(propMutation, varObjKey, playlists, callback)}
  </div>
);

export default PlaylistView;
