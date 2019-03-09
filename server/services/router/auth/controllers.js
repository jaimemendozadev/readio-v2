const jwt = require('jsonwebtoken');

const generateToken = userID => {
  const JWT_KEY = process.env.JWT_KEY;

  console.log('jwt.sign({userID}, JWT_KEY) is ', jwt.sign({userID}, JWT_KEY));
  const token = jwt.sign({userID}, JWT_KEY);

  return token ? token : {error: 'Failed to generate a token'};
};

const facebookAuth = (req, res) => {
  res.send('hit facebookAuth endpoint');
};

const googleAuth = (req, res) => {
  console.log('user inside googleAuth is ', req.user);
  const userID = req.user._id;

  const token = generateToken(userID);

  console.log('google token generated on server is ', token);
  console.log('token attached to /login and redirect to FE');

  res.redirect(`/login?token=${token}`);
};

module.exports = {
  facebookAuth,
  googleAuth,
};
