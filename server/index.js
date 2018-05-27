const DB = require('./DB');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./services/graphql');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const applyMiddleware = require('./services/middleware');



applyMiddleware(app);


app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {
    req
  }
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.use('*', (req, res) => {
  res.sendFile(indexHTML);
});



module.exports = app;