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

export const setLocalState = currentUser => {
  let currUser = currentUser ? currentUser : null;

  const state = {
    currentUser: {
      id: currUser ? currUser.id : currUser,
      first_name: currUser ? currUser.first_name : currUser,
      last_name: currUser ? currUser.last_name : currUser,
      email: currUser ? currUser.email : currUser
    }
  };

  return state;
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

export const checkPlaylistName = (textInput, playlistName) => {
  if (textInput != playlistName && textInput.length > 0) {
    return textInput;
  }

  return playlistName;
};

export const prepPlaylistPayload = (playlistName, playlistSongs) => {
  // Must delete __typename to avoid Mutation error on Backend
  // Not the most efficient way

  const songsPayload = editSongList(playlistSongs);

  const playlistDBPayload = {
    name: playlistName,
    songs: songsPayload
  };

  return playlistDBPayload;
};

export const resetLocalPlaylistState = () => {
  return {
    playlistID: "",
    playlistName: "",
    playlistToEdit: {},
    playlistSongs: []
  };
};
