import Playlist from '../../../../DB/Schemas';

export const createPlaylist = async(_, {input}) => {
  
  const newPlaylist = await Playlist.create(input).exec();

  return newPlaylist;
}