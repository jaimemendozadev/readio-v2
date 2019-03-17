import React from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../Home/index.jsx';
import Search from '../Search/index.jsx';
import SavePlaylist from '../SavePlaylist/index.jsx';
import PlaylistEditor from '../PlaylistEditor/index.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import CustomMutation from '../../Components/CustomMutation.jsx';

import {
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_USER_INFO,
  GET_LOCAL_USER_INFO,
} from '../../Apollo/API/graphql/index.js';

const components = {
  Home,
  Search,
  'Save Playlist': SavePlaylist,
};

const handleLogOut = client => {
  client.resetStore();

  localStorage.clear();

  return <Redirect to={{pathname: '/'}} />;
};

const CurrentView = ({client, currentView, viewSwitchCB}) => {
  if (currentView == 'Log Out') {
    return handleLogOut(client);
  }

  if (components[currentView]) {
    const Component = components[currentView];
    return <Component />;
  }

  if (currentView === 'Playlist Editor') {
    return (
      <CustomQuery
        query={GET_LOCAL_USER_INFO}
        onCompleted={data => console.log('data from query on complete ', data)}
      >
        {({currentUser}) => (
          <CustomMutation
            mutation={UPDATE_PLAYLIST}
            refetchQueries={() => [{query: GET_USER_INFO}]}
          >
            {(updatePlaylistMutation, {data: updateServerResponse}) => (
              <CustomMutation
                mutation={DELETE_PLAYLIST}
                refetchQueries={() => [{query: GET_USER_INFO}]}
              >
                {(deletePlaylistMutation, {data: deleteServerResponse}) => {
                  const mutationsProp = {
                    delete: deletePlaylistMutation,
                    update: updatePlaylistMutation,
                  };

                  const serverResponses = {
                    delete: deleteServerResponse,
                    update: updateServerResponse,
                  };
                  return (
                    <PlaylistEditor
                      currentUser={currentUser}
                      mutationsProp={mutationsProp}
                      serverResponses={serverResponses}
                      viewSwitchCB={viewSwitchCB}
                    />
                  );
                }}
              </CustomMutation>
            )}
          </CustomMutation>
        )}
      </CustomQuery>
    );
  }

  return null;
};

export default CurrentView;
