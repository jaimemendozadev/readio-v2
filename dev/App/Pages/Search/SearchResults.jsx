import React from 'react';
import CustomMutation from '../../Components/CustomMutation.jsx';
import SongView from '../SongView/index.jsx';
import {ADD_TO_SONG_LIST} from '../../Apollo/API/graphql/index.js';

const SearchResults = ({startSearch, mutationResultObj}) => {
  if (!startSearch) {
    return null;
  }

  const {data} = mutationResultObj;

  if (data) {
    const {searchSoundCloud} = data;
    return (
      <CustomMutation mutation={ADD_TO_SONG_LIST}>
        {addToSongList => {
          return (
            <SongView
              PROP_MUTATION={addToSongList}
              songInput={searchSoundCloud}
              callback={null}
              assetType="playlist"
              searchView={true}
            />
          );
        }}
      </CustomMutation>
    );
  }
};

export default SearchResults;
