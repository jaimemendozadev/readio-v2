import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_USER_INFO, SAVE_USER_IN_CACHE } from "./graphql";
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
    let oldState = client.readQuery({ query: SAVE_USER_IN_CACHE });

    // Copy all oldState.currentUser key/values
    let newState = { ...oldState.currentUser };

    // Update newState key/values with getUser
    newState.id = getUser.id;
    newState.email = getUser.email;
    newState.first_name = getUser.first_name;
    newState.last_name = getUser.last_name;
    newState.playlists = getUser.playlists;

    newState = Object.assign({}, oldState, { currentUser: newState });

    client.writeQuery({ query: SAVE_USER_IN_CACHE, data: newState });

    console.log('client after saving getUser ', client)
  };

  renderPlaylists = playlists => {
    console.log("playlists inside Home page ", playlists);
    if (playlists.length == 0) {
      return (
        <h1>
          You have no playlists. Start searching for Music and make a playlist!
        </h1>
      );
    }

    return <PlaylistView playlists={playlists} />;
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
