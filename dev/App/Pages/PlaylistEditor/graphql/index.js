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
