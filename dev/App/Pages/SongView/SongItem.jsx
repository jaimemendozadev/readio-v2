import React from 'react';
import {Mutation} from 'react-apollo';
import {
  getAssetPath,
  handleLoadMutation,
  prepSongObject,
  renderIcon,
} from './utils.jsx';

import {LOAD_SONG_IN_PLAYER} from '../../Apollo/API/graphql/index.js';

const SongItem = ({
  result,
  propMutation,
  assetType,
  callback,
  hasOneSong,
  searchView,
}) => {
  const newSong = prepSongObject(result);
  const loadSong = handleLoadMutation(result.permalink_url);
  const asset = getAssetPath(assetType);

  const {artwork_url, title} = result;

  return (
    <Mutation mutation={LOAD_SONG_IN_PLAYER}>
      {loadSongInPlayer => (
        <div className="song-item">
          <div
            onClick={() => loadSongInPlayer({variables: {songArg: loadSong}})}
            className="song-image-container"
          >
            <img src={artwork_url} />
            <div>{title}</div>
          </div>

          <div className="playlist-icon-container">
            {(hasOneSong == true && !searchView) || assetType == 'none'
              ? ''
              : renderIcon(propMutation, assetType, newSong, asset, callback)}
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default SongItem;
