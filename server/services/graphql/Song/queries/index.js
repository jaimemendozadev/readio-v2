const fetch = require('node-fetch');

const {SOUNDCLOUD_KEY, SOUNDCLOUD_BASE_URL} = process.env;

const findSong = async(_, {title}, {models}) => {
  const {Song} = models;
  const foundSong = await Song.find(title);
  
  console.log('foundSong ', foundSong);

  if (foundSong){
    return foundSong
  } else {
    return [];
  }
}


const searchSoundCloud = async(_, { searchTerm }) => {

  let searchResults = await fetch(`${SOUNDCLOUD_BASE_URL}${SOUNDCLOUD_KEY}&q=${searchTerm}&limit=200&linked_partitioning=1`)
     .then(result => result.json());

  searchResults = searchResults.collection;
  
  console.log('orig searchResults length ', searchResults.length)

  searchResults = searchResults.map(track => {
    const {title, permalink_url, artwork_url} = track;
    return {
      title,
      permalink_url,
      artwork_url
    }
  });
  
  return searchResults;

}

module.exports = {
  findSong,
  searchSoundCloud
}