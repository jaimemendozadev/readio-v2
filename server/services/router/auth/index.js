const express = require('express');
const Router = express.Router();
const passport = require('../../Passport');

const googleAuth = (req, res) => {
  console.log("googleAuth req is ", req);
  res.send('hit googleAuth endpoint');
  
}

const facebookAuth = (req, res) => {
  console.log("facebookAuth req is ", req);
  res.send('hit facebookAuth endpoint');
}

//Test Auth Route
//Router.use('/google', googleAuth);

Router.use('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.use('/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/login'}), googleAuth);


Router.use('/facebook', facebookAuth);

module.exports = Router;