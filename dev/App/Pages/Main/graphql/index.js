import { gql } from "apollo-boost";

export const GET_CURRENTLY_PLAYING_SONG = gql`
  query GetCurrentlyPlayingSong {
    currentlyPlaying @client {
      currentSong
      stack
      playing
    }
  }
`;
