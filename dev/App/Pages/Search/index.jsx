import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import SongView from '../SongView/index.jsx';
import {escapeHtml} from './utils';
import {
  SEARCH_SOUND_CLOUD,
  ADD_TO_SONG_LIST,
} from '../../Apollo/API/graphql/index.js';
import CustomMutation from '../../Components/CustomMutation.jsx';

const defaultState = {
  currentQuery: 'Start typing...',
  searchResults: [],
  startSearch: false,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = event => {
    const {currentQuery} = this.state;
    if (currentQuery.length) {
      this.setState({
        currentQuery: '',
      });
    }
  };

  handleChange = event => {
    event.preventDefault();

    this.setState({
      currentQuery: event.target.value,
    });
  };

  handleSubmit = async (event, searchSoundCloud) => {
    event.preventDefault();
    const currentQuery = escapeHtml(this.state.currentQuery);

    searchSoundCloud({variables: {searchTerm: currentQuery}});

    this.setState({
      startSearch: true,
    });
  };

  handleSongView = (startSearch, data) => {
    if (!startSearch) {
      return null;
    }

    if (data) {
      const {searchSoundCloud} = data;
      return (
        <Mutation mutation={ADD_TO_SONG_LIST}>
          {(addToSongList, mutationResult) => {
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
        </Mutation>
      );
    }
  };

  render() {
    const {searchResults, startSearch} = this.state;
    return (
      <CustomMutation mutation={SEARCH_SOUND_CLOUD}>
        {(searchSoundCloud, {data}) => (
          <div className="search-page">
            <div>
              <h1>
                Search for any Artist, Playlist, Song, or Audio recording! Or
                click on the playlist icon to save it for a new playlist!
              </h1>
              <form
                onSubmit={event => this.handleSubmit(event, searchSoundCloud)}
              >
                <input
                  onClick={this.clearInput}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.currentQuery}
                />
              </form>
            </div>
            {this.handleSongView(startSearch, data)}
          </div>
        )}
      </CustomMutation>
    );
  }
}

export default Search;
