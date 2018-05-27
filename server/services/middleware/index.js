const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAssets = path.resolve(__dirname, '../../../public');


const applyMiddleware = app => {
  app.use(express.static(staticAssets));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
}


module.exports = applyMiddleware;
