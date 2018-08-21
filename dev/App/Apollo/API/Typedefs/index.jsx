export const typeDefs = `
  type Song {
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

  type SongList {
    name: String
    list: [Song]
  }

  type Mutation {
    addToSongList(songToAdd: Song!): Song
    deleteFromSongList(songID: String!): Song
    loadSongInPlayer(songArg: UrlInput!): Url
  }
`;
