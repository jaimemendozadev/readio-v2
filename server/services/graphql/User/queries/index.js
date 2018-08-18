const playlists = async (_parent, _args, { userID, models }) => {
  const { User } = models;

  const { playlists } = await User.findById(userID).populate("playlists");

  return playlists;
};

const getUser = async (_parent, _args, { userID, models }) => {
  const { User } = models;

  //get User from DB
  const foundUser = await User.findById(userID);

  return foundUser;
};

module.exports = {
  playlists,
  getUser
};
