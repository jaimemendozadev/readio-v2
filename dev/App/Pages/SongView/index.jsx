import React from "react";
import { Mutation } from "react-apollo";

import { LOAD_SONG_IN_PLAYER } from "./graphql";
import { getAssetPath } from "./utils.jsx";
import { prepSongObject } from "./utils.jsx";
import { handleLoadMutation } from "./utils.jsx";
import { renderIcon } from "./utils.jsx";

const renderResults = (PROP_MUTATION, songInput, callback, assetType) => {
  if (songInput.length == 0) {
    return (
      <div className="error-msg">
        Whoops! We couldn't find any results for your search. Try something
        else.
      </div>
    );
  }

  return songInput.map(result => {
    const newSong = prepSongObject(result);
    const loadSong = handleLoadMutation(result.permalink_url);
    const asset = getAssetPath(assetType);

    return (
      <Mutation key={result.id_user_id_identifier} mutation={PROP_MUTATION}>
        {propMutation => (
          <Mutation mutation={LOAD_SONG_IN_PLAYER}>
            {loadSongInPlayer => (
              <div className="song-item">
                <div
                  onClick={() =>
                    loadSongInPlayer({ variables: { songArg: loadSong } })
                  }
                  className="song-image-container"
                >
                  <img src={result.artwork_url} />
                  <div>{result.title}</div>
                </div>

                <div className="playlist-icon-container">
                  {renderIcon(propMutation, assetType, newSong, asset)}
                </div>
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  });
};

// PROP_MUTATION can add or delete song from cache SongList
// SearchView enables adding song to SongList
// PlaylistEditor enables deleting song from SongList
const SongView = ({ PROP_MUTATION, songInput, callback, assetType }) => (
  <div className="song-view-container">
    {renderResults(PROP_MUTATION, songInput, callback, assetType)}
  </div>
);

export default SongView;
