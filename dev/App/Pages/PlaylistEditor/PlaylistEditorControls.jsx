import React from "react";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";
import BackIcon from "./assets/back.png";

const PlaylistEditorControls = ({
  textInput,
  playlistName,
  performDBUpdate,
  deleteFromDB,
  handleNameChange,
  clearFormInput,
  deleteMutation,
  updateMutation,
  changeView
}) => {
  return (
    <div>
      <h2>Update the playlist name in the text field!</h2>
      <h3>Your current playlist name is: {playlistName}</h3>
      <h3>Your new playlist name is: {textInput}</h3>
      <form onSubmit={event => event.preventDefault()}>
        <input
          onClick={clearFormInput}
          onChange={handleNameChange}
          type="text"
          value={textInput}
        />
      </form>

      <div className="playlist-ctrl-parent-btn-container">
        <div className="playlist-ctrl-btn-header">
          <h2>Remove a song, delete the playlist, or go back!</h2>
        </div>

        <div className="playlist-ctrl-btns">
          <button onClick={() => performDBUpdate(updateMutation)}>
            <img src={SaveIcon} />
            Update
          </button>
          <button onClick={() => deleteFromDB(deleteMutation)}>
            <img src={DeleteIcon} />
            Delete
          </button>

          <button onClick={() => changeView("Edit Playlist")}>
            <img src={BackIcon} />
            Edit All Playlists
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistEditorControls;
