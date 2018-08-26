import React from "react";
import { Mutation } from "react-apollo";
import Spinner from "../../Components/Spinner.jsx";
import SongView from "../SongView/index.jsx";
import { DELETE_FROM_SONG_LIST } from "./graphql";

const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};

export const escapeHtml = string => {
  return String(string).replace(/[&<>"'`=\/]/g, function(s) {
    return entityMap[s];
  });
};

export const editSongList = songList => {
  const filteredList = [];

  const songKeys = Object.keys(songList[0]);

  // Not most optimal solution to delete __typename
  songList.forEach(song => {
    const fileredSongObj = {};
    songKeys.forEach(key => {
      if (key != "__typename") {
        fileredSongObj[key] = song[key];
      }
    });
    filteredList.push(fileredSongObj);
  });

  return filteredList;
};

export const handlePlaylistEditorView = (
  data,
  loading,
  error,
  mutationData,
  pageError,
  pageErrorMsg
) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log("Error querying cache mutation for songList ", error);

    return (
      <div className="error-msg">
        Whoops! There was an error processing your request. Try again later.
      </div>
    );
  }

  if (mutationData) {
    return <h1>{mutationData.createPlaylist.message}</h1>;
  }

  if (pageError) {
    return <div className="error-msg">{pageErrorMsg}</div>;
  }

  if (data.songList.name == "untitled" && data.songList.list.length == 0) {
    return (
      <div className="error-msg">
        You haven't saved any songs in your playlist. Go SEARCH for a song!
      </div>
    );
  }

  if (data) {
    return (
      <div className="playlist-songs-container">
        <div className="playlist-name-container">
          <h2>Your current playlist name is: {data.songList.name}</h2>
        </div>

        <Mutation mutation={DELETE_FROM_SONG_LIST}>
          {deleteSongFromSongList => (
            <SongView
              PROP_MUTATION={deleteSongFromSongList}
              songInput={data.songList.list}
              callback={null}
              assetType="trash"
              searchView={false}
            />
          )}
        </Mutation>
      </div>
    );
  }
};
