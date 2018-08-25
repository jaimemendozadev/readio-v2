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
    selectedPlaylist: {},
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
