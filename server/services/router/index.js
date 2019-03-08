const express = require('express');
const Router = express.Router();
const authRouter = require('./auth');

const applyRouterMiddlware = app => {
  Router.use('/login', authRouter);
  app.use('/api', Router);
};

module.exports = applyRouterMiddlware;
