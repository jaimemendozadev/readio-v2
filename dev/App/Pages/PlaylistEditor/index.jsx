import React, {Component} from 'react';
import EditorContainer from './EditorContainer.jsx';
import PlaylistView from '../PlaylistView/index.jsx';
import UpdatePanel from './UpdatePanel.jsx';
import SongView from '../SongView/index.jsx';
import ServerMessage from '../../Components/ServerMessage.jsx';

import {performUpdate} from './utils.js';

const defaultState = {
  currentView: 'Edit Playlist',
  selectedPlaylist: {},
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  sendToHomeView = () => {
    const {viewSwitchCB} = this.props;
    viewSwitchCB('Home');
  };

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

  deleteSongFromPlaylist = async playlistSong => {
    console.log('playlistSong inside delete song from playlist ', playlistSong);

    const {selectedPlaylist, mutationsProp} = this.state;
    const updateMutation = mutationsProp.update;

    const {playlistSongs, playlistName} = selectedPlaylist;

    const {id_user_id_identifier} = playlistSong;

    const filteredList = playlistSongs.filter(
      song => song.id_user_id_identifier != id_user_id_identifier,
    );

    const updatedState = Object.assign({}, selectedPlaylist, {
      playlistSongs: filteredList,
    });

    await performUpdate(updateMutation, playlistName, updatedState);

    this.setState({
      selectedPlaylist: updatedState,
    });
  };

  checkServerResponses = serverResponses => {
    const updateResponse = serverResponses.update;
    const deleteResponse = serverResponses.delete;

    console.log('updateResponse is ', updateResponse);
    console.log('deleteResponse is ', deleteResponse);

    if (updateResponse) {
      return <ServerMessage message={updateResponse.updatePlaylist.message} />;
    }

    if (deleteResponse) {
      return <ServerMessage message={deleteResponse.deletePlaylist.message} />;
    }

    return null;
  };

  componentDidMount = () => {
    const {currentUser, mutationsProp} = this.props;

    this.setState({currentUser, mutationsProp});
  };

  render() {
    const currentUser = this.props.currentUser
      ? this.props.currentUser
      : this.state.currentUser;
    const {currentView} = this.state;

    const {mutationsProp, serverResponses} = this.props;

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
          <UpdatePanel
            currentUser={currentUser}
            selectedPlaylist={selectedPlaylist}
            mutationsProp={mutationsProp}
            sendToHomeView={this.sendToHomeView}
            serverResponses={serverResponses}
            resetState={this.resetState}
          />

          {this.checkServerResponses(serverResponses)}

          <SongView
            PROP_MUTATION={null}
            songInput={playlistSongs}
            callback={this.deleteSongFromPlaylist}
            assetType={'trash'}
            searchView={false}
            hasOneSong={playlistSongs.length == 1 ? true : false}
          />
        </EditorContainer>
      );
    }
  }
}

export default PlaylistEditor;
