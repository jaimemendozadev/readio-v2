import React, {Fragment, Component} from 'react';
import EditorContainer from './EditorContainer.jsx';
import PlaylistView from '../PlaylistView/index.jsx';
import UpdatePanel from './UpdatePanel.jsx';
import UpdateContainer from './UpdateContainer.jsx';
import SongView from '../SongView/index.jsx';
import ServerMessage from '../../Components/ServerMessage.jsx';
import {filterPlaylist} from './utils';

const defaultState = {
  currentView: 'Edit Playlist',
  selectedPlaylist: {},
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  selectPlaylistToEdit = playlist => {
    const selectedPlaylist = {
      playlistToEdit: playlist,
      playlistID: playlist.id,
      playlistName: playlist.name,
      playlistSongs: playlist.songs,
    };

    this.setState({
      selectedPlaylist,
      currentView: 'Song View',
    });
  };

  resetState = state => {
    const oldState = this.state;

    const newState = Object.assign({}, oldState, state);

    this.setState(newState);
  };

  selectSongForDeletion = playlistSong => {
    const {selectedPlaylist} = this.state;

    const updatedState = filterPlaylist(selectedPlaylist, playlistSong);

    this.setState({
      selectedPlaylist: updatedState,
    });
  };

  checkServerResponses = serverResponses => {
    const updateResponse = serverResponses.update;
    const deleteResponse = serverResponses.delete;

    if (updateResponse) {
      return <ServerMessage message={updateResponse.updatePlaylist.message} />;
    }

    if (deleteResponse) {
      return <ServerMessage message={deleteResponse.deletePlaylist.message} />;
    }

    return null;
  };

  componentDidMount = () => {
    const {currentUser} = this.props;

    this.setState({currentUser});
  };

  render() {
    const currentUser = this.props.currentUser
      ? this.props.currentUser
      : this.state.currentUser;
    const {currentView} = this.state;

    console.log('this.props inside PlaylistEditor ', this.props);

    if (currentView == 'Edit Playlist') {
      return (
        <EditorContainer>
          <PlaylistView
            propMutation={null}
            varObjKey={null}
            playlists={currentUser.playlists}
            callback={this.selectPlaylistToEdit}
          />
        </EditorContainer>
      );
    }

    if (currentView == 'Song View') {
      const {selectedPlaylist} = this.state;
      const {playlistSongs} = selectedPlaylist;

      return (
        <EditorContainer>
          <UpdateContainer>
            {(mutationsProp, serverResponses) => {
              return (
                <Fragment>
                  <UpdatePanel
                    currentUser={currentUser}
                    selectedPlaylist={selectedPlaylist}
                    mutationsProp={mutationsProp}
                    sendToHomeView={() => this.props.viewSwitchCB('Home')}
                    serverResponses={serverResponses}
                    resetState={this.resetState}
                  />

                  {this.checkServerResponses(serverResponses)}

                  <SongView
                    PROP_MUTATION={null}
                    songInput={playlistSongs}
                    callback={playlistSong =>
                      this.selectSongForDeletion(playlistSong)
                    }
                    assetType={'trash'}
                    searchView={false}
                    hasOneSong={playlistSongs.length == 1 ? true : false}
                  />
                </Fragment>
              );
            }}
          </UpdateContainer>
        </EditorContainer>
      );
    }
  }
}

export default PlaylistEditor;
