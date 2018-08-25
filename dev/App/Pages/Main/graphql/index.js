import { gql } from "apollo-boost";

export const GET_CURRENTLY_PLAYING_SONG = gql`
  query GetCurrentlyPlayingSong {
    currentlyPlaying @client {
      currentSong
      stack
      playlistStack
      userSelectedPlaylist
      playing
    }
  }
`;

/*
Note:
selectedPlaylist was originally an empty {} and 
caused query to break. <Main /> component was 
stuck in Loading spinner because selectedPlaylist
keys were never specified in default state and
query never requested any of the keys in 
selectedPlaylist
*/