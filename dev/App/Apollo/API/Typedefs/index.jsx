import React from "react";

export const typeDefs = `
  type Song {
    id_user_id_identifier: String!
    title: String!
    permalink_url: String!
    artwork_url: String
  }

  type SongList {
    list: [Song]
  }

  type Mutation {
    addToSongList(songToAdd: Song!): Song
  }
`;
