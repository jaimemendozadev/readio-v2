const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { opts, getUserWithToken } = require("./jwt");
const { googleConfig, getGoogleProfile } = require("./google");

passport.use(new GoogleStrategy(googleConfig, getGoogleProfile));
passport.use(new JwtStrategy(opts, getUserWithToken));
module.exports = passport;
