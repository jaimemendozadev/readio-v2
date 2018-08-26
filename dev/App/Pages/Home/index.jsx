import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import {
  GET_USER_INFO,
  SAVE_USER_IN_CACHE,
  LOAD_PLAYLIST_IN_CACHE
} from "./graphql";
import Spinner from "../../Components/Spinner.jsx";
import PlaylistView from "../PlaylistView/index.jsx";

const defaultState = {
  currentUser: {}
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  saveFetchedUser = (getUser, client) => {
    const oldState = client.readQuery({ query: SAVE_USER_IN_CACHE });

    const { currentUser } = oldState;

    // Update newState key/values with getUser
    const newState = {};
    newState.id = getUser.id;
    newState.email = getUser.email;
    newState.first_name = getUser.first_name;
    newState.last_name = getUser.last_name;
    newState.playlists = getUser.playlists;

    // Spread oldState and update currentUser with newState
    const data = {
      ...oldState,
      currentUser: Object.assign({}, currentUser, newState)
    };

    client.writeQuery({ query: SAVE_USER_IN_CACHE, data });

    console.log("client after saving getUser ", client);
  };

  renderPlaylists = playlists => {
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
          Your Current Playlists: Click on a playlist to load it in the player!
        </h1>
        <Mutation mutation={LOAD_PLAYLIST_IN_CACHE}>
          {loadPlaylistInCache => (
            <PlaylistView
              scrollView={true}
              propMutation={loadPlaylistInCache}
              varObjKey={"playlistArg"}
              playlists={playlists}
              callback={null}
            />
          )}
        </Mutation>
      </div>
    );
  };

  checkRenderStatus = (data, loading, error, client) => {
    if (loading) {
      return (
        <div className="home-loading-container">
          <h1>Loading...</h1>
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-msg">
          Sorry, there was an error processing your request...
        </div>
      );
    }

    if (data) {
      const { getUser } = data;

      this.saveFetchedUser(getUser, client);

      return (
        <div>
          <h1>
            {getUser
              ? `Welcome to Read.io ${getUser.first_name}!`
              : `Read.io - Home Page`}
          </h1>

          {this.renderPlaylists(getUser.playlists)}
        </div>
      );
    }
  };

  render() {
    return (
      <Query query={GET_USER_INFO}>
        {({ data, loading, error, client }) => {
          return (
            <div>{this.checkRenderStatus(data, loading, error, client)}</div>
          );
        }}
      </Query>
    );
  }
}

export default Home;
