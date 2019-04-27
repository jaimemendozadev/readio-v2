import React from 'react';
import {GET_USER_INFO} from '../../Apollo/API/graphql/index.js';
import PlaylistSection from './PlaylistSection.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import {saveFetchedUser} from './utils';

const Home = () => (
  <CustomQuery query={GET_USER_INFO}>
    {(data, client) => {
      const {getUser} = data;

      // Save fetched user in Apollo clientState
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

export default Home;
