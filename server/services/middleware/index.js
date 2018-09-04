const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("../Passport");
const applyRouterMiddlware = require("../router");
const staticAssets = path.resolve(__dirname, "../../../public");

const applyMiddleware = app => {
  app.use(express.static(staticAssets));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  applyRouterMiddlware(app);
};

module.exports = applyMiddleware;
