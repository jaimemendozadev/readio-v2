const Playlist = require('../../../../DB/Schemas/Playlist');

const getPlaylist = async(_, {playlistID}) => {
  
  const foundPlaylist = await Playlist.findById(playlistID);
  
  return foundPlaylist;
}

module.exports = {
  getPlaylist
}