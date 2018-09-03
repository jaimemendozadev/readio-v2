import React from "react";

const NavSidebar = ({ callback }) => (
  <div className="side-bar">
    <nav>
      <div onClick={() => callback("Home")} className="side-bar-link">
        Home
      </div>
      <div onClick={() => callback("Search")} className="side-bar-link">
        Search
      </div>
      <div onClick={() => callback("Save Playlist")} className="side-bar-link">
        Save Playlist
      </div>
      <div
        onClick={() => callback("Playlist Editor")}
        className="side-bar-link"
      >
        Edit All Playlists
      </div>

      <div onClick={() => callback("Log Out")} className="side-bar-link">
        Logout
      </div>
    </nav>
  </div>
);

export default NavSidebar;
