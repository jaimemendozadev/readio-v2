require('./DB');
const express = require('express');
const app = express();
const path = require('path');
const server = require('./services/graphql');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const applyMiddleware = require('./services/middleware');

applyMiddleware(app);

server.applyMiddleware({app, path: '/graphql'});

// app.use('*') must be done last
app.use('*', (_req, res) => {
  res.sendFile(indexHTML);
});

module.exports = {
  app,
  server,
};
