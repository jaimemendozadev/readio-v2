const { makeExecutableSchema } = require("graphql-tools");
const { readFileSync } = require("fs");
const { merge } = require("lodash");
const path = require("path");

const userSchemaPath = path.resolve(__dirname, "./User/user.graphql");
const songSchemaPath = path.resolve(__dirname, "./Song/song.graphql");
const playlistSchemaPath = path.resolve(
  __dirname,
  "./Playlist/playlist.graphql"
);

const userResolvers = require("./User/user.resolvers");
const songResolvers = require("./Song/song.resolvers");
const playlistResolvers = require("./Playlist/playlist.resolvers");

//we need to tell the server which types represent the root query
//and root mutation types. We call them RootQuery and RootMutation by convention.
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`;

let schema = makeExecutableSchema({
  typeDefs: [
    baseSchema,
    readFileSync(userSchemaPath, "utf-8"),
    readFileSync(songSchemaPath, "utf-8"),
    readFileSync(playlistSchemaPath, "utf-8")
  ],
  resolvers: merge({}, userResolvers, songResolvers, playlistResolvers)
});

module.exports = schema;
