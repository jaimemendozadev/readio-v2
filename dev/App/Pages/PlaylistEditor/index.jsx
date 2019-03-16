import React, {Component} from 'react';
import {Mutation} from 'react-apollo';

import CustomMutation from '../../Components/CustomMutation.jsx';

import {
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_USER_INFO,
} from '../../Apollo/API/graphql/index.js';
import PlaylistView from '../PlaylistView/index.jsx';
import SongView from '../SongView/index.jsx';
import PlaylistEditorControls from './PlaylistEditorControls.jsx';

import {
  setLocalState,
  escapeHtml,
  checkPlaylistName,
  prepPlaylistPayload,
  resetLocalPlaylistState,
} from './utils.jsx';

const defaultState = {
  currentView: 'Edit Playlist',
  textInput: '',
  setUserFromProps: false,
  playlistToEdit: {},
  playlistID: '',
  playlistName: '',
  playlistSongs: [],
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

  clearFormInput = () => {
    const {textInput} = this.state;
    if (textInput.length) {
      this.setState({
        textInput: '',
        pageError: false,
        pageErrorMsg: '',
      });
    }
  };

  handleNameChange = event => {
    event.preventDefault();

    this.setState({
      textInput: event.target.value,
    });
  };

  selectPlaylistToEdit = playlist => {
    this.setState({
      playlistToEdit: playlist,
      playlistID: playlist.id,
      playlistName: playlist.name,
      playlistSongs: playlist.songs,
      currentView: 'Song View',
    });
  };

  deleteSongFromPlaylist = playlistSong => {
    const {playlistSongs} = this.state;

    const {id_user_id_identifier} = playlistSong;

    const filteredList = playlistSongs.filter(
      song => song.id_user_id_identifier != id_user_id_identifier,
    );

    this.setState({
      playlistSongs: filteredList,
    });
  };

  performDBUpdate = async saveToDBMutation => {
    const {textInput, playlistID, playlistName, playlistSongs} = this.state;

    const nameInput = checkPlaylistName(textInput, playlistName);

    const sanitizedName = escapeHtml(nameInput);

    const updatedList = prepPlaylistPayload(sanitizedName, playlistSongs);

    const result = await saveToDBMutation({
      variables: {playlistID, updatedList},
    });

    console.log('result from DB after updating playlist ', result);
  };

  deleteFromDB = async deletePlaylistMutation => {
    const {currentUser, playlistID} = this.state;

    const result = await deletePlaylistMutation({
      variables: {playlistID, userID: currentUser.id},
    });

    const resetState = resetLocalPlaylistState();

    this.setState(resetState);

    console.log('message from deletePlaylist mutation ', result);
  };

  handleSongViewRendering = (updateResponse, deleteResponse, playlistSongs) => {
    if (updateResponse) {
      return <h1>{updateResponse.updatePlaylist.message}</h1>;
    }

    if (deleteResponse) {
      return <h1>{deleteResponse.deletePlaylist.message}</h1>;
    }

    return (
      <SongView
        PROP_MUTATION={null}
        songInput={playlistSongs}
        callback={this.deleteSongFromPlaylist}
        assetType={'trash'}
        searchView={false}
        hasOneSong={playlistSongs.length == 1 ? true : false}
      />
    );
  };

  renderCurrentView = (currentView, currentUser, gqlMutateObj) => {
    const {textInput, playlistName} = this.state;

    const {
      deleteMutation,
      updateMutation,
      deleteResponse,
      updatePlaylistResponse,
    } = gqlMutateObj;
    console.log('currentView in PlaylistEditor is ', currentView);

    if (currentView == 'Edit Playlist') {
      return (
        <PlaylistView
          propMutation={null}
          varObjKey={null}
          playlists={currentUser.playlists}
          callback={this.selectPlaylistToEdit}
        />
      );
    }

    if (currentView == 'Song View') {
      const {playlistSongs} = this.state;

      return (
        <div>
          <PlaylistEditorControls
            textInput={textInput}
            playlistName={playlistName}
            performDBUpdate={this.performDBUpdate}
            deleteFromDB={this.deleteFromDB}
            handleNameChange={this.handleNameChange}
            clearFormInput={this.clearFormInput}
            deleteMutation={deleteMutation}
            updateMutation={updateMutation}
            sendToHomeView={this.sendToHomeView}
          />

          {this.handleSongViewRendering(
            updatePlaylistResponse,
            deleteResponse,
            playlistSongs,
          )}
        </div>
      );
    }
  };

  componentDidMount = () => {
    const {currentUser} = this.props;

    const state = setLocalState(currentUser);

    this.setState(state);
  };

  render() {
    const {setUserFromProps} = this.state;

    const currentUser =
      setUserFromProps == true
        ? this.state.currentUser
        : this.props.currentUser;

    const {currentView} = this.state;

    return (
      <CustomMutation
        mutation={UPDATE_PLAYLIST}
        refetchQueries={() => [{query: GET_USER_INFO}]}
      >
        {(updatePlaylistMutation, {data: updatePlaylistResponse}) => (
          <CustomMutation
            mutation={DELETE_PLAYLIST}
            refetchQueries={() => [{query: GET_USER_INFO}]}
          >
            {(deletePlaylistMutation, {data: deletePlaylistResponse}) => {
              const gqlMutateObj = {};
              gqlMutateObj.deleteMutation = deletePlaylistMutation;
              gqlMutateObj.updateMutation = updatePlaylistMutation;
              gqlMutateObj.deleteResponse = deletePlaylistResponse;
              gqlMutateObj.updateResponse = updatePlaylistResponse;

              console.log('gqlMutateObj is ', gqlMutateObj);

              return (
                <div id="top" className="playlist-editor">
                  <div className="playlist-editor-header-container">
                    <div>
                      <h1>
                        Click on a playlist to update or delete it from your
                        account!
                      </h1>
                    </div>
                  </div>

                  {this.renderCurrentView(
                    currentView,
                    currentUser,
                    gqlMutateObj,
                  )}
                </div>
              );
            }}
          </CustomMutation>
        )}
      </CustomMutation>
    );
  }
}

export default PlaylistEditor;
