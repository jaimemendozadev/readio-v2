import React, { Component } from "react";
import {Mutation} from "react-apollo";
import {
  setLocalState,
  escapeHtml,
  editSongList,
  handlePlaylistEditorView,
  updateLocalPlaylisit
} from "./utils.jsx";
import { GET_USER_ID, UPDATE_PLAYLIST } from "./graphql";
import PlaylistView from "../PlaylistView/index.jsx";
import SongView from "../SongView/index.jsx";
import PlaylistEditorControls from "./PlaylistEditorControls.jsx";

const defaultState = {
  currentView: "Edit Playlist",
  playlistName: "",
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

  clearInput = () => {
    const { playlistName } = this.state;
    if (playlistName.length) {
      this.setState({
        playlistName: "",
        pageError: false,
        pageErrorMsg: ""
      });
    }
  };

  handleChange = event => {
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

  };

  performUpdate = async (saveToDBMutation, client) => {
    //delete songs from playlist
    //get update playlist
    //update cache locally
    //display message to UI?


  };

  deleteFromDB = () => {};

  renderControls = (currentView, updatePlaylist) => {
    const { textInput } = this.state;

    if (currentView == "Song View") {
      return (
        <PlaylistEditorControls
          textInput={textInput}
          performUpdate={null}
          deleteFromDB={null}
          handleChange={this.handleChange}
          updatePlaylist={updatePlaylist}
        />
      );
    }
  };

  renderCurrentView = (currentView, currentUser) => {
    if (currentView == "Edit Playlist") {
      return (
        <PlaylistView
          scrollView={true}
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
        <SongView
          PROP_MUTATION={null}
          songInput={playlistSongs}
          callback={this.deleteSongFromPlaylist}
          assetType={"trash"}
          searchView={false}
        />
      );
    }
  };

  componentDidMount = () => {
    const { currentlyPlaying, currentUser } = this.props;

    const state = setLocalState(currentlyPlaying, currentUser);

    this.setState(state);
  };

  render() {
    const { currentUser, currentlyPlaying } = this.props;
    const { currentView, textInput } = this.state;

    return (
      <Mutation mutation={UPDATE_PLAYLIST} update={updateLocalPlaylisit}>
        {updatePlaylist => (
          <div className="playlist-editor">
            <div className="playlist-editor-header-container">
              <div>
                <h1>
                  Click on a playlist to update or delete it from your account!
                </h1>
              </div>

              {this.renderControls(currentView, updatePlaylist )}
            </div>

            {console.log("this.props inside PlaylistEditor ", this.props)}
            {console.log("this.state inside PlaylistEditor ", this.state)}

            {this.renderCurrentView(currentView, currentUser)}
          </div>
        )}
      </Mutation>
    );
  }
}

export default PlaylistEditor;
