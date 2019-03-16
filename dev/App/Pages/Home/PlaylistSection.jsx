import React from 'react';
import {Mutation} from 'react-apollo';
import StoredPlaylist from './StoredPlaylist.jsx';
import PlaylistView from '../PlaylistView/index.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import {
  LOAD_PLAYLIST_IN_CACHE,
  GET_STORED_PLAYLIST,
} from '../../Apollo/API/graphql/index.js';

const PlaylistSection = ({playlists}) => {
  if (playlists.length == 0) {
    return (
      <h1>
        You have no playlists. Start searching for Music and make a playlist!
      </h1>
    );
  }

  return (
    <div>
      <h1>
        Your Current Playlists: Click on a playlist below to load it in the
        player!
      </h1>
      <CustomQuery query={GET_STORED_PLAYLIST}>
        {data => (
          <Mutation mutation={LOAD_PLAYLIST_IN_CACHE}>
            {loadPlaylistInCache => (
              <div className="main-home-container">
                <StoredPlaylist data={data} />

                <PlaylistView
                  propMutation={loadPlaylistInCache}
                  varObjKey={'playlistArg'}
                  playlists={playlists}
                  callback={null}
                />
              </div>
            )}
          </Mutation>
        )}
      </CustomQuery>
    </div>
  );
};

export default PlaylistSection;
