const express = require('express');
const Router = express.Router();
const passport = require('passport');
const authRouter = require('./auth');

const applyRouterMiddlware = app => {
  Router.use('/login', authRouter);
  app.use(
    '/graphql',
    passport.authenticate('jwt', {session: false}),
    (_req, _res, next) => next(),
  );

  app.use('/api', Router);
};

module.exports = applyRouterMiddlware;
