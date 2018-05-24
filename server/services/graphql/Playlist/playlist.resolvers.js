import {getPlaylist} from './queries';
import {createPlaylist, addSongToPlaylist, deleteSongFromPlaylist} from './mutations';


export default {
  Query: {
    getPlaylist
  },

  Mutation: {
    createPlaylist,
    addSongToPlaylist
  }
}