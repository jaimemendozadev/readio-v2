const { getPlaylist } = require("./queries");
const {
  createPlaylist,
  addSongToPlaylist,
  updatePlaylist
} = require("./mutations");

module.exports = {
  Query: {
    getPlaylist
  },

  Mutation: {
    createPlaylist,
    addSongToPlaylist,
    updatePlaylist
  }
};
