require('./DB');
const {User, Song, Playlist} = require('./DB/Schemas');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const app = express();
const path = require('path');
const schema = require('./services/graphql');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const applyMiddleware = require('./services/middleware');
const passport = require('./services/Passport');
const {verifyToken} = require('./services/Passport/jwt');

applyMiddleware(app);

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

server.applyMiddleware({app, path: '/graphql'});

// app.use('*') must be done last
app.use('*', (_req, res) => {
  res.sendFile(indexHTML);
});

module.exports = {
  app,
  server,
};
