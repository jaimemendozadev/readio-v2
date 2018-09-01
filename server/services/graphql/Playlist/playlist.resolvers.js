const { getPlaylist } = require("./queries");
const {
  createPlaylist,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist
} = require("./mutations");

module.exports = {
  Query: {
    getPlaylist
  },

  Mutation: {
    createPlaylist,
    addSongToPlaylist,
    updatePlaylist,
    deletePlaylist
  }
};
