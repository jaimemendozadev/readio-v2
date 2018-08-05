import React from 'react';

const renderResults = searchResults => {
    return searchResults.map(result => {
        return (
            <div className='search-item'>
                <div className='search-image-container'>
                    <img src={result.artwork_url} />
                </div>
                <h3>{result.title}</h3>
            </div>
        )
    })
}
const SearchResultsView = ({ searchResults }) => (
    <div className='search-results'>
        {renderResults(searchResults)}
    </div>
)

export default SearchResultsView;