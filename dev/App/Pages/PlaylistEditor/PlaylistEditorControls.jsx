import React from "react";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";

const PlaylistEditorControls = ({
  textInput,
  playlistName,
  performDBUpdate,
  deleteFromDB,
  handleNameChange,
  clearFormInput,
  updateMutation
}) => {
  return (
    <div>
      <h2>Update the playlist name in the text field!</h2>
      <form onSubmit={event => null}>
        <input
          onClick={clearFormInput}
          onChange={handleNameChange}
          type="text"
          value={textInput}
        />
      </form>

      <h2>Your current playlist name is: {playlistName}</h2>
      <h2>Your new playlist name is: {textInput}</h2>
      <div className="playlist-ctrl-btn-container">
        <div className="playlist-ctrl-btn-header">
          <h1>Remove a song and update, or delete the playlist!</h1>
        </div>

        <button onClick={() => performDBUpdate(updateMutation)}>
          <img src={SaveIcon} />
          Update
        </button>
        <button onClick={() => null}>
          <img src={DeleteIcon} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlaylistEditorControls;
