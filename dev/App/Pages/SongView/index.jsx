import React from 'react';
import SongItem from './SongItem.jsx';
import ErrorMessage from '../../Components/ErrorMessage.jsx';

const renderResults = (
  propMutation = null,
  songInput,
  callback = null,
  assetType = 'none',
  hasOneSong = false,
  searchView = false,
) => {
  if (songInput.length == 0 && searchView == true) {
    const errorMessage =
      "Whoops! We couldn't find any results for your search. Try something else.";

    return <ErrorMessage errorMessage={errorMessage} />;
  }

  return songInput.map(result => {
    return (
      <SongItem
        key={result.id_user_id_identifier}
        result={result}
        propMutation={propMutation}
        assetType={assetType}
        callback={callback}
        hasOneSong={hasOneSong}
        searchView={searchView}
      />
    );
  });
};

const SongView = ({
  PROP_MUTATION = null,
  songInput,
  callback = null,
  assetType = 'none',
  searchView,
  hasOneSong,
}) => {
  return (
    <div className={searchView == true ? 'prevent-search-overflow' : ''}>
      {renderResults(
        PROP_MUTATION,
        songInput,
        callback,
        assetType,
        hasOneSong,
        searchView,
      )}
    </div>
  );
};

export default SongView;
