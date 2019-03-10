const {ApolloServer} = require('apollo-server-express');
const {User, Song, Playlist} = require('../../DB/Schemas');
const schema = require('./BuildSchema');

const server = new ApolloServer({
  schema,
  context: ({req}) => {
    // req will container user found in Passport jwt auth strategy
    const userID = req.user._id;

    return {
      req,
      userID,
      models: {
        User,
        Song,
        Playlist,
      },
    };
  },
});

module.exports = server;
