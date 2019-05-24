import React, {Component} from 'react';
import SaveIcon from '../assets/savesonglist.png';
import DeleteIcon from '../assets/deletesonglist.png';
import BackIcon from '../assets/back.png';
import {performDelete, performUpdate} from './utils.js';

const defaultState = {
  textInput: '',
  currentPlaylist: {},
  currentUser: {},
};

class UpdatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

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

  triggerUpdate = async event => {
    event.preventDefault();

    const {textInput, selectedPlaylist} = this.state;
    const {resetState, mutationsProp} = this.props;

    const serverResponse = await performUpdate(
      mutationsProp.update,
      textInput,
      selectedPlaylist,
    );

    if (serverResponse) {
      const {
        data: {updatePlaylist},
      } = serverResponse;
      const {message} = updatePlaylist;

      const updatedState = {serverResponse: {updateResponse: message}};
      resetState(updatedState);
    }
  };

  triggerReset = async event => {
    event.preventDefault();
    const {currentUser, selectedPlaylist} = this.state;
    const {resetState, mutationsProp} = this.props;

    const serverResponse = await performDelete(
      mutationsProp.delete,
      currentUser,
      selectedPlaylist,
    );

    if (serverResponse) {
      const {
        data: {deletePlaylist},
      } = serverResponse;

      const {message} = deletePlaylist;
      const updatedState = {serverResponse: {deleteResponse: message}};
      resetState(updatedState);
    }
  };

  componentDidUpdate = prevProps => {
    const oldName = prevProps.selectedPlaylist.playlistName;
    const oldPlaylistSongs = prevProps.selectedPlaylist.playlistSongs;

    const {playlistName, playlistSongs} = this.props.selectedPlaylist;

    if (
      oldName !== playlistName ||
      oldPlaylistSongs.length !== playlistSongs.length
    ) {
      const updatedSelection = this.props.selectedPlaylist;
      const selectedPlaylist = Object.assign(
        {},
        prevProps.selectedPlaylist,
        updatedSelection,
      );

      this.setState({
        selectedPlaylist,
      });
    }
  };

  componentDidMount = () => {
    const {currentUser, selectedPlaylist} = this.props;

    this.setState({currentUser, selectedPlaylist});
  };

  render() {
    const {textInput} = this.state;
    const {sendToHomeView} = this.props;

    // playlistName comes as props from selectedPlaylist,
    // will be saved in local state on CDM and CDU
    const playlistName = this.props.selectedPlaylist
      ? this.props.selectedPlaylist.playlistName
      : this.state.selectedPlaylist.playlistName;

    return (
      <div>
        <h2>Update the playlist name in the text field!</h2>
        <h3>Your current playlist name is: {playlistName}</h3>
        <h3>Your new playlist name is: {textInput}</h3>
        <form onSubmit={event => event.preventDefault()}>
          <input
            onClick={this.clearFormInput}
            onChange={this.handleNameChange}
            type="text"
            value={textInput}
          />
        </form>

        <div className="playlist-ctrl-parent-btn-container">
          <div className="playlist-ctrl-btn-header">
            <h2>Remove a song, delete the playlist, or go back!</h2>
          </div>

          <div className="playlist-ctrl-btns">
            <button onClick={sendToHomeView}>
              <img src={BackIcon} />
              Back to Home
            </button>
            <button onClick={this.triggerUpdate}>
              <img src={SaveIcon} />
              Update
            </button>
            <button onClick={this.triggerReset}>
              <img src={DeleteIcon} />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatePanel;
