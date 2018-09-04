import { GET_CURRENTLY_PLAYING_SONG } from "./graphql";

export const queueNextSongInPlayer = client => {
  // GET_CURRENTLY_PLAYING_SONG

  const oldState = client.readQuery({ query: GET_CURRENTLY_PLAYING_SONG });
  const { currentlyPlaying } = oldState;

  const currentPlaylistStack = currentlyPlaying.playlistStack.slice();
  const currentStack = currentlyPlaying.stack.slice();

  let songToQueue = null;

  //If there's no song in either stack, currentSong is empty string
  if (currentPlaylistStack.length) {
    songToQueue = currentPlaylistStack.shift();
  } else if (currentStack.length) {
    songToQueue = currentStack.shift();
  }

  const newState = {};

  //If there's no song in either stack, there is no currentSong
  newState.currentSong = !songToQueue ? "" : songToQueue.permalink_url;
  newState.playing = !songToQueue ? false : true;

  //If there's nothing in the playlistStack, empty out the stored playlist
  newState.storedPlaylist =
    currentPlaylistStack.length == 0 ? [] : currentlyPlaying.storedPlaylist;

  newState.userSelectedPlaylist =
    currentPlaylistStack.length == 0 ? false : true;

  newState.stack = currentStack;
  newState.playlistStack = currentPlaylistStack;

  const data = {
    ...oldState,
    currentlyPlaying: Object.assign({}, currentlyPlaying, newState)
  };

  let result = client.writeQuery({ query: GET_CURRENTLY_PLAYING_SONG, data });

  console.log("client after loading new song in player ", client);
  console.log("result after loading new song in player ", result);
};

/*


 currentlyPlaying: {
    __typename: "SongStack",
    currentSong:
      "https://soundcloud.com/john-dollar-1/alesso-years-original-mix",
    stack: [],
    playlistStack: [],
    storedPlaylist: [],
    userSelectedPlaylist: false,
    playing: false
  },


  */
