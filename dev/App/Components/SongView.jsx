import React from "react";
import { Mutation } from "react-apollo";
import Playlist from "./assets/playlist.png";


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

const renderResults = (searchResults, callback) => {
  return searchResults.map(result => {
    const newSong = prepSongObject(result);
    return (
      <Mutation key={result.id_user_id_identifier} mutation={ADD_TO_SONG_LIST}>
        {addToSongList => (
          <div className="song-item">
            <div
              onClick={() => callback(result.permalink_url)}
              className="song-image-container"
            >
              <img src={result.artwork_url} />
              <div>{result.title}</div>
            </div>

            <div className="playlist-icon-container">
              <img
                onClick={() =>
                  addToSongList({ variables: { songToAdd: newSong } })
                }
                className="playlist-icon"
                src={Playlist}
              />
            </div>
          </div>
        )}
      </Mutation>
    );
  });
};
const SongView = ({songInput, callback }) => (
  <div className="song-view-container">
    {renderResults(songInput, callback)}
  </div>
);

export default SongView;
