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
  playlistName: "Edit the playlist name",
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
      playlistName: event.target.value
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

  handleSubmit = (event, client, songListCount) => {
    event.preventDefault();

    if (songListCount == 0) {
      this.setState({
        pageError: true,
        pageErrorMsg:
          "Whoops! You can't enter a playlist name when you haven't selected a song!"
      });
    } else {
    }
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

  renderCurrentView = (currentView, currentUser) => {
    if (currentView == "Edit Playlist") {
      return (
        <PlaylistView
          scrollView={false}
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
          <PlaylistEditorControls />
          <SongView
            PROP_MUTATION={null}
            songInput={playlistSongs}
            callback={this.deleteSongFromPlaylist}
            assetType={"trash"}
            searchView={null}
          />
        </div>
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
    const { currentView } = this.state;

    return (
      <div className="playlist-editor">
        <div className="playlist-editor-header-container">
          <div>
            <h1>
              Click on a playlist to update or delete it from your account!
            </h1>
            <h2>Click on a song to load it into the player!</h2>
          </div>

          <form onSubmit={event => null}>
            <input
              onClick={this.clearInput}
              onChange={this.handleChange}
              type="text"
              value={this.state.playlistName}
            />
          </form>
        </div>

        {console.log("this.props inside PlaylistEditor ", this.props)}
        {console.log("this.state inside PlaylistEditor ", this.state)}

        {this.renderCurrentView(currentView, currentUser)}
      </div>
    );
  }
}

export default PlaylistEditor;
