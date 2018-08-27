import React from "react";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";

const PlaylistEditorControls = props => {
  return (
    <div className="save-playlist-btn-container">
      <div className="save-playlist-btn-header">
        <h1>Update or Delete the Playlist in Your Account...</h1>
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
  );
};

export default PlaylistEditorControls;
