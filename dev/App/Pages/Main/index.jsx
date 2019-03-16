import React, {Component} from 'react';
import {Query, ApolloConsumer} from 'react-apollo';
import {Redirect} from 'react-router-dom';
import ReactPlayer from 'react-player';
import Home from '../Home/index.jsx';
import Search from '../Search/index.jsx';
import SavePlaylist from '../SavePlaylist/index.jsx';
import NavSidebar from './NavSidebar.jsx';
import PlaylistEditor from '../PlaylistEditor/index.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import {queueNextSongInPlayer} from './utils.jsx';
import {
  GET_CURRENTLY_PLAYING_SONG,
  GET_LOCAL_USER_INFO,
} from '../../Apollo/API/graphql/index.js';

const defaultState = {
  currentUser: {},
  currentSong: 'https://soundcloud.com/john-dollar-1/alesso-years-original-mix',
  currentView: 'Home',
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  viewSwitch = view => {
    this.setState({
      currentView: view,
    });
  };

  logError = error => {
    if (error) {
      console.log(
        'There was an error for GET_CURRENTLY_PLAYING_SONG query ',
        error,
      );
    }
  };

  handleLogOut = client => {
    client.resetStore();

    localStorage.clear();

    return <Redirect to={{pathname: '/'}} />;
  };

  renderCurrentView = client => {
    const {currentView} = this.state;

    if (currentView == 'Log Out') {
      return this.handleLogOut(client);
    }

    if (currentView == 'Home') {
      return <Home />;
    }

    if (currentView == 'Search') {
      return <Search />;
    }

    if (currentView == 'Save Playlist') {
      return <SavePlaylist />;
    }

    if (currentView == 'Playlist Editor') {
      return (
        <CustomQuery query={GET_LOCAL_USER_INFO}>
          {data => {
            return (
              <PlaylistEditor
                viewSwitchCB={this.viewSwitch}
                currentUser={data.currentUser}
              />
            );
          }}
        </CustomQuery>
      );
    }

    return null;
  };

  render() {
    const {currentSong, currentView} = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_CURRENTLY_PLAYING_SONG}>
            {({data, loading, error}) => {
              if (error) {
                this.logError(error);
              }

              const {currentlyPlaying} = data;

              return (
                <div className="page-container">
                  <NavSidebar callback={this.viewSwitch} />

                  <div
                    className={
                      currentView == 'Save Playlist'
                        ? 'save-playlist-editor-main'
                        : 'main-content'
                    }
                  >
                    {this.renderCurrentView(client)}

                    <div className="react-player">
                      <ReactPlayer
                        url={
                          currentlyPlaying
                            ? currentlyPlaying.currentSong
                            : currentSong
                        }
                        playing={
                          currentlyPlaying ? currentlyPlaying.playing : false
                        }
                        width="100%"
                        height="100%"
                        config={{
                          soundcloud: {
                            options: {
                              color: '#55728C',
                            },
                          },
                        }}
                        onEnded={() => queueNextSongInPlayer(client)}
                      />
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default Main;
