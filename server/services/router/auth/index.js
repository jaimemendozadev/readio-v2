const express = require("express");
const Router = express.Router();
const passport = require("passport");
const { facebookAuth, googleAuth } = require("./controllers");

Router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
Router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login"
  }),
  googleAuth
);

Router.get("/facebook", facebookAuth);

module.exports = Router;
