import {gql} from 'apollo-boost';

export const GET_CACHED_PLAYLIST = gql`
  query getCachedPlaylist {
    currentPlaylist @client {
      title
      permalink_url
      artwork_url
      id_user_id_identifier
    }
  }
`


export const SEARCH_SOUND_CLOUD = gql`
  query SearchSoundCloud($searchTerm: String!) {
    searchSoundCloud(searchTerm: $searchTerm) {
      title
      permalink_url
      artwork_url
      id_user_id_identifier
    }
  }
`