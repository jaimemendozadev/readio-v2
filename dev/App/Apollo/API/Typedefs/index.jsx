import React from 'react';

export const typeDefs = `
  type Song {
    title: String!
    permalink_url: String!
    artwork_url: String
    id_user_id_identifier: String!
  }

  type Playlist {
    name: String!
    songs: [Song]!      
  }

`;