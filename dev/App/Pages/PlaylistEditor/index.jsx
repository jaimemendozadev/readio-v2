import React, {Component} from 'react';
import EditorContainer from './EditorContainer.jsx';
import PlaylistView from '../PlaylistView/index.jsx';
import UpdatePanel from './UpdatePanel.jsx';
import SongView from '../SongView/index.jsx';
import CustomMutation from '../../Components/CustomMutation.jsx';
import ServerMessage from '../../Components/ServerMessage.jsx';

import {
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_USER_INFO,
} from '../../Apollo/API/graphql/index.js';

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

  deleteSongFromPlaylist = (playlistSong, updateMutation) => {
    console.log('playlistSong inside delete song from playlist ', playlistSong);

    const {selectedPlaylist} = this.state;

    const {playlistSongs} = selectedPlaylist;

    const {id_user_id_identifier} = playlistSong;

    const filteredList = playlistSongs.filter(
      song => song.id_user_id_identifier != id_user_id_identifier,
    );

    /*

    updateMutation,
  textInput = '',
  selectedPlaylist,

  */

    this.setState(
      {
        playlistSongs: filteredList,
      },
      () => performUpdate(),
    );
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

    return (
      <CustomMutation
        mutation={UPDATE_PLAYLIST}
        refetchQueries={() => [{query: GET_USER_INFO}]}
      >
        {(updatePlaylistMutation, {data: updateServerResponse}) => (
          <CustomMutation
            mutation={DELETE_PLAYLIST}
            refetchQueries={() => [{query: GET_USER_INFO}]}
          >
            {(deletePlaylistMutation, {data: deleteServerResponse}) => {
              const mutationsProp = {
                delete: deletePlaylistMutation,
                update: updatePlaylistMutation,
              };

              const serverResponses = {
                delete: deleteServerResponse,
                update: updateServerResponse,
              };

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

                    <ServerMessage
                      message={updateServerResponse.updatePlaylist.message}
                    />

                    <ServerMessage
                      message={deleteServerResponse.deletePlaylist.message}
                    />

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
            }}
          </CustomMutation>
        )}
      </CustomMutation>
    );
  }
}

export default PlaylistEditor;
