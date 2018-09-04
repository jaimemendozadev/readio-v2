import { GET_CURRENTLY_PLAYING_SONG } from "../../Apollo/API/graphql/index.js";

export const queueNextSongInPlayer = client => {

  const oldState = client.readQuery({ query: GET_CURRENTLY_PLAYING_SONG });
  const { currentlyPlaying } = oldState;

  const currentPlaylistStack = currentlyPlaying.playlistStack.slice();
  const currentStack = currentlyPlaying.stack.slice();

  let songToQueue = null;

  if (currentPlaylistStack.length) {
    songToQueue = currentPlaylistStack.shift();
  } else if (currentStack.length) {
    songToQueue = currentStack.shift();
  }

  const newState = {};

  newState.currentSong = !songToQueue ? "" : songToQueue.permalink_url;
  newState.playing = !songToQueue ? false : true;

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

  client.writeQuery({ query: GET_CURRENTLY_PLAYING_SONG, data });

  console.log("client after loading new song in player ", client);
};
