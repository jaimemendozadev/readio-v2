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

      console.log("songToAdd is ", songToAdd);

      // Old songList
      const oldState = cache.readQuery({ query: GET_SONG_LIST });

      const { list } = oldState.songList;

      console.log("oldState is ", oldState);

      // Add __typename to song
      songToAdd.__typename = "Song";

      // Update songList with new song
      const newState = [].concat(list, [songToAdd]);

      console.log("new state is ", newState);

      const data = {
        songList: {
          ...oldState.songList,
          list: newState
        }
      };

      // WARNING: cache.writeData prevented writing to cache
      cache.writeQuery({ query: GET_SONG_LIST, data });

      console.log("cache after write ", cache);

      return songToAdd;
    }
  }
};
