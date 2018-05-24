const {findSong} = require('./queries');
const {createSong} = require('./mutations');

module.exports = {
  Query: {
    findSong    
  },

  Mutation: {
    createSong
  }
}