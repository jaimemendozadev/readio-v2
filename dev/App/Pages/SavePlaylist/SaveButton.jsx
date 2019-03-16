import React from 'react';
import SaveIcon from '../assets/savesonglist.png';

const SaveButton = ({
  songListCount,
  savePlaylistToDB,
  savePlaylistMutation,
  client,
}) => (
  <div className="save-playlist-btn-container">
    <div className="save-playlist-btn-header">
      <h1>Save Your Playlist in Your Account:</h1>
    </div>

    <button
      disabled={songListCount == 0 ? true : false}
      onClick={() => savePlaylistToDB(savePlaylistMutation, client)}
    >
      <img src={SaveIcon} />
      Save
    </button>
  </div>
);

export default SaveButton;
