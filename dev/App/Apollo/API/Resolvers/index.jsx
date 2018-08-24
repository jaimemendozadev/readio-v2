import { GET_SONG_LIST } from "../graphql";
import { GET_CURRENT_SONG } from "../graphql";

export const resolvers = {
  Mutation: {
    addToSongList: (_, { songToAdd }, { cache }) => {
      // User query to get Old songList
      const oldState = cache.readQuery({ query: GET_SONG_LIST });

      const { list } = oldState.songList;

      // Add __typename to song for Apollo cache tracking
      // MUST DELETE when sending songs to backend
      songToAdd.__typename = "CreateSong";

      // Update songList with new song
      const newState = [].concat(list, [songToAdd]);

      //spread the rest of oldState.songList properties
      const data = {
        songList: {
          ...oldState.songList,
          list: newState
        }
      };

      // WARNING: cache.writeData prevented writing to cache
      cache.writeQuery({ query: GET_SONG_LIST, data });

      return songToAdd;
    },

    deleteFromSongList: (_, { songID }, { cache }) => {
      let filteredSong;

      const oldState = cache.readQuery({ query: GET_SONG_LIST });

      const { list } = oldState.songList;

      const newState = list.filter(song => {
        if (songID != song.id_user_id_identifier) {
          return song;
        } else {
          filteredSong = song;
        }
      });

      const data = {
        songList: {
          ...oldState.songList,
          list: newState
        }
      };

      cache.writeQuery({ query: GET_SONG_LIST, data });

      return filteredSong;
    },

    loadSongInPlayer: (_, { songArg }, { cache }) => {
      const oldState = cache.readQuery({ query: GET_CURRENT_SONG });

       const currentlyPlaying = Object.assign({}, oldState.currentlyPlaying, songArg);

      console.log('new currentlyPlaying ', currentlyPlaying)

      const data = {
        ...oldState,
        currentlyPlaying
      }

      cache.writeQuery({ query: GET_CURRENT_SONG, data });
      
      // See notes
      return null;
    },

    loadPlaylistInCache: (_, { playlistArg }, { cache }) => {
      console.log('playlistArg inside loadPlaylistInCache ', playlistArg)

      // Make copy of playlistArt locally, see note below
      let localPlaylist = playlistArg.songs.slice(0);

      const oldState = cache.readQuery({ query: GET_CURRENT_SONG });
      const { currentlyPlaying } = oldState;

      const stackLength = currentlyPlaying.stack.length;

      // Get the first song from localPlaylist, remove from localPlaylist
      const newCurrentSong = localPlaylist[0].permalink_url;
      localPlaylist.shift();

      // Update the stack
      const newStack =
        stackLength == 0
          ? localPlaylist
          : localPlaylist.concat(currentlyPlaying.stack);


      // Put original playlistArg into selectedPlaylist key
      const newState = {
        currentSong: newCurrentSong,
        stack: newStack,
        selectedPlaylist: playlistArg,
        playing: true
      };

      const data = {
        ...oldState,
        currentlyPlaying: Object.assign({}, oldState.currentlyPlaying, newState)
      };

      cache.writeQuery({ query: GET_CURRENT_SONG, data });

      console.log('cache after loadPlaylistInCache ', cache)

      // See notes
      return null;
    }
  } // End Mutation Object
};

/*
  Notes

  For loadSongInPlayer
  -Originally returned currentSong url and playing boolean, now returns null, functionality still works.

  For loadPlaylistInCache:
  - Must slice incoming playlistArg. Else we get "Cannot assign to read only property '0' of object '[object Array]'" error


  -MUST RETURN SOMETHING. If schema doesn't specify returning anything, return null
*/
