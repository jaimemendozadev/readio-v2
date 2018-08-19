import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import SearchResultsView from "./SearchResultsView.jsx";
import { escapeHtml } from "./utils";
import { SEARCH_SOUND_CLOUD } from "./graphql";

const defaultState = {
  currentQuery: "Start typing...",
  searchResults: []
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = event => {
    const { currentQuery } = this.state;
    if (currentQuery.length) {
      this.setState({
        currentQuery: ""
      });
    }
  };

  clickToPlay = url => {
    this.setState({
      url,
      playing: true
    });
  };

  handleChange = event => {
    event.preventDefault();

    this.setState({
      currentQuery: event.target.value
    });
  };

  handleSubmit = async (event, client) => {
    event.preventDefault();
    const currentQuery = escapeHtml(this.state.currentQuery);

    let searchResults = await client.query({
      query: SEARCH_SOUND_CLOUD,
      variables: { searchTerm: currentQuery }
    });

    searchResults = searchResults.data.searchSoundCloud;

    console.log("data inside handleSubmit ", searchResults);

    this.setState({
      searchResults
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className="search-page">
            <div>
              <h1>Search for any Artist, Playlist, Song, or Audio recording</h1>
              <form onSubmit={event => this.handleSubmit(event, client)}>
                <input
                  onClick={this.clearInput}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.currentQuery}
                />
              </form>
            </div>

            {searchResults.length == 0 ? null : (
              <SearchResultsView
                client={client}
                callback={this.clickToPlay}
                searchResults={searchResults}
              />
            )}
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
