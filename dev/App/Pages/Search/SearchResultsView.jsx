import React from 'react';
import Playlist from './assets/playlist.png';
import { GET_CACHED_PLAYLIST } from './graphql';

const saveSongToPlaylist = (result, client) => {
    const { title, permalink_url, artwork_url, id_user_id_identifier } = result;
    const newSong = {
        title,
        permalink_url,
        artwork_url,
        id_user_id_identifier
    }

    const currentPlaylist = client.readQuery({ query: GET_CACHED_PLAYLIST });

    console.log('currentPlaylist is ', currentPlaylist)

    // const newState = [...prevState, newSong];

    // client.writeQuery({ query: GET_CACHED_PLAYLIST, data: newState });

}


const renderResults = (client, searchResults, callback) => {
    return searchResults.map(result => {
        return (
            <div className='search-item'
                key={result.id_user_id_identifier}>

                <div onClick={() => callback(result.permalink_url)}
                    className='search-image-container'>
                    <img src={result.artwork_url} />
                    <div>{result.title}</div>
                </div>

                <div className='playlist-icon-container'>
                    <img
                        onClick={() => saveSongToPlaylist(result, client)}
                        className='playlist-icon'
                        src={Playlist} />
                </div>
            </div>
        )
    })
}
const SearchResultsView = ({ client, searchResults, callback }) => (
    <div className='search-results'>
        {renderResults(client, searchResults, callback)}
    </div>
)

export default SearchResultsView;