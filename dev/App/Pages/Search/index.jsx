import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuery: 'Start typing...'
    }
  }

  render() {
    return (
      <div className='page-container'>
        <div className='side-bar'>
          <nav>
            <Link className='side-bar-link' to='/home'>Home</Link>
            <Link className='side-bar-link' to='/search'>Search</Link>
          </nav>
        </div>

        <div className='main-content'>
          <div>
            <h1>Search for any Artist, Playlist, Song, or Audio recording</h1>
          </div>
          <form>
            <input type='text' value={this.state.currentQuery} />
          </form>



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