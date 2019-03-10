const express = require('express');
const Router = express.Router();
const {authRouter, graphqlAuthRouter} = require('./auth');

const applyRouterMiddlware = app => {
  Router.use('/login', authRouter);
  // Must attach graphqlAuthRouter directly to app, else it won't work
  app.use('/graphql', graphqlAuthRouter);
  app.use('/api', Router);
};

module.exports = applyRouterMiddlware;
