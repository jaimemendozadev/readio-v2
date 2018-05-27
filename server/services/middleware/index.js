const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('../Passport');
const applyRouterMiddlware = require('../router');
const staticAssets = path.resolve(__dirname, '../../../public');




const applyMiddleware = app => {
  console.log("passport ", passport)
  app.use(morgan('tiny'))
  app.use(express.static(staticAssets));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(passport.initialize());
  applyRouterMiddlware(app);
}


module.exports = applyMiddleware;
