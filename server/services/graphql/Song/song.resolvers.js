const { findSong, searchSoundCloud } = require("./queries");
const { createSong } = require("./mutations");

module.exports = {
  Query: {
    findSong,
    searchSoundCloud
  },

  Mutation: {
    createSong
  }
};
