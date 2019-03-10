const {findUserInDB} = require('./utils');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const getUserWithToken = async (jwt_payload, done) => {
  let foundUser = await findUserInDB(jwt_payload);

  done(null, foundUser);
};

const verifyToken = req => {
  let sliced = req.headers.authorization;

  sliced = sliced.slice(7);

  const secret = process.env.JWT_KEY;

  const decoded = jwt.verify(sliced, secret);

  return decoded;
};

module.exports = {
  opts,
  getUserWithToken,
  verifyToken,
};
