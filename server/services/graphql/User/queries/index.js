const User = require('../../../../DB/Schemas/User');

const playlists = async(object) => {
  const {id} = object;
  console.log(`the object is ${object}`);

  const playlists = await User.findById(id).populate('playlists').exec();

  console.log(`the playlists are `, playlists);

  return playlists;


}

const getUser = async(_, {id}) => {
  //get User from DB
  
  const foundUser = await User.findById(id);
  
  return foundUser;
  
}

module.exports = {
  playlists,
  getUser
}