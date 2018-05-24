const userSchema = require('./User/user.graphql');

const songSchema = require('./Song/song.graphql');

const playlistSchema = require('./Playlist/playlist.graphql');


//we need to tell the server which types represent the root query
//and root mutation types. We call them RootQuery and RootMutation by convention.
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`


