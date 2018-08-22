const createPlaylist = async (_, { userID, input }, { models }) => {
  const { Playlist, User } = models;

  console.log("userID inside createPlaylist ", userID);
  console.log("input inside createPlaylist ", input);

  try {
    const newPlaylist = await Playlist.create(input);

    console.log("newPlaylist is ", newPlaylist);
    const playlistID = newPlaylist.id;

    const foundUser = await User.findById(userID);

    console.log("foundUser before update ", foundUser);

    foundUser.playlists.push(playlistID);
    foundUser.save();

    console.log("foundUser after update ", foundUser);

    return { error: false, message: "Playlist was saved in the DB!" };
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

const addSongToPlaylist = async (_, { playlistID, input }) => {
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

const deleteSongFromPlaylist = async (_, { playlistID, songTitle }) => {
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

  return deletedSong;
};

module.exports = {
  createPlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist
};
