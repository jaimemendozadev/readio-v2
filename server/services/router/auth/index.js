const express = require('express');
const Router = express.Router();
const passport = require('../../Passport');
const {facebookAuth, googleAuth} = require('./controllers');


Router.use('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.use('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/login'}), googleAuth);

Router.use('/facebook', facebookAuth);

module.exports = Router;