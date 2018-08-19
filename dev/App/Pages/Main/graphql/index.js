import { gql } from "apollo-boost";

export const GET_CURRENTLY_PLYAING_SONG = gql`
  query GetCurrentlyPlayingSong {
    currentlyPlaying @client {
      currentSong
      playing
    }
  }
`;
