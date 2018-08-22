export const typeDefs = `
  type CreateSong {
    id_user_id_identifier: String!
    title: String!
    permalink_url: String!
    artwork_url: String
  }

  type Url {
    currentSong: String
    playing: Boolean
  }

  input UrlInput {
    currentSong: String
    playing: Boolean
  }

  input CreatePlaylist {
    name: String
    list: [Song]
  }

  type Mutation {
    addToSongList(songToAdd: CreateSong!): CreateSong
    deleteFromSongList(songID: String!): Song
    loadSongInPlayer(songArg: UrlInput!): Url
  }
`;

/*
  For a successful mutation to GraphQL API, 
  
  - input/type names on frontend & backend need to match
  - type of every argument has to match both on the frontend and backend


  There seems to be a mismatch in types
  Song is used in frontend
  CreateSong is used in backend


  Backend CreatePlaylist input

  input CreatePlaylist {
    name: String!
    list: [CreateSong]! 
  }

*/
