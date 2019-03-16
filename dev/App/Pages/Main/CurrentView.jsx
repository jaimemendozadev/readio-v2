import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../Home/index.jsx';
import Search from '../Search/index.jsx';
import SavePlaylist from '../SavePlaylist/index.jsx';
import PlaylistEditor from '../PlaylistEditor/index.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import {GET_LOCAL_USER_INFO} from '../../Apollo/API/graphql/index.js';

const components = {
  Home,
  Search,
  'Save Playlist': SavePlaylist,
};

class CurrentView extends Component {
  handleLogOut = client => {
    client.resetStore();

    localStorage.clear();

    return <Redirect to={{pathname: '/'}} />;
  };

  render() {
    const {client, currentView, viewSwitchCB} = this.props;

    if (currentView == 'Log Out') {
      return this.handleLogOut(client);
    }

    if (components[currentView]) {
      const Component = components[currentView];
      return <Component />;
    }

    if (currentView === 'Playlist Editor') {
      return (
        <CustomQuery query={GET_LOCAL_USER_INFO}>
          {data => {
            return (
              <PlaylistEditor
                viewSwitchCB={viewSwitchCB}
                currentUser={data.currentUser}
              />
            );
          }}
        </CustomQuery>
      );
    }

    return null;
  }
}

export default CurrentView;