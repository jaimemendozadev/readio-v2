const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('*', (req, res) => {
  res.status(200).send('hit the api');
});

module.exports = app;
