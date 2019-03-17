import React, {Component} from 'react';
import SaveIcon from '../assets/savesonglist.png';
import DeleteIcon from '../assets/deletesonglist.png';
import BackIcon from '../assets/back.png';

import {
  escapeHtml,
  checkPlaylistName,
  prepPlaylistPayload,
  resetLocalPlaylistState,
} from './utils.js';

const defaultState = {
  textInput: '',
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

  performDBUpdate = async saveToDBMutation => {
    const {textInput, selectedPlaylist} = this.state;
    const {playlistID, playlistName, playlistSongs} = selectedPlaylist;

    const nameInput = checkPlaylistName(textInput, playlistName);

    const sanitizedName = escapeHtml(nameInput);

    const updatedList = prepPlaylistPayload(sanitizedName, playlistSongs);

    const result = await saveToDBMutation({
      variables: {playlistID, updatedList},
    });

    console.log('result from DB after updating playlist ', result);
  };

  deleteFromDB = async deletePlaylistMutation => {
    const {currentUser, selectedPlaylist} = this.state;
    const {playlistID} = selectedPlaylist;

    const result = await deletePlaylistMutation({
      variables: {playlistID, userID: currentUser.id},
    });

    const resetState = resetLocalPlaylistState();

    this.setState({selectedPlaylist: resetState});

    console.log('message from deletePlaylist mutation ', result);
  };

  componentDidMount = () => {
    const {currentUser, selectedPlaylist} = this.props;

    this.setState({currentUser, selectedPlaylist});
  };

  render() {
    const {textInput} = this.state;
    const {mutationsProp, sendToHomeView} = this.props;

    // playlistName comes as props from selectedPlaylist,
    // will be saved in local state on CDM
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
            <button onClick={() => this.performDBUpdate(mutationsProp.update)}>
              <img src={SaveIcon} />
              Update
            </button>
            <button onClick={() => this.deleteFromDB(mutationsProp.delete)}>
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
