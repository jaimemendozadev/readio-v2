import React, {Component} from 'react';
import SearchResults from './SearchResults.jsx';
import CustomMutation from '../../Components/CustomMutation.jsx';
import {SEARCH_SOUND_CLOUD} from '../../Apollo/API/graphql/index.js';
import {escapeHtml} from './utils';

const defaultState = {
  currentQuery: 'Start typing...',
  startSearch: false,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = () => {
    const {currentQuery} = this.state;
    if (currentQuery.length) {
      this.setState({
        currentQuery: '',
      });
    }
  };

  resetInput = () => {
    this.setState({currentQuery: 'Start typing...'});
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

  render() {
    const {startSearch} = this.state;
    return (
      <CustomMutation mutation={SEARCH_SOUND_CLOUD}>
        {(searchSoundCloud, mutationResult) => (
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
                  onBlur={this.resetInput}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.currentQuery}
                />
              </form>
            </div>

            <SearchResults
              startSearch={startSearch}
              mutationResultObj={mutationResult}
            />
          </div>
        )}
      </CustomMutation>
    );
  }
}

export default Search;
