const {findUserInDB} = require('./utils');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

const getUserWithToken = async (jwt_payload, done) => {
  
  let foundUser = await findUserInDB(jwt_payload); 
    
  done(null, foundUser);
}


module.exports = {
  opts,
  getUserWithToken
}