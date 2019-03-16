import {SAVE_USER_IN_CACHE} from '../../Apollo/API/graphql/index.js';

export const saveFetchedUser = (getUser, client) => {
  const oldState = client.readQuery({query: SAVE_USER_IN_CACHE});

  const {currentUser} = oldState;

  const newState = {};
  newState.id = getUser.id;
  newState.email = getUser.email;
  newState.first_name = getUser.first_name;
  newState.last_name = getUser.last_name;
  newState.playlists = getUser.playlists;

  const data = {
    ...oldState,
    currentUser: Object.assign({}, currentUser, newState),
  };

  client.writeQuery({query: SAVE_USER_IN_CACHE, data});

  console.log('client after saving getUser ', client);
};
