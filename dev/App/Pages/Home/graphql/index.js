import {gql} from 'apollo-boost';

export const getUserInfo = gql`
  query getUserInfo {
    getUser {
      id
      first_name
      last_name
      email
      playlists {
        id
        name
      }
    }
  }
`


export const getCurrentUser = gql`
  query GetCurrentUser {
    getCurrentUser @client {
      id
      first_name
      last_name
      email
      playlists
    }
  }
`

/*
Note:
When querying nested resolvers, you MUST tell GraphQL
to return something. Otherwise you'll get an 

`Message: Field "playlists" of type "[Playlist]!" must have a selection of subfields.`

*/

