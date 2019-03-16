import {GET_SONG_LIST, GET_USER_ID} from '../../Apollo/API/graphql/index.js';

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

export const savePlaylistToDB = async (saveToDBMutation, client) => {
  const {songList} = client.readQuery({query: GET_SONG_LIST});
  const {currentUser} = client.readQuery({query: GET_USER_ID});

  const filteredList = editSongList(songList.list);

  const input = {
    name: escapeHtml(songList.name),
    songs: filteredList,
  };

  const userID = currentUser.id;

  const {data} = await saveToDBMutation({
    variables: {userID, input},
  });

  const {createPlaylist} = data;

  if (!createPlaylist.error) {
    const defaultSongList = {
      songList: Object.assign({}, songList, {name: 'untitled', list: []}),
    };

    client.writeQuery({query: GET_SONG_LIST, data: defaultSongList});

    console.log('cache after resetting ', client);
  }
};
