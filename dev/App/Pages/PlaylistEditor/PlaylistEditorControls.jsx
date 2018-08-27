import React from "react";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";

const PlaylistEditorControls = props => {
  return (
    <div>
      <h2>Your current playlist name is: </h2>
      <h2>Update the playlist name in the text field!</h2>
      <form onSubmit={event => null}>
        <input onClick={() => null} onChange={null} type="text" value={null} />
      </form>
      <div className="playlist-ctrl-btn-container">
        <div className="playlist-ctrl-btn-header">
          <h1>Remove a song and update, or delete the playlist!</h1>
        </div>

        <button disabled={true} onClick={() => null}>
          <img src={SaveIcon} />
          Save
        </button>
        <button disabled={true} onClick={() => null}>
          <img src={DeleteIcon} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlaylistEditorControls;
