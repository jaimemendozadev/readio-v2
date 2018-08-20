const processSearchResults = searchResults => {

  // console.log('searchResults inside process ', searchResults);

  const filteredResults = [];

  searchResults.forEach(track => {
    const { title, permalink_url, artwork_url, id, user_id } = track;

    if (title && permalink_url && artwork_url && id && user_id) {
      filteredResults.push({
        id_user_id_identifier: `${id}-${user_id}`,
        title,
        permalink_url,
        artwork_url
      });
    }
  });

  console.log('finalized results before return ', filteredResults)

  return filteredResults;
}

module.exports = {
  processSearchResults
}