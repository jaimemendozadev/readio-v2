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
  const { Playlist } = models;

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
  const { Playlist } = models;

  let updatedDBPlaylist = await Playlist.findByIdAndUpdate(
    playlistID,
    updatedList,
    { new: true }
  );

  return {
    error: false,
    message: "You've successfully updated your playlist!"
  };
};

const deletePlaylist = async (_, { playlistID, userID }, { models }) => {
  const { Playlist, User } = models;

  try {
    // Delete the playlist
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistID);

    // Delete the playlist from User's Playlist array
    const foundUser = await User.findById(userID);

    const filteredPlaylists = foundUser.playlists.filter(
      playlist => playlist != playlistID
    );

    foundUser.playlists = filteredPlaylists;
    foundUser.save();

    return { error: false, message: "Your playlist was successfully deleted!" };
  } catch (error) {
    console.log("Error deleting playlist in Playlist and User schema ", error);
    return {
      error: true,
      message: "There was an error deleting the playlist in the DB."
    };
  }
};

module.exports = {
  createPlaylist,
  addSongToPlaylist,
  updatePlaylist,
  deletePlaylist
};
