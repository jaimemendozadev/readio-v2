import React from "react";

const renderSongNames = songs => {
  return (
    <ul>
    {songs.map(song => {
      return <p key={song.id_user_id_identifier
      }>{song.title}</p>
    })}
    </ul>
  )
}


const PlaylistCard = ({ playlistInfo }) => (
  <div className="playlist-wrapper">
    <div className="playlistcard">
        {console.log("playlistInfo is ", playlistInfo)}
        <div className="playlistcard-front">
           <h3>{playlistInfo.name}</h3>
        </div>

        <div className="playlistcard-middle"></div>
        
        <div className="playlistcard-back">
          {renderSongNames(playlistInfo.songs)}
        </div>
    </div>
  </div>
);

export default PlaylistCard;
