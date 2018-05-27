const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL} = process.env;

const googleConfig = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL
};

const getGoogleProfile = (accessToken, refreshToken, profile, cb) => {
  console.log('accessToken ', accessToken);
  console.log("\n");
  console.log('refreshToken ', refreshToken);
  console.log("\n");
  console.log('profile ', profile);
  console.log("\n");
}





module.exports = {
  googleConfig,
  getGoogleProfile
}