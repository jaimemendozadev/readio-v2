import { GET_SONG_LIST } from "../graphql";
import { GET_CURRENT_SONG } from "../graphql";

export const resolvers = {
  Mutation: {
    addToSongList: (_, { songToAdd }, { cache }) => {
      // User query to get Old songList
      const oldState = cache.readQuery({ query: GET_SONG_LIST });

      const { list } = oldState.songList;

      // Add __typename to song
      songToAdd.__typename = "Song";

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

      console.log("cache after adding song to playlist ", cache);

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

      console.log("cache after deleting song from playlist ", cache);

      return filteredSong;
    },

    loadSongInPlayer: (_, { songArg }, { cache }) => {
      const oldState = cache.readQuery({ query: GET_CURRENT_SONG });

      const { currentlyPlaying } = oldState;

      songArg.__typename = "Url";

      const newState = Object.assign({}, currentlyPlaying, songArg);

      const data = {
        currentlyPlaying: newState
      };

      cache.writeQuery({ query: GET_CURRENT_SONG, data });

      console.log("cache after loading new song ", cache);

      return songArg;
    }
  } // End Mutation Object
};
