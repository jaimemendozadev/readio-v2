const Song = require('../../../../DB/Schemas/Song');

const createSong = async(_, {input}) => {
  const createdSong = await Song.create(input);

  console.log('createdSong ', createdSong);

  return createdSong;
}


module.exports = {
  createSong
}