import User from '../../../../DB/Schemas';
import Playlist from '../../../../DB/Schemas';


export const playlists = async(object) => {
  const {id} = object;
  console.log(`the object is ${object}`);

  const playlists = await User.findById(id).populate('playlists').exec();

  console.log(`the playlists are `, playlists);

  return playlists;


}



export const getPlaylist = async(_, {id}) => {
  const foundPlaylist = Playlist.findById(id);

  return foundPlaylist;
}

export const getUser = async(_, {id}) => {
  //get User from DB
  
  const foundUser = await User.findById(id);
  
  return foundUser;
  
}