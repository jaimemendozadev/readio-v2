import Playlist from '../../../../DB/Schemas/Playlist';

export const getPlaylist = async(_, {playlistID}) => {
  const foundPlaylist = Playlist.findById(playlistID);
  
  return foundPlaylist;
}