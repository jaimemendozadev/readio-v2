const User = require('../../../../DB/Schemas/User');

const playlists = async(_parent, _args, {user}) => {
  
  const{playlists} = await User.findById(user).populate('playlists');

  return playlists;
}

const getUser = async(_parent, _args, {user} ) => {
  //get User from DB
  const foundUser = await User.findById(user);
  
  return foundUser;
  
}

module.exports = {
  playlists,
  getUser
}