const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {googleConfig, getGoogleProfile} = require('./google');

passport.use(new GoogleStrategy(googleConfig, getGoogleProfile));

module.exports = passport;