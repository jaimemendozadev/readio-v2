export const typeDefs = `
  type CreateSong {
    id_user_id_identifier: String!
    title: String!
    permalink_url: String!
    artwork_url: String
  }

  input UrlInput {
    currentSong: String
    playing: Boolean
  }

  input CreatePlaylist {
    name: String
    songs: [Song]
  }

  input SongInput {
    id_user_id_identifier: String!
    title: String!
    permalink_url: String!
    artwork_url: String

  }

  input LoadPlaylist {
    id: String!
    name: String!
    songs: [SongInput]!
  }

  input UpdatePlaylist {
    name: String
    songs: [SongInput]! 
  }

  type Mutation {
    addToSongList(songToAdd: CreateSong!): CreateSong
    deleteFromSongList(songID: String!): Song
    loadSongInPlayer(songArg: UrlInput!)
    loadPlaylistInCache(playlistArg: LoadPlaylist!)
  }
`;
