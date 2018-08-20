import { gql } from "apollo-boost";
export const resolvers = {
  Mutation: {
    addToSongList: (_, { songToAdd }, { cache }) => {
      // Create query to get songList
      const GET_SONG_LIST = gql`
        query getSongList {
          songList @client {
            __typename
            list
          }
        }
      `;

      // Old songList
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

    loadSongInPlayer: (_, { songArg }, { cache }) => {
      const GET_CURRENT_SONG = gql`
        query CurrentlyPlaying {
          currentlyPlaying @client {
            __typename
            currentSong
            playing
          }
        }
      `;

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
