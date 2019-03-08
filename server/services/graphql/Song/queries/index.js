const findSong = async (_, {title}, {models}) => {
  const {Song} = models;
  const foundSong = await Song.find(title);

  if (foundSong) {
    return foundSong;
  } else {
    return [];
  }
};

module.exports = {
  findSong,
};
