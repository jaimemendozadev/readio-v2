require('./DB');
const {User, Song, Playlist} = require('./DB/Schemas');
const express = require('express');
const app = express();
const path = require('path');
const schema = require('./services/graphql');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const applyMiddleware = require('./services/middleware');
const passport = require('./services/Passport');
const {verifyToken} = require('./services/Passport/jwt');
applyMiddleware(app);

app.use(
  '/graphql',
  passport.authenticate('jwt', {session: false}),
  graphqlExpress(async req => {
    console.log('\n');
    console.log('Debugging token sent to GraphQL API');
    await verifyToken(req);
    return {
      schema,
      context: {
        req,
        userID: req.user._id,
        models: {
          User,
          Song,
          Playlist,
        },
      },
    };
  }),
);

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.use('*', (req, res) => {
  res.sendFile(indexHTML);
});

module.exports = app;
