const jwt = require('jsonwebtoken');

const generateToken = userID => {
  const JWT_KEY = process.env.JWT_KEY;

  const token = jwt.sign({userID}, JWT_KEY);

  return token ? token : {error: 'Failed to generate a token'};
};

const facebookAuth = (req, res) => {
  res.send('hit facebookAuth endpoint');
};

const googleAuth = (req, res) => {
  // req.user is an array with user info inside
  const user = req.user.pop();
  const userID = user._id;

  const token = generateToken(userID);

  res.redirect(`/login?token=${token}`);
};

module.exports = {
  facebookAuth,
  googleAuth,
};
