import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { escapeHtml } from './utils';

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

  render() {
    return (
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
            <form>
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
    )
  }
}

export default Search;