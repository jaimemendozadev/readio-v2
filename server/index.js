require('./DB');
const {User, Song, Playlist} = require('./DB/Schemas');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const app = express();
const path = require('path');
const schema = require('./services/graphql');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const applyMiddleware = require('./services/middleware');

applyMiddleware(app);

const server = new ApolloServer({
  schema,
  context: ({req}) => {
    console.log('req inside context ', req);

    return {req};
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
