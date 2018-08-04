const DB = require('./DB');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./services/graphql');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const applyMiddleware = require('./services/middleware');
const passport = require('./services/Passport');


applyMiddleware(app);


app.use('/graphql', passport.authenticate('jwt', { session: false }), graphqlExpress((req) => ({
  schema,
  context: {
    req,
    user: req.user._id
  }
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.use('*', (req, res) => {
  res.sendFile(indexHTML);
});



module.exports = app;