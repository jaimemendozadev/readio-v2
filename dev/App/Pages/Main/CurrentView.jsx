import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Home from '../Home/index.jsx';
import Search from '../Search/index.jsx';
import SavePlaylist from '../SavePlaylist/index.jsx';
import PlaylistEditor from '../PlaylistEditor/index.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';

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
    const {client, currentView} = this.props;

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
                viewSwitchCB={this.viewSwitch}
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

// const CurrentView = ({client, currentView}) => (

// )

export default CurrentView;
