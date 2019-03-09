const {findUserInDB} = require('./utils');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const getUserWithToken = async (jwt_payload, done) => {
  console.log('jwt_payload is ', jwt_payload);

  let foundUser = await findUserInDB(jwt_payload);

  console.log('found user is ', foundUser);

  done(null, foundUser);
};

const verifyToken = async req => {
  let sliced = req.headers.authorization;
  console.log('req.headers authorization is ', req.headers.authorization);
  sliced = sliced.slice(7);

  console.log('sliced from req is ', sliced);

  const secret = process.env.JWT_KEY;

  // verify a token symmetric
  const result = await jwt.verify(sliced, secret, function(err, decoded) {
    console.log('decoded token is ', decoded);
    if (err) {
      console.log('err decoding JWT ', err);
    } else {
      return decoded;
    }
  });
};

module.exports = {
  opts,
  getUserWithToken,
  verifyToken,
};
