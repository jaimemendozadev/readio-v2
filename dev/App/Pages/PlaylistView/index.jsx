import React from "react";
import PlaylistCard from "./PlaylistCard.jsx";

const renderPlaylistCards = playlistArray => {
  return playlistArray.map(playlist => (
    <PlaylistCard playlistInfo={playlist} />
  ));
};

const PlaylistView = ({ playlists }) => (
  <div className="playlistview-container">
    <div className="playlistview-header">
      <h1>PlaylistViewer</h1>
    </div>

    {console.log("playlists inside PlaylistViewer ", playlists)}

    {renderPlaylistCards(playlists)}
  </div>
);

export default PlaylistView;
