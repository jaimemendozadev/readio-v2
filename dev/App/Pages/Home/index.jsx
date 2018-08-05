import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { getUserInfo, getCurrentUser } from './graphql';
import ReactPlayer from 'react-player'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    }
  }

  renderPlaylists = playlists => {
    if (playlists.length == 0) {
      return <h1>You have no playlists. Start searching for Music and make a playlist!</h1>
    }
  }

  render() {
    console.log('this.props inside Home ', this.props)
    return (
      <Query query={getUserInfo}>
        {({ data: { getUser }, loading, error, client }) => {

          if (loading) {
            return <h1>Loading...</h1>
          }

          if (error) {
            return <h1>Sorry, there was an error processing your request...</h1>
          }

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
                  <h1>{getUser ? `Welcome to Read.io ${getUser.first_name}!` : `Read.io - Home Page`}</h1>
                </div>

                <div>
                  {this.renderPlaylists(getUser.playlists)}
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
      </Query>
    )
  }
}

export default Home;