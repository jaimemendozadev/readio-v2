import { gql } from "apollo-boost";

export const GET_CURRENTLY_PLAYING_SONG = gql`
  query GetCurrentlyPlayingSong {
    currentlyPlaying @client {
      currentSong
      stack
      playlistStack
      storedPlaylist
      userSelectedPlaylist
      playing
    }
  }
`;

export const GET_LOCAL_USER_INFO = gql`
  query GetLocalUserInfo {
    currentUser @client {
      id
      first_name
      last_name
      email
      playlists
    }
  }
`;

export const LOAD_SONG_IN_PLAYER = gql`
  mutation LoadSongInPlayer($songArg: UrlInput!) {
    loadSongInPlayer(songArg: $songArg) @client {
      __typename
      currentSong
      playing
    }
  }
`;