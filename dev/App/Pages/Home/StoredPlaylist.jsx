import React from 'react';
import SongView from '../SongView/index.jsx';

const StoredPlaylist = ({data}) => {
  if (data.currentlyPlaying.storedPlaylist.length) {
    const {songs, name} = data.currentlyPlaying.storedPlaylist[0];

    return (
      <div className="stored-playlist-container">
        <h2>Or pick a song from your currently selected playlist!</h2>

        <h3>Playlist Name: {name}</h3>
        <SongView
          PROP_MUTATION={null}
          songInput={songs}
          callback={null}
          assetType={'none'}
          searchView={false}
        />
      </div>
    );
  }

  return null;
};

export default StoredPlaylist;
