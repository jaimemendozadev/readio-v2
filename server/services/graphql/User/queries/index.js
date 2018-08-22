const playlists = async (_parent, _args, { userID, models }) => {
  const { User } = models;

  const { playlists } = await User.findById(userID).populate("playlists");

  return playlists;
};

const getUser = async (_parent, _args, { userID, models }) => {
  const { User } = models;

  //get User from DB
  const foundUser = await User.findById(userID);
  const foundPlaylists = await User.findById(userID).populate('playlists');


  console.log('foundUser in DB ', foundUser)
  console.log('foundUserPlaylists in DB ', foundPlaylists)

  foundUser.playlists = foundPlaylists;
  

  return foundUser;
};

module.exports = {
  playlists,
  getUser
};
