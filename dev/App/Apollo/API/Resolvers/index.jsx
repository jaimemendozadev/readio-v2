import { gql } from 'apollo-boost';
export const resolvers = {
  Mutation: {
    addToSongList: (_, { songToAdd }, { cache }) => {

      // Create query to get songList
      const GET_SONG_LIST = gql`
        query getSongList {
          songList @client {
            title
            permalink_url
            artwork_url
            id_user_id_identifier
          }
        }
      `

      // Old songList
      const oldState = cache.readQuery({query: GET_SONG_LIST});

      console.log('oldState is ', oldState)

      // Update songList with new song
      const newState = [...oldState.songList];

      newState.push(songToAdd);

      console.log('new state is ', newState)

      const data = {
        songList: newState
      }

      cache.writeData({ data });

      console.log('cache after write ', cache)

      return songToAdd;

    }    
  }
};