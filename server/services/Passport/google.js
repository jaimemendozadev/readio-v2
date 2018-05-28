const {getCreateUser} = require('./utils');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = process.env;

const googleConfig = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
};


const getGoogleProfile = async(accessToken, refreshToken, profile, cb) => {
 
  const userFromDB = await getCreateUser(profile);

  return cb(null, userFromDB);

}





module.exports = {
  googleConfig,
  getGoogleProfile
}