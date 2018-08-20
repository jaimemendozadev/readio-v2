import React from "react";
import { Mutation } from "react-apollo";
import Playlist from "./assets/playlist.png";
import { LOAD_SONG_IN_PLAYER } from "./graphql";

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

const renderResults = (PROP_MUTATION, songInput, callback) => {
  return songInput.map(result => {
    const newSong = prepSongObject(result);
    const loadSong = handleLoadMutation(result.permalink_url);

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
                    src={Playlist}
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
const SongView = ({ PROP_MUTATION, songInput, callback  }) => (
  <div className="song-view-container">
    {renderResults(PROP_MUTATION, songInput, callback)}
  </div>
);

export default SongView;
