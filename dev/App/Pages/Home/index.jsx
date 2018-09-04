import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import {
  GET_USER_INFO,
  SAVE_USER_IN_CACHE,
  LOAD_PLAYLIST_IN_CACHE,
  GET_STORED_PLAYLIST
} from "../../Apollo/API/graphql/index.js";
import Spinner from "../../Components/Spinner.jsx";
import PlaylistView from "../PlaylistView/index.jsx";
import SongView from "../SongView/index.jsx";

const defaultState = {
  currentUser: {}
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  checkForStoredPlaylist = (data, loading, error) => {
    if (data.currentlyPlaying.storedPlaylist.length) {
      const { songs, name } = data.currentlyPlaying.storedPlaylist[0];

      return (
        <div className="stored-playlist-container">
          <h2>Or pick a song from your currently selected playlist!</h2>

          <h3>Playlist Name: {name}</h3>
          <SongView
            PROP_MUTATION={null}
            songInput={songs}
            callback={null}
            assetType={"none"}
            searchView={false}
          />
        </div>
      );
    }
  };

  saveFetchedUser = (getUser, client) => {
    const oldState = client.readQuery({ query: SAVE_USER_IN_CACHE });

    const { currentUser } = oldState;

    const newState = {};
    newState.id = getUser.id;
    newState.email = getUser.email;
    newState.first_name = getUser.first_name;
    newState.last_name = getUser.last_name;
    newState.playlists = getUser.playlists;

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
        <Query query={GET_STORED_PLAYLIST}>
          {({ data, loading, error }) => (
            <Mutation mutation={LOAD_PLAYLIST_IN_CACHE}>
              {loadPlaylistInCache => (
                <div className="main-home-container">
                  {this.checkForStoredPlaylist(data, loading, error)}

                  <PlaylistView
                    propMutation={loadPlaylistInCache}
                    varObjKey={"playlistArg"}
                    playlists={playlists}
                    callback={null}
                  />
                </div>
              )}
            </Mutation>
          )}
        </Query>
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
