import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  setLocalState,
  escapeHtml,
  editSongList,
  handlePlaylistEditorView,
  updateLocalPlaylist,
  prepPlaylistPayload
} from "./utils.jsx";
import { UPDATE_PLAYLIST, DELETE_PLAYLIST } from "./graphql";
import PlaylistView from "../PlaylistView/index.jsx";
import SongView from "../SongView/index.jsx";
import PlaylistEditorControls from "./PlaylistEditorControls.jsx";

const defaultState = {
  currentView: "Edit Playlist",

  textInput: "",
  pageError: false,
  pageErrorMsg: "",
  serverResponse: "",

  playlistToEdit: {},
  playlistID: "",
  playlistName: "",
  playlistSongs: []
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearFormInput = () => {
    const { textInput } = this.state;
    if (textInput.length) {
      this.setState({
        textInput: "",
        pageError: false,
        pageErrorMsg: ""
      });
    }
  };

  handleNameChange = event => {
    event.preventDefault();

    this.setState({
      textInput: event.target.value
    });
  };

  selectPlaylistToEdit = playlist => {
    this.setState({
      playlistToEdit: playlist,
      playlistID: playlist.id,
      playlistName: playlist.name,
      playlistSongs: playlist.songs,
      currentView: "Song View"
    });
  };

  deleteSongFromPlaylist = playlistSong => {
    const { playlistSongs } = this.state;

    const { id_user_id_identifier } = playlistSong;

    const filteredList = playlistSongs.filter(
      song => song.id_user_id_identifier != id_user_id_identifier
    );

    this.setState({
      playlistSongs: filteredList
    });
  };

  performDBUpdate = async saveToDBMutation => {
    const { playlistID, playlistName, playlistSongs } = this.state;

    const updatedList = prepPlaylistPayload(playlistName, playlistSongs);

    const result = await saveToDBMutation({
      variables: { playlistID, updatedList }
    });

    console.log("result from DB after updating playlist ", result);
  };

  deleteFromDB = async deletePlaylistMutation => {
    const { currentUser, playlistID } = this.state;

    const result = await deletePlaylistMutation({
      variables: { playlistID, userID: currentUser.id }
    });

    console.log("message from deletePlaylist mutation ", result);
  };

  renderControls = (currentView, updatePlaylist) => {
    const { textInput, playlistName } = this.state;

    if (currentView == "Song View") {
      return (
        <PlaylistEditorControls
          textInput={textInput}
          playlistName={playlistName}
          performDBUpdate={this.performDBUpdate}
          deleteFromDB={null}
          handleNameChange={this.handleNameChange}
          clearFormInput={this.clearFormInput}
          updateMutation={updatePlaylist}
        />
      );
    }
  };

  renderCurrentView = (
    currentView,
    currentUser,
    updatePlaylist,
    deletePlaylist
  ) => {
    const { textInput, playlistName } = this.state;

    if (currentView == "Edit Playlist") {
      return (
        <PlaylistView
          propMutation={null}
          varObjKey={null}
          playlists={currentUser.playlists}
          callback={this.selectPlaylistToEdit}
        />
      );
    }

    if (currentView == "Song View") {
      const { playlistSongs } = this.state;

      return (
        <div>
          <PlaylistEditorControls
            textInput={textInput}
            playlistName={playlistName}
            performDBUpdate={this.performDBUpdate}
            deleteFromDB={this.deleteFromDB}
            handleNameChange={this.handleNameChange}
            clearFormInput={this.clearFormInput}
            deleteMutation={deletePlaylist}
            updateMutation={updatePlaylist}
          />
          <SongView
            PROP_MUTATION={null}
            songInput={playlistSongs}
            callback={this.deleteSongFromPlaylist}
            assetType={"trash"}
            searchView={false}
          />
        </div>
      );
    }
  };

  componentDidMount = () => {
    const { currentUser } = this.props;

    const state = setLocalState(currentUser);

    this.setState(state);
  };

  render() {
    const { currentUser } = this.props;
    const { currentView } = this.state;
    // DELETE_PLAYLIST
    return (
      <Mutation mutation={UPDATE_PLAYLIST} update={updateLocalPlaylist}>
        {updatePlaylist => (
          <Mutation mutation={DELETE_PLAYLIST}>
            {deletePlaylist => (
              <div id="top" className="playlist-editor">
                <div className="playlist-editor-header-container">
                  <div>
                    <h1>
                      Click on a playlist to update or delete it from your
                      account!
                    </h1>
                  </div>
                </div>

                {console.log("this.props inside PlaylistEditor ", this.props)}
                {console.log("this.state inside PlaylistEditor ", this.state)}

                {this.renderCurrentView(
                  currentView,
                  currentUser,
                  updatePlaylist,
                  deletePlaylist
                )}
              </div>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default PlaylistEditor;
