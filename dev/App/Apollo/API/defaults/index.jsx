export const defaults = {
  songList: {
    __typename: "SongList",
    list: []
  },
  currentlyPlaying: {
    __typename: "Url",
    currentSong:
      "https://soundcloud.com/john-dollar-1/alesso-years-original-mix",
    playing: false
  },
  currentUser: {
    __typename: "CurrentUser",
    id: "",
    first_name: "",
    email: "",
    playlists: []
  }
};
