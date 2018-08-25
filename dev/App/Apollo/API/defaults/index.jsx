export const defaults = {
  songList: {
    __typename: "SongList",
    name: "untitled",
    list: []
  },
  currentlyPlaying: {
    __typename: "SongStack",
    currentSong:
      "https://soundcloud.com/john-dollar-1/alesso-years-original-mix",
    stack: [],
    playlistStack: [],
    selectedPlaylist: {
      __typename: "Playlist",
      id: "",
      name: "untitled",
      songs: [],
    },
    userSelectedPlaylist: false,
    playing: false
  },
  currentUser: {
    __typename: "CurrentUser",
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    playlists: []
  }
};
