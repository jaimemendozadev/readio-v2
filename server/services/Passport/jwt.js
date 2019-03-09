const {findUserInDB} = require('./utils');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const getUserWithToken = async (jwt_payload, done) => {
  console.log('jwt_payload is ', jwt_payload);

  let foundUser = await findUserInDB(jwt_payload);

  console.log('found user is ', foundUser);

  done(null, foundUser);
};

module.exports = {
  opts,
  getUserWithToken,
};
