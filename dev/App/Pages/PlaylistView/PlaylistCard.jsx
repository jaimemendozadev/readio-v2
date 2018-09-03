import React from "react";
import { Link } from "react-router-dom";
import SongIcon from "../assets/song-256.png";

const renderSongNames = songs => {
  return (
    <ul>
      {songs.map(song => {
        return <p key={song.id_user_id_identifier}>{song.title}</p>;
      })}
    </ul>
  );
};

const mutateOrInvokeCB = (propMutation, varObjKey, callback, playlistInfo) => {
  if (propMutation && varObjKey) {
    const variables = {};
    variables[varObjKey] = playlistInfo;

    propMutation({ variables });
  } else {
    callback(playlistInfo);
  }
};

const PlaylistCard = ({ propMutation, varObjKey, callback, playlistInfo }) => {
  const { songs, name } = playlistInfo;

  return (
    <a className="anchor-wrapper" href="#top">
      <div
        onClick={() =>
          mutateOrInvokeCB(propMutation, varObjKey, callback, playlistInfo)
        }
        className="playlist-wrapper"
      >
        <div className="playlistcard">
          <div className="playlistcard-front">
            <h3>{name}</h3>
            <img src={SongIcon} />
          </div>

          <div className="playlistcard-back">{renderSongNames(songs)}</div>
        </div>
      </div>
    </a>
  );
};

export default PlaylistCard;
