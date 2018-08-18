const { getPlaylist } = require("./queries");
const {
  createPlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist
} = require("./mutations");

module.exports = {
  Query: {
    getPlaylist
  },

  Mutation: {
    createPlaylist,
    addSongToPlaylist,
    deleteSongFromPlaylist
  }
};
