import {getUser, playlists} from './queries';
import {createUser, deleteUser, updateUser} from './mutations';


export default {
  Query: {
    getUser
  },

  Mutation: {
    createUser,
    deleteUser,
    updateUser
  },

  User: {
    playlists
  }
}