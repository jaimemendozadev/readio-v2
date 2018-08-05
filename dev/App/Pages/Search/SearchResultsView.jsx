import React from 'react';

const renderResults = (searchResults, callback) => {
    return searchResults.map(result => {
        return (
            <div onClick={() => callback(result.permalink_url)} key={result.id_user_id_identifier} className='search-item'>
                <div className='search-image-container'>
                    <img src={result.artwork_url} />
                </div>
                <h3>{result.title}</h3>
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