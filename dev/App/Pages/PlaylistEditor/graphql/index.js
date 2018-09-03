import { gql } from "apollo-boost";

export const GET_USER_ID = gql`
  query getCurrentUser {
    currentUser @client {
      __typename
      id
    }
  }
`;

export const UPDATE_PLAYLIST = gql`
  mutation UpdatePlaylist($playlistID: ID!, $updatedList: UpdatePlaylist!) {
    updatePlaylist(playlistID: $playlistID, updatedList: $updatedList) {
      error
      message
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($playlistID: ID!, $userID: ID!) {
    deletePlaylist(playlistID: $playlistID, userID: $userID) {
      error
      message
    }
  }
`;

export const GET_USER_INFO = gql`
  query getUserInfo {
    getUser {
      id
      first_name
      last_name
      email
      playlists {
        id
        name
        songs {
          id_user_id_identifier
          title
          permalink_url
          artwork_url
        }
      }
    }
  }
`;
