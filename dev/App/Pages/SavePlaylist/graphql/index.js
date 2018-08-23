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
