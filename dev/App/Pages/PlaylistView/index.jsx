import React from "react";
import { Mutation } from "react-apollo";
import PlaylistCard from "./PlaylistCard.jsx";
import { LOAD_PLAYLIST_IN_CACHE } from "./graphql";

const renderPlaylistCards = (playlistArray, mutation) => {
  return playlistArray.map(playlist => (
    <PlaylistCard
      key={playlist.id}
      propMutation={mutation}
      playlistInfo={playlist}
    />
  ));
};

const PlaylistView = ({ playlists }) => (
  <Mutation mutation={LOAD_PLAYLIST_IN_CACHE}>
    {loadPlaylistInCache => (
      <div className="playlistview-container">
        <div className="playlistview-header">
          <h1>
            Your Current Playlists: Click on a playlist to load it in the
            player!
          </h1>
        </div>

        {console.log("playlists inside PlaylistViewer ", playlists)}

        {renderPlaylistCards(playlists, loadPlaylistInCache)}
      </div>
    )}
  </Mutation>
);

export default PlaylistView;
