import Playlist from '../../../../DB/Schemas';

export const getPlaylist = async(_, {id}) => {
  const foundPlaylist = Playlist.findById(id);
  
  return foundPlaylist;
}