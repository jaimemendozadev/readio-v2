import React, {Component} from 'react';
import {GET_USER_INFO} from '../../Apollo/API/graphql/index.js';
import PlaylistSection from './PlaylistSection.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import {saveFetchedUser} from './utils';

const defaultState = {
  currentUser: {},
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  render() {
    return (
      <CustomQuery query={GET_USER_INFO}>
        {(data, client) => {
          const {getUser} = data;

          console.log(
            'current user in Home component from getUser query',
            getUser,
          );

          saveFetchedUser(getUser, client);

          return (
            <div>
              <h1>
                {getUser
                  ? `Welcome to Read.io ${getUser.first_name}!`
                  : `Read.io - Home Page`}
              </h1>

              <PlaylistSection playlists={getUser.playlists} />
            </div>
          );
        }}
      </CustomQuery>
    );
  }
}

export default Home;
