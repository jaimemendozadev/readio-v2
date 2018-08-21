import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_USER_INFO } from "./graphql";
import Spinner from "../../Components/Spinner.jsx";

const defaultState = {
  currentUser: {}
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  renderPlaylists = playlists => {
    if (playlists.length == 0) {
      return (
        <h1>
          You have no playlists. Start searching for Music and make a playlist!
        </h1>
      );
    }
  };

  checkRenderStatus = (data, loading, error) => {
    if (loading) {
      return (
        <div>
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
        {({ data, loading, error }) => {
          return <div>{this.checkRenderStatus(data, loading, error)}</div>;
        }}
      </Query>
    );
  }
}

export default Home;
