import { gql } from "apollo-boost";

export const GET_SONG_LIST = gql`
  query getSongList {
    songList @client {
      __typename
      name
      list
    }
  }
`;

export const GET_CURRENT_SONG = gql`
  query CurrentlyPlaying {
    currentlyPlaying @client {
      __typename
      currentSong
      stack
      playlistStack
      storedPlaylist
      userSelectedPlaylist
      playing
    }
  }
`;
