const processSearchResults = searchResults => {
  const filteredResults = [];

  searchResults.forEach(track => {
    const {title, permalink_url, artwork_url, id, user_id} = track;

    if (title && permalink_url && artwork_url && id && user_id) {
      filteredResults.push({
        id_user_id_identifier: `${id}-${user_id}`,
        title,
        permalink_url,
        artwork_url,
      });
    }
  });

  return filteredResults;
};

module.exports = {
  processSearchResults,
};
