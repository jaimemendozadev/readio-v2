import React, {Component} from 'react';
import Player from './Player.jsx';
import CurrentView from './CurrentView.jsx';
import NavSidebar from './NavSidebar.jsx';
import {queueNextSongInPlayer} from './utils.jsx';
import {GET_CURRENTLY_PLAYING_SONG} from '../../Apollo/API/graphql/index.js';
import CustomQuery from '../../Components/CustomQuery.jsx';

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

  render() {
    const {currentSong, currentView} = this.state;
    return (
      <CustomQuery query={GET_CURRENTLY_PLAYING_SONG}>
        {(data, client) => {
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
                <CurrentView
                  client={client}
                  currentView={currentView}
                  viewSwitchCB={this.viewSwitch}
                />

                <Player
                  client={client}
                  currentSong={currentSong}
                  currentlyPlaying={currentlyPlaying}
                  queueNextSong={queueNextSongInPlayer}
                />
              </div>
            </div>
          );
        }}
      </CustomQuery>
    );
  }
}

export default Main;
