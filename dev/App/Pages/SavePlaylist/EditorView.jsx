import React from 'react';
import SongView from '../SongView/index.jsx';
import CustomMutation from '../../Components/CustomMutation.jsx';
import {DELETE_FROM_SONG_LIST} from '../../Apollo/API/graphql/index.js';

const EditorView = ({queryData, mutationData, pageError, pageErrorMsg}) => {
  if (mutationData) {
    return <h1>{mutationData.createPlaylist.message}</h1>;
  }

  if (pageError) {
    return <div className="error-msg">{pageErrorMsg}</div>;
  }

  if (
    queryData.songList.name == 'untitled' &&
    queryData.songList.list.length == 0
  ) {
    return (
      <div className="error-msg">
        You haven't saved any songs in your playlist. Go SEARCH for a song!
      </div>
    );
  }

  if (queryData) {
    return (
      <div className="playlist-songs-container">
        <div className="playlist-name-container">
          <h2>Your current playlist name is: {queryData.songList.name}</h2>
        </div>

        <CustomMutation mutation={DELETE_FROM_SONG_LIST}>
          {deleteSongFromSongList => (
            <SongView
              PROP_MUTATION={deleteSongFromSongList}
              songInput={queryData.songList.list}
              callback={null}
              assetType="trash"
              searchView={false}
            />
          )}
        </CustomMutation>
      </div>
    );
  }
};

export default EditorView;
