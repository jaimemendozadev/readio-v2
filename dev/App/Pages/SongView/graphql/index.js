import { gql } from "apollo-boost";

export const LOAD_SONG_IN_PLAYER = gql`
  mutation LoadSongInPlayer($songArg: UrlInput!) {
    loadSongInPlayer(songArg: $songArg) @client {
      __typename
      currentSong
      playing
    }
  }
`;
