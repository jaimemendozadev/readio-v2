import { gql } from "apollo-boost";

export const ADD_TO_SONG_LIST = gql`
  mutation AddToSongList($songToAdd: Song!) {
    addToSongList(songToAdd: $songToAdd) @client {
      id_user_id_identifier
      title
      permalink_url
      artwork_url
    }
  }
`;

export const SEARCH_SOUND_CLOUD = gql`
  query SearchSoundCloud($searchTerm: String!) {
    searchSoundCloud(searchTerm: $searchTerm) {
      id_user_id_identifier
      title
      permalink_url
      artwork_url
    }
  }
`;