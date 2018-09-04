const playlists = async (_parent, _args, { userID, models }) => {
  const { User } = models;

  const { playlists } = await User.findById(userID).populate("playlists");

  return playlists;
};

const getUser = async (_parent, _args, { userID, models }) => {
  const { User } = models;

  const foundUser = await User.findById(userID);
  const foundPlaylists = await User.findById(userID).populate("playlists");

  foundUser.playlists = foundPlaylists;

  return foundUser;
};

module.exports = {
  playlists,
  getUser
};
