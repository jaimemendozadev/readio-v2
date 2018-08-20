const findSong = async (_, { title }, { models }) => {
  const { Song } = models;
  const foundSong = await Song.find(title);

  console.log("foundSong ", foundSong);

  if (foundSong) {
    return foundSong;
  } else {
    return [];
  }
};

module.exports = {
  findSong
};
