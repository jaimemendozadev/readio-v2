import { gql } from "apollo-boost";

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

export const SAVE_USER_IN_CACHE = gql`
  query getCurrentUser {
    currentUser @client {
      __typename
      id
      first_name
      last_name
      email
      playlists
    }
  }
`;

export const LOAD_PLAYLIST_IN_CACHE = gql`
  mutation($playlistArg: LoadPlaylist!) {
    loadPlaylistInCache(playlistArg: $playlistArg) @client
  }
`;

/*
Note:
When querying nested resolvers, you MUST tell GraphQL
to return something. Otherwise you'll get an 

`Message: Field "playlists" of type "[Playlist]!" must have a selection of subfields.`

*/
