import { gql } from "apollo-boost";

const GET_SONG_LIST = gql`
  query getSongList {
    songList @client {
      __typename
      list
    }
  }
`;

const GET_CURRENT_SONG = gql`
  query CurrentlyPlaying {
    currentlyPlaying @client {
      __typename
      currentSong
      playing
    }
  }
`;

export default {
  GET_CURRENT_SONG,
  GET_CURRENT_SONG
}
