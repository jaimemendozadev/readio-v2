const express = require('express');
const Router = express.Router();

const googleAuth = (req, res) => {
  console.log("googleAuth req is ", req);
  res.send('hit googleAuth endpoint');
  
}

const facebookAuth = (req, res) => {
  console.log("facebookAuth req is ", req);
  res.send('hit facebookAuth endpoint');
}




Router.use('/google', googleAuth);
Router.use('/facebook', facebookAuth);

module.exports = Router;