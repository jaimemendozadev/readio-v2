import Playlist from '../../../../DB/Schemas/Playlist';
import User from '../../../../DB/Schemas/User';


export const createPlaylist = async(_, {userID, input}) => {

  const newPlaylist = await Playlist.create(input);
  
  console.log('newPlaylist inside createPlaylist ', newPlaylist);


  const playlistID = newPlaylist.id;

  await User.findById(userID, (err, user) => {
    if (err) {
      console.log('err inside createPlaylist resolver ', err)
    }
    user.playlists.push(playlistID);
    user.save();
  });

  return newPlaylist;
}

export const addSongToPlaylist = async(_, {playlistID, input}) => {
  const updatedPlaylist = await Playlist.findById(playlistID, (err, playlist) => {

    if (err) {
      console.log('err inside addSongToPlaylist resolver ', err)
    }
    
    playlist.songs.push(playlistID);
    playlist.save();

    return playlist;
  });

  return updatedPlaylist;

}


export const deleteSongFromPlaylist = async(_, {playlistID, songID}) => {

  const deletedSong = await Playlist.findById(playlistID, (err, playlist) => {
  
    if (err) {
      console.log('err inside deleteSongFromPlaylist resolver ', err)
    }

    let {songs} = playlist;
    let deleted;

    songs = songs.filter(song => {
      if(song.id == songID) {
        deleted = song;
      }
      
      return song.id != songID
    });
    
    playlist.songs = songs;
    playlist.save();

    return deleted;
  });

  return deletedSong;
  
}