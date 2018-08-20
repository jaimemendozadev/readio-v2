import {gql} from 'apollo-boost';

export const GET_SONG_LIST = gql`
  query getSongList {
    songList @client {
      __typename
      list
    }
  }
`;