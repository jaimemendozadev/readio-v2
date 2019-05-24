const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

export const setLocalState = currentUser => {
  const state = {
    currentUser: {
      ...currentUser,
    },
    setUserFromProps: true,
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

  songList.forEach(song => {
    const fileredSongObj = {};
    songKeys.forEach(key => {
      if (key != '__typename') {
        fileredSongObj[key] = song[key];
      }
    });
    filteredList.push(fileredSongObj);
  });

  return filteredList;
};

export const checkPlaylistName = (textInput = '', playlistName) => {
  if (textInput != playlistName && textInput.length > 0) {
    return textInput;
  }

  return playlistName;
};

export const prepPlaylistPayload = (playlistName, playlistSongs) => {
  const songsPayload = editSongList(playlistSongs);

  const playlistDBPayload = {
    name: playlistName,
    songs: songsPayload,
  };

  return playlistDBPayload;
};

export const resetLocalPlaylistState = () => {
  const selectedPlaylist = {
    playlistID: '',
    playlistName: '',
    playlistToEdit: {},
    playlistSongs: [],
  };
  const currentView = 'Edit Playlist';

  return {selectedPlaylist, currentView};
};

export const performUpdate = async (
  updateMutation,
  textInput = '',
  selectedPlaylist,
) => {
  const {playlistID, playlistName, playlistSongs} = selectedPlaylist;

  const nameInput = checkPlaylistName(textInput, playlistName);

  const sanitizedName = escapeHtml(nameInput);

  const updatedList = prepPlaylistPayload(sanitizedName, playlistSongs);

  try {
    const serverResponse = await updateMutation({
      variables: {playlistID, updatedList},
    });

    return serverResponse;
  } catch (error) {
    console.log('There was an error updating the Playlist ', error);
  }
};

export const performDelete = async (
  deleteMutation,
  currentUser,
  selectedPlaylist,
) => {
  const {playlistID} = selectedPlaylist;

  try {
    const serverResponse = await deleteMutation({
      variables: {playlistID, userID: currentUser.id},
    });

    return serverResponse;
  } catch (error) {
    console.log('There was an error trying to delete the Playlist ', error);
  }

  // const resetState = resetLocalPlaylistState();
};

export const filterPlaylist = (selectedPlaylist, playlistSong) => {
  const {playlistSongs} = selectedPlaylist;

  const {id_user_id_identifier} = playlistSong;

  const filteredList = playlistSongs.filter(
    song => song.id_user_id_identifier != id_user_id_identifier,
  );

  return Object.assign({}, selectedPlaylist, {
    playlistSongs: filteredList,
  });
};
