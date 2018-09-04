import { GET_SONG_LIST } from "../graphql";
import { GET_CURRENT_SONG } from "../graphql";

export const resolvers = {
  Mutation: {
    addToSongList: (_, { songToAdd }, { cache }) => {
      
      const oldState = cache.readQuery({ query: GET_SONG_LIST });

      const { list } = oldState.songList;

      songToAdd.__typename = "CreateSong";

      
      const newState = [].concat(list, [songToAdd]);

      
      const data = {
        songList: {
          ...oldState.songList,
          list: newState
        }
      };

      
      cache.writeQuery({ query: GET_SONG_LIST, data });

      return songToAdd;
    },

    deleteFromSongList: (_, { songID }, { cache }) => {
      let filteredSong;

      const oldState = cache.readQuery({ query: GET_SONG_LIST });

      const { list } = oldState.songList;

      const newState = list.filter(song => {
        if (songID != song.id_user_id_identifier) {
          return song;
        } else {
          filteredSong = song;
        }
      });

      const data = {
        songList: {
          ...oldState.songList,
          list: newState
        }
      };

      cache.writeQuery({ query: GET_SONG_LIST, data });

      return filteredSong;
    },

    loadSongInPlayer: (_, { songArg }, { cache }) => {
      const oldState = cache.readQuery({ query: GET_CURRENT_SONG });

      const currentlyPlaying = Object.assign(
        {},
        oldState.currentlyPlaying,
        songArg
      );

      const data = {
        ...oldState,
        currentlyPlaying
      };

      cache.writeQuery({ query: GET_CURRENT_SONG, data });

      return null;
    },

    loadPlaylistInCache: (_, { playlistArg }, { cache }) => {

      
      let localPlaylist = playlistArg.songs.slice(0);

      const oldState = cache.readQuery({ query: GET_CURRENT_SONG });
      const { currentlyPlaying } = oldState;

      
      const newCurrentSong = localPlaylist[0].permalink_url;
      localPlaylist.shift();

      const newState = {
        currentSong: newCurrentSong,
        playlistStack: localPlaylist,
        storedPlaylist: [playlistArg],
        userSelectedPlaylist: true,
        playing: true
      };

      const data = {
        ...oldState,
        currentlyPlaying: Object.assign({}, currentlyPlaying, newState)
      };

      cache.writeQuery({ query: GET_CURRENT_SONG, data });

      console.log("cache after loadPlaylistInCache ", cache);

     
      return null;
    }
  } 
};