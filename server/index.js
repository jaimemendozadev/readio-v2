const DB = require('./DB');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const schema = require('./services/graphql');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {
    req
  }
})));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.get('*', (req, res) => {
  res.status(200).send('hit the api');
});



module.exports = app;