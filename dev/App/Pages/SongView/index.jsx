import React from "react";
import { Mutation } from "react-apollo";
import Playlist from "./assets/playlist.png";
import Trash from "./assets/trash.png";
import { LOAD_SONG_IN_PLAYER } from "./graphql";

const getAssetPath = assetType => {
  if (assetType == "playlist") {
    return Playlist;
  }

  if (assetType == "trash") {
    return Trash;
  }
};

const prepSongObject = result => {
  const { title, permalink_url, artwork_url, id_user_id_identifier } = result;
  const newSong = {
    title,
    permalink_url,
    artwork_url,
    id_user_id_identifier
  };

  return newSong;
};

const handleLoadMutation = url => {
  const playSong = {
    currentSong: url,
    playing: true
  };

  return playSong;
};

const renderResults = (PROP_MUTATION, songInput, callback, assetType, startSearch) => {

  console.log('songInput is ', songInput)
  console.log('startSearch is ', startSearch)
  
  if(songInput.length == 0 && startSearch){
    return <div className="error-msg">Whoops! We couldn't find any results for your search. Try something else.</div> 
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
                  <img
                    onClick={() =>
                      propMutation({ variables: { songToAdd: newSong } })
                    }
                    className="playlist-icon"
                    src={asset}
                  />
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
const SongView = ({ PROP_MUTATION, songInput, callback, assetType, startSearch }) => (
  <div className="song-view-container">
    {renderResults(PROP_MUTATION, songInput, callback, assetType, startSearch)}
  </div>
);

export default SongView;
