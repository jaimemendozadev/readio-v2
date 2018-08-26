import React from "react";
import { Mutation } from "react-apollo";
import PlaylistCard from "./PlaylistCard.jsx";
import { LOAD_PLAYLIST_IN_CACHE } from "./graphql";

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
    {console.log("playlists inside PlaylistViewer ", playlists)}

    {renderPlaylistCards(propMutation, varObjKey, playlists, callback)}
  </div>
);

export default PlaylistView;
