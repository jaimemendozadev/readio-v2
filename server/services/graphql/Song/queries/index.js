const Song = require ('../../../../DB/Schemas/Song');


const findSong = async(_, {title}) => {
  const foundSong = await Song.find(title);
  
  console.log('foundSong ', foundSong);

  if (foundSong){
    return foundSong
  } else {
    return [];
  }
}

module.exports = {
  findSong
}