import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import SongView from "../SongView/index.jsx";
import { escapeHtml } from "./utils";
import { SEARCH_SOUND_CLOUD, ADD_TO_SONG_LIST } from "./graphql";

const defaultState = {
  currentQuery: "Start typing...",
  searchResults: [],
  startSearch: false
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
      searchResults,
      startSearch: true
    });
  };

  render() {
    const { searchResults, startSearch } = this.state;
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

            {startSearch == false ? null : (
              <SongView
                PROP_MUTATION={ADD_TO_SONG_LIST}
                songInput={searchResults}
                callback={null}
                assetType="playlist"
                startSearch={startSearch}
              />
            )}
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
