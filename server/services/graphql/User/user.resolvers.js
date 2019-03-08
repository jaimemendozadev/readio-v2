const {getUser, playlists} = require('./queries');
const {createUser, deleteUser, updateUser} = require('./mutations');

module.exports = {
  Query: {
    getUser,
  },

  Mutation: {
    createUser,
    deleteUser,
    updateUser,
  },

  User: {
    playlists,
  },
};
