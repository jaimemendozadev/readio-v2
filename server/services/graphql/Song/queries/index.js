const {processSearchResults} = require('../../utils.js');

const fetch = require("node-fetch");

const { SOUNDCLOUD_KEY, SOUNDCLOUD_BASE_URL } = process.env;

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

const searchSoundCloud = async (_, { searchTerm }) => {
  let filteredResults = [];

  let searchResults = await fetch(
    `${SOUNDCLOUD_BASE_URL}${SOUNDCLOUD_KEY}&q=${searchTerm}&limit=200&linked_partitioning=1`
  ).then(result => result.json());


  if(searchResults.collection && searchResults.collection.length) {
    filteredResults = filteredResults.concat(processSearchResults(searchResults.collection));  
  }

  if(Array.isArray(searchResults && searchResults.length)) {
    filteredResults = filteredResults.concat(processSearchResults(searchResults));
  }


  return filteredResults;
};

module.exports = {
  findSong,
  searchSoundCloud
};
