import React from 'react';
import {Mutation} from 'react-apollo';
import Playlist from './assets/playlist.png';
import { ADD_TO_SONG_LIST } from './graphql';

const prepSongObject = result => {
    const { title, permalink_url, artwork_url, id_user_id_identifier } = result;
    const newSong = {
        title,
        permalink_url,
        artwork_url,
        id_user_id_identifier
    }

    return newSong;
}


const renderResults = (client, searchResults, callback) => {
    return searchResults.map(result => {
        const newSong = prepSongObject(result);
        return (
          <Mutation mutation={ADD_TO_SONG_LIST}>
             {addToSongList => (
               <div className='search-item' key={result.id_user_id_identifier}>
  
                 <div onClick={() => callback(result.permalink_url)}
                     className='search-image-container'>
                     <img src={result.artwork_url} />
                     <div>{result.title}</div>
                 </div>
  
                 <div className='playlist-icon-container'>
                     <img
                         onClick={() => addToSongList({variables:{ songToAdd: newSong}})}
                         className='playlist-icon'
                         src={Playlist} />
                 </div>
               </div>
             )}
          </Mutation>
        )
    })
}
const SearchResultsView = ({ client, searchResults, callback }) => (
    <div className='search-results'>
        {renderResults(client, searchResults, callback)}
    </div>
)

export default SearchResultsView;