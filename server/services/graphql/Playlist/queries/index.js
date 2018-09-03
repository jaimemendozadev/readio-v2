const getPlaylist = async (_, { playlistID }, { models }) => {
  const { Playlist } = models;

  const foundPlaylist = await Playlist.findById(playlistID);

  return foundPlaylist;
};

module.exports = {
  getPlaylist
};
