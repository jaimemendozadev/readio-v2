const DB = require('./DB');
const express = require('express');
const app = express();
const applyAuthMiddleware = require('./services/router')
const bodyParser = require('body-parser');
const path = require('path');
const schema = require('./services/graphql');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const indexHTML = path.resolve(__dirname, '../public/index.html');
const staticAssets = path.resolve(__dirname, '../public');


app.use(express.static(staticAssets));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
applyAuthMiddleware(app);


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