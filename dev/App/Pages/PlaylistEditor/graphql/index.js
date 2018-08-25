import { gql } from "apollo-boost";

export const GET_SELECTED_PLAYLIST = gql`
  query getSelectedPlayList {
    currentlyPlaying @client {
      selectedPlaylist
    }
  }
`;

export const GET_USER_ID = gql`
  query getCurrentUser {
    currentUser @client {
      __typename
      id
    }
  }
`;

export const DELETE_FROM_SONG_LIST = gql`
  mutation DeleteFromSongList($songID: String!) {
    deleteFromSongList(songID: $songID) @client {
      id_user_id_identifier
      title
      permalink_url
      artwork_url
    }
  }
`;

export const SAVE_SONGLIST_TO_DB = gql`
  mutation SaveSonglistToDB($userID: ID!, $input: CreatePlaylist!) {
    createPlaylist(userID: $userID, input: $input) {
      error
      message
    }
  }
`;
