import React from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../Home/index.jsx';
import Search from '../Search/index.jsx';
import SavePlaylist from '../SavePlaylist/index.jsx';
import PlaylistEditor from '../PlaylistEditor/index.jsx';

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
    return <PlaylistEditor viewSwitchCB={viewSwitchCB} />;
  }

  return null;
};

export default CurrentView;
