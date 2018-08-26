import React, { Component } from "react";
import {
  escapeHtml,
  editSongList,
  handlePlaylistEditorView
} from "./utils.jsx";
import { GET_USER_ID } from "./graphql";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";
import PlaylistView from "../PlaylistView/index.jsx";

const defaultState = {
  currentView: "Edit Playlist",
  playlistName: "Edit the playlist name",
  pageError: false,
  pageErrorMsg: "",
  serverResponse: "",
  playlistOnDeck: {}
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

  handleSubmit = (event, client, songListCount) => {
    event.preventDefault();

    if (songListCount == 0) {
      this.setState({
        pageError: true,
        pageErrorMsg:
          "Whoops! You can't enter a playlist name when you haven't selected a song!"
      });
    } else {
      /*
      const playlistName = this.state.playlistName;

      const oldState = client.readQuery({ query: GET_SONG_LIST });

      let newState = { ...oldState.songList };

      newState.name = playlistName;

      newState = Object.assign({}, oldState, { songList: newState });

      client.writeQuery({ query: GET_SONG_LIST, data: newState });
      */
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

  /*
    Mutation: If User selects a song from playlist => play in React Player

    Mutation: If User deletes song from playlist => update playlist in local cache

    Mutation: If User pushes Save button
      -If playlist has at least one song, send update to database

    Mutation: If User pushes Delete button, delete playlist locally and in database


  */

  render() {
    const{currentUser, currentlyPlaying} = this.props
    return (
      <div className="playlist-editor">
        <div className="playlist-editor-header-container">
          <div>
            <h1>Click on a playlist to edit it!</h1>
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

        <div className="save-playlist-btn-container">
          <div className="save-playlist-btn-header">
            <h1>Update or Delete the Playlist in Your Account...</h1>
          </div>

          <button disabled={true} onClick={() => null}>
            <img src={SaveIcon} />
            Save
          </button>
          <button disabled={true} onClick={this.deleteFromDB}>
            <img src={DeleteIcon} />
            Delete
          </button>
        </div>

        {console.log("this.props ", this.props)}

        <PlaylistView 
          scrollView={false}
          propMutation={null}
          varObjKey={null}
          playlists={currentUser.playlists}
          callback={null}
        />

        {/* 
          Have access to 
           -currentUser
           -currentlyPlaying

          Render <PlaylistView />

          //If you click on a Playlist, use <SonvView /> to render songs
        
        */}
      </div>
    );
  }
}

export default PlaylistEditor;
