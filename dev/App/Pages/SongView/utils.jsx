import React from "react";
import Playlist from "./assets/playlist.png";
import Trash from "./assets/trash.png";


export const getAssetPath = assetType => {
  if (assetType == "playlist") {
    return Playlist;
  }

  if (assetType == "trash") {
    return Trash;
  }
};

export const prepSongObject = result => {
  const { title, permalink_url, artwork_url, id_user_id_identifier } = result;
  const newSong = {
    title,
    permalink_url,
    artwork_url,
    id_user_id_identifier
  };

  return newSong;
};

export const handleLoadMutation = url => {
  const playSong = {
    currentSong: url,
    playing: true
  };

  return playSong;
};

export const renderIcon = (
  propMutation = null,
  assetType,
  newSong,
  asset,
  callback
) => {
  return (
    <img
      onClick={() =>
        propMutation != null
          ? invokeMutation(propMutation, newSong, assetType)
          : callback(newSong)
      }
      className="playlist-icon"
      src={asset}
    />
  );
};


const invokeMutation = (propMutation, newSong, assetType) => {
  const { id_user_id_identifier } = newSong;

  const variables =
    assetType == "playlist"
      ? { songToAdd: newSong }
      : { songID: id_user_id_identifier };

  propMutation({ variables });
};