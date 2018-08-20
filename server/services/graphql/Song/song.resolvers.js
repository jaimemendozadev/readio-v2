const { findSong } = require("./queries");
const { createSong, searchSoundCloud } = require("./mutations");

module.exports = {
  Query: {
    findSong
  },

  Mutation: {
    createSong,
    searchSoundCloud
  }
};
