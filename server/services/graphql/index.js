const {makeExecutableSchema} = require('apollo-server');

const {readFileSync} = require('fs');
const {merge} = require('lodash');
const path = require('path');
const baseSchema = path.resolve(__dirname, './Base/base.graphql');
const userSchemaPath = path.resolve(__dirname, './User/user.graphql');
const songSchemaPath = path.resolve(__dirname, './Song/song.graphql');
const playlistSchemaPath = path.resolve(
  __dirname,
  './Playlist/playlist.graphql',
);

const userResolvers = require('./User/user.resolvers');
const songResolvers = require('./Song/song.resolvers');
const playlistResolvers = require('./Playlist/playlist.resolvers');

const schema = makeExecutableSchema({
  typeDefs: [
    readFileSync(baseSchema, 'utf-8'),
    readFileSync(userSchemaPath, 'utf-8'),
    readFileSync(songSchemaPath, 'utf-8'),
    readFileSync(playlistSchemaPath, 'utf-8'),
  ],
  resolvers: merge({}, userResolvers, songResolvers, playlistResolvers),
});

module.exports = schema;
