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

export const checkPlaylistName = (textInput, playlistName) => {
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
  return {
    playlistID: '',
    playlistName: '',
    playlistToEdit: {},
    playlistSongs: [],
  };
};

export const performDBUpdate = async saveToDBMutation => {
  const {textInput, selectedPlaylist} = this.state;
  const {playlistID, playlistName, playlistSongs} = selectedPlaylist;

  const nameInput = checkPlaylistName(textInput, playlistName);

  const sanitizedName = escapeHtml(nameInput);

  const updatedList = prepPlaylistPayload(sanitizedName, playlistSongs);

  const result = await saveToDBMutation({
    variables: {playlistID, updatedList},
  });

  console.log('result from DB after updating playlist ', result);
};

export const deleteFromDB = async deletePlaylistMutation => {
  const {currentUser, selectedPlaylist} = this.state;
  const {playlistID} = selectedPlaylist;

  const result = await deletePlaylistMutation({
    variables: {playlistID, userID: currentUser.id},
  });

  const resetState = resetLocalPlaylistState();

  return resetState;

  console.log('message from deletePlaylist mutation ', result);
};
