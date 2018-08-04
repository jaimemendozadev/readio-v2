import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { getUserInfo } from './graphql';
import ReactPlayer from 'react-player'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this.props inside Home ', this.props)
    return (
      <Query query={getUserInfo}>
        {(data, loading, error) => {

          if (loading) {
            return <h1>Loading...</h1>
          }

          if (error) {
            return <h1>Sorry, there was an error processing your request...</h1>
          }

          console.log('the data is ', data);

          return (
            <div className="home-container">
              <div className="side-bar">
                <nav>
                  <Link className="side-bar-link" to="/home">Home</Link>
                  <Link className="side-bar-link" to="/search">Search</Link>
                </nav>
              </div>

              <div className="main-content">
                <h1>Read.io - Home Page</h1>
                <div className='react-player'>
                  <ReactPlayer
                    url='https://soundcloud.com/john-dollar-1/alesso-years-original-mix'
                    playing={true}
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