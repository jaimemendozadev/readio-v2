import React, { Component } from "react";
import {
  setLocalState,
  escapeHtml,
  editSongList,
  handlePlaylistEditorView
} from "./utils.jsx";
import { GET_USER_ID } from "./graphql";
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
    const { playlistSongs } = this.state;

    const { id_user_id_identifier } = playlistSong;

    const filteredList = playlistSongs.filter(
      song => song.id_user_id_identifier != id_user_id_identifier
    );

    this.setState({
      playlistSongs: filteredList
    });
  };

  saveToDB = async (saveToDBMutation, client) => {
    const { songList } = client.readQuery({ query: GET_SONG_LIST });
    const { currentUser } = client.readQuery({ query: GET_USER_ID });

    const filteredList = editSongList(songList.list);

    const input = {
      name: escapeHtml(songList.name),
      list: filteredList
    };

    const userID = currentUser.id;

    const { data } = await saveToDBMutation({
      variables: { userID, input }
    });

    const { createPlaylist } = data;

    if (!createPlaylist.error) {
      const defaultSongList = {
        songList: Object.assign({}, songList, { name: "untitled", list: [] })
      };

      client.writeQuery({ query: GET_SONG_LIST, data: defaultSongList });
      console.log("cache after resetting ", client);
    }
  };

  deleteFromDB = () => {};

  renderControls = currentView => {
    const { textInput } = this.state;

    if (currentView == "Song View") {
      return (
        <PlaylistEditorControls
          textInput={textInput}
          saveToDB={null}
          deleteFromDB={null}
          handleChange={this.handleChange}
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
      <div className="playlist-editor">
        <div className="playlist-editor-header-container">
          <div>
            <h1>
              Click on a playlist to update or delete it from your account!
            </h1>
          </div>

          {this.renderControls()}
        </div>

        {console.log("this.props inside PlaylistEditor ", this.props)}
        {console.log("this.state inside PlaylistEditor ", this.state)}

        {this.renderCurrentView(currentView, currentUser)}
      </div>
    );
  }
}

export default PlaylistEditor;
