import React from 'react';
import ReactPlayer from 'react-player';

const ReactPlayer = ({
  client,
  currentSong,
  currentlyPlaying,
  queueNextSong,
}) => (
  <div className="react-player">
    <ReactPlayer
      url={currentlyPlaying ? currentlyPlaying.currentSong : currentSong}
      playing={currentlyPlaying ? currentlyPlaying.playing : false}
      width="100%"
      height="100%"
      config={{
        soundcloud: {
          options: {
            color: '#55728C',
          },
        },
      }}
      onEnded={() => queueNextSong(client)}
    />
  </div>
);

export default ReactPlayer;
