import React from 'react';

const Header = ({
  client,
  songListCount,
  onSubmit,
  onClick,
  onChange,
  playlistName,
}) => (
  <div className="save-playlist-header-container">
    <div>
      <h1>
        Edit and Save Your Current Playlist! Click on a song to load it into the
        player!
      </h1>
    </div>

    <form onSubmit={event => onSubmit(event, client, songListCount)}>
      <input
        onClick={onClick}
        onChange={onChange}
        type="text"
        value={playlistName}
      />
    </form>
  </div>
);

export default Header;
