import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import ReactPlayer from 'react-player'
import { escapeHtml } from './utils';
import { SEARCH_SOUND_CLOUD } from './graphql'

const defaultState = {
  currentQuery: 'Start typing...'
}


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = event => {
    const { currentQuery } = this.state;
    if (currentQuery == 'Start typing...') {
      this.setState({
        currentQuery: ''
      });
    }
  }

  handleChange = event => {
    event.preventDefault();

    const currentQuery = escapeHtml(event.target.value);

    this.setState({
      currentQuery
    });
  }

  handleSubmit = async (event, client) => {
    event.preventDefault();
    const { currentQuery } = this.state;

    let searchResults = await client.query({
      query: SEARCH_SOUND_CLOUD,
      variables: { searchTerm: currentQuery }
    });

    console.log('the searchResults from SC on FE ', searchResults);
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className='page-container search-page'>
            <div className='side-bar'>
              <nav>
                <Link className='side-bar-link' to='/home'>Home</Link>
                <Link className='side-bar-link' to='/search'>Search</Link>
              </nav>
            </div>

            <div className='main-content'>
              <div>
                <h1>Search for any Artist, Playlist, Song, or Audio recording</h1>
                <form onSubmit={(event) => this.handleSubmit(event, client)}>
                  <input
                    onClick={this.clearInput}
                    onChange={this.handleChange}
                    type='text' value={this.state.currentQuery}
                  />
                </form>
              </div>


              <div className='react-player'>
                <ReactPlayer
                  url='https://soundcloud.com/john-dollar-1/alesso-years-original-mix'
                  playing={false}
                  width='100%'
                  height='20%'
                  config={{
                    soundcloud: {
                      options: {
                        color: '#55728C'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </ApolloConsumer>
    )
  }
}

export default Search;