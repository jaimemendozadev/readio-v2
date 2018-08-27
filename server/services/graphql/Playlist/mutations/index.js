const createPlaylist = async (_, { userID, input }, { models }) => {
  const { Playlist, User } = models;

  try {
    // Save playlist in DB
    const newPlaylist = await new Playlist({
      name: input.name,
      songs: input.songs
    });
    newPlaylist.save();

    // Save reference to Playlist in User document
    const playlistID = newPlaylist.id;
    const foundUser = await User.findById(userID);
    foundUser.playlists.push(playlistID);
    foundUser.save();

    return { error: false, message: "Your playlist was successfully saved!" };
  } catch (error) {
    console.log(
      "Error creating playlist, saving playlist to user in DB",
      error
    );
    return {
      error: true,
      message: "There was an error saving the playlist in the DB."
    };
  }
};

const addSongToPlaylist = async (_, { playlistID, input }, { models }) => {
  const {Playlist} = models;

  const updatedPlaylist = await Playlist.findById(
    playlistID,
    (err, playlist) => {
      if (err) {
        console.log("err inside addSongToPlaylist resolver ", err);
      }

      playlist.songs.push(input);
      playlist.save();

      return playlist;
    }
  );

  return updatedPlaylist;
};

const updatePlaylist = async (_, { playlistID, updatedList }, { models }) => {
  const {Playlist} = models;
  
  console.log('playlistID ', playlistID)
  console.log('updatedList ', updatedList)
  /*
  let deletedSong = await Playlist.findById(playlistID, (err, playlist) => {
    if (err) {
      console.log("err inside deleteSongFromPlaylist resolver ", err);
    }

    let { songs } = playlist;
    let deleted;

    songs = songs.filter(song => {
      if (song.title == songTitle) {
        deleted = song;
      }

      return song.title != songTitle;
    });

    playlist.songs = songs;
    playlist.save();

    return deleted;
  });

  deletedSong = deletedSong.songs.pop();

  */
  return {error: false, message: "Perform successful deletion!"};


};

module.exports = {
  createPlaylist,
  addSongToPlaylist,
  updatePlaylist
};
