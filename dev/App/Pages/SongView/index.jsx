import React from "react";
import { Mutation } from "react-apollo";

import { LOAD_SONG_IN_PLAYER } from "./graphql";
import { getAssetPath } from "./utils.jsx";
import { prepSongObject } from "./utils.jsx";
import { handleLoadMutation } from "./utils.jsx";
import { renderIcon } from "./utils.jsx";

const renderResults = (
  propMutation,
  songInput,
  callback,
  assetType,
  hasOneSong = false,
  searchView = false
) => {
  //Note: Should only happen if we're in SearchView
  if (songInput.length == 0 && searchView == true) {
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
      <Mutation
        key={result.id_user_id_identifier}
        mutation={LOAD_SONG_IN_PLAYER}
      >
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
              {hasOneSong == true && !searchView
                ? ""
                : renderIcon(propMutation, assetType, newSong, asset, callback)}
            </div>
          </div>
        )}
      </Mutation>
    );
  });
};

// PROP_MUTATION can add or delete song from cache SongList
// SearchView enables adding song to SongList
// PlaylistEditor enables deleting song from SongList
// searchView checks if SongView nested in Search View to use Search View styling
// if we're not in searchView and playlist has only one song, disable delete song Icon for user.

const SongView = ({
  PROP_MUTATION,
  songInput,
  callback,
  assetType,
  searchView,
  hasOneSong
}) => {
  console.log("searchView inside SongView ", searchView);
  return (
    <div className={searchView == true ? "prevent-search-overflow" : ""}>
      {renderResults(
        PROP_MUTATION,
        songInput,
        callback,
        assetType,
        hasOneSong,
        searchView
      )}
    </div>
  );
};

export default SongView;
