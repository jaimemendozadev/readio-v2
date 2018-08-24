import React from "react";
import { Mutation } from "react-apollo";
import PlaylistCard from "./PlaylistCard.jsx";
import { LOAD_PLAYLIST_IN_CACHE } from "./graphql";

/*
  On Playlist card click
   -fireoff mutation
     -first song in playlist is updated to currentSong in cache

     -push remaining songs in playlist to cache stack;

     -React Player 'onEnded' event, fire mutation to play next song in cache stack

     input LoadPlaylist {
    toLoad: [String]
  }
*/

const renderPlaylistCards = (playlistArray, mutation) => {
  return playlistArray.map(playlist => (
    <PlaylistCard propMutation={mutation} playlistInfo={playlist} />
  ));
};

const PlaylistView = ({ playlists }) => (
  <Mutation mutation={LOAD_PLAYLIST_IN_CACHE}>
    {loadPlaylistInCache => (
      <div className="playlistview-container">
        <div className="playlistview-header">
          <h1>Your Current Playlists!</h1>
        </div>

        {console.log("playlists inside PlaylistViewer ", playlists)}

        {renderPlaylistCards(playlists, loadPlaylistInCache)}
      </div>
    )}
  </Mutation>
);

export default PlaylistView;
