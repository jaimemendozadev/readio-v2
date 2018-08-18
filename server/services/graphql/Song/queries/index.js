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
  const filteredResults = [];

  let searchResults = await fetch(
    `${SOUNDCLOUD_BASE_URL}${SOUNDCLOUD_KEY}&q=${searchTerm}&limit=200&linked_partitioning=1`
  ).then(result => result.json());

  searchResults = searchResults.collection;

  searchResults.forEach(track => {
    const { title, permalink_url, artwork_url, id, user_id } = track;

    if (title && permalink_url && artwork_url && id && user_id) {
      filteredResults.push({
        title,
        permalink_url,
        artwork_url,
        id_user_id_identifier: `${id}-${user_id}`
      });
    }
  });

  return filteredResults;
};

module.exports = {
  findSong,
  searchSoundCloud
};
