import React, { Component } from "react";
import { Mutation } from "react-apollo";
import SongView from "../SongView/index.jsx";
import { escapeHtml } from "./utils";
import { SEARCH_SOUND_CLOUD, ADD_TO_SONG_LIST } from "./graphql";
import Spinner from "../../Components/Spinner.jsx";

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

  handleSubmit = async (event, searchSoundCloud) => {
    event.preventDefault();
    const currentQuery = escapeHtml(this.state.currentQuery);

    searchSoundCloud({ variables: { searchTerm: currentQuery } });

    this.setState({
      startSearch: true
    });
  };

  handleSongView = (startSearch, data, loading, error) => {
    if (!startSearch) {
      return null;
    }

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      console.log("error querying SC mutation on BE ", error);

      return (
        <div className="error-msg">
          Whoops! There was an error processing your request. Try again later.
        </div>
      );
    }

    if (data) {
      const { searchSoundCloud } = data;
      return (
        <SongView
          PROP_MUTATION={ADD_TO_SONG_LIST}
          songInput={searchSoundCloud}
          callback={null}
          assetType="playlist"
          searchView={true}
        />
      );
    }
  };

  // Note: <Query> can't be fired manually. Manual queries are done with <ApolloConsumer>

  render() {
    const { searchResults, startSearch } = this.state;
    return (
      <Mutation mutation={SEARCH_SOUND_CLOUD}>
        {(searchSoundCloud, { data, loading, error }) => (
          <div className="search-page">
            <div>
              <h1>Search for any Artist, Playlist, Song, or Audio recording</h1>
              <h2>
                Click on a search result to load the song into the player!
              </h2>
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

            {this.handleSongView(startSearch, data, loading, error)}
          </div>
        )}
      </Mutation>
    );
  }
}

export default Search;
