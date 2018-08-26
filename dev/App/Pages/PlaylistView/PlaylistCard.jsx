import React from "react";

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
    console.log('INVOKE CALLBACK')
    callback(playlistInfo);
  }
};

const PlaylistCard = ({ propMutation, varObjKey, callback, playlistInfo }) => {
  const { songs, name } = playlistInfo;

  return (
    <div
      onClick={() =>
        mutateOrInvokeCB(propMutation, varObjKey, callback, playlistInfo)
      }
      className="playlist-wrapper"
    >
      <div className="playlistcard">
        <div className="playlistcard-front">
          <h3>{name}</h3>
        </div>

        <div className="playlistcard-back">{renderSongNames(songs)}</div>
      </div>
    </div>
  );
};

export default PlaylistCard;
