import React from 'react';
import Playlist from './assets/playlist.png';

const renderResults = (searchResults, callback) => {
    return searchResults.map(result => {
        return (
            <div className='search-item' onClick={() => callback(result.permalink_url)} key={result.id_user_id_identifier}>
                <div className='search-image-container'>
                    <img src={result.artwork_url} />
                    <div>{result.title}</div>
                </div>
                <div className='playlist-icon-container'>
                    <img className='playlist-icon' src={Playlist} />
                </div>
            </div>
        )
    })
}
const SearchResultsView = ({ searchResults, callback }) => (
    <div className='search-results'>
        {renderResults(searchResults, callback)}
    </div>
)

export default SearchResultsView;