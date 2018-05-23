import Playlist from '../../../../DB/Schemas/Playlist';

export const createPlaylist = async(_, {input}) => {
  
  const newPlaylist = await Playlist.create(input).exec();

  return newPlaylist;
}

export const addSongToPlaylist = async() => {
  
}