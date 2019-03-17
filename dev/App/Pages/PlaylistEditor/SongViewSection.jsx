import React from 'react';
import SongView from '../SongView/index.jsx';

const SongViewSection = ({updateResponse, deleteResponse, playlistSongs}) => {
  if (updateResponse) {
    return <h1>{updateResponse.updatePlaylist.message}</h1>;
  }

  if (deleteResponse) {
    return <h1>{deleteResponse.deletePlaylist.message}</h1>;
  }

  return (
    <SongView
      PROP_MUTATION={null}
      songInput={playlistSongs}
      callback={this.deleteSongFromPlaylist}
      assetType={'trash'}
      searchView={false}
      hasOneSong={playlistSongs.length == 1 ? true : false}
    />
  );
};

export default SongViewSection;
