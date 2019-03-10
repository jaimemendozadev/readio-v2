const express = require('express');
const Router = express.Router();
const passport = require('passport');

// Authentication for '/graphql' endpoint
Router.all(
  '/',
  passport.authenticate('jwt', {session: false}),
  (_req, _res, next) => next(),
);

module.exports = Router;
