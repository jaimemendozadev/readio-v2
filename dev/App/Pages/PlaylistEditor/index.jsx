import React, { Component } from "react";
import { ApolloConsumer, Query } from "react-apollo";
import { escapeHtml } from "./utils";
import SongView from "../SongView/index.jsx";
import { GET_SONG_LIST, DELETE_FROM_SONG_LIST } from "./graphql";
import Spinner from "../../Components/Spinner.jsx";

const defaultState = {
  playlistName: "Give your playlist a name!"
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = event => {
    const { playlistName } = this.state;
    if (playlistName.length) {
      this.setState({
        playlistName: ""
      });
    }
  };

  handleChange = event => {
    event.preventDefault();

    this.setState({
      playlistName: event.target.value
    });
  };

  handleSubmit = (event, client) => {
    event.preventDefault();
    const playlistName = this.state.playlistName;

    // sanitize the playlist BEFORE submitting to DB
    // const playlistName = escapeHtml(this.state.playlistName);

    const oldState = client.readQuery({ query: GET_SONG_LIST });

    console.log("oldState inside Playlist Editor ", oldState);

    const newState = { ...oldState };

    newState.songList.name = playlistName;

    console.log("newState after appending name ", newState);

    client.writeQuery({ query: GET_SONG_LIST, data: oldState });

    console.log("client after write is ", client);
  };

  handlePlaylistEditorView = (data, loading, error) => {
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      console.log("error querying cache mutation for songList ", error);

      return (
        <div className="error-msg">
          Whoops! There was an error processing your request. Try again later.
        </div>
      );
    }

    if (data.songList.name == "untitled" && data.songList.list.length == 0) {
      return (
        <div className="error-msg">
          You haven't saved any songs in your playlist. Go SEARCH for a song!
        </div>
      );
    }

    if (data) {
      return (
        <div className="playlist-songs-container">
          <div className="playlist-name-container">
            <h2>Your current playlist name is: {data.songList.name}</h2>
          </div>

          <SongView
            PROP_MUTATION={DELETE_FROM_SONG_LIST}
            songInput={data.songList.list}
            callback={null}
            assetType="trash"
            searchView={false}
          />
        </div>
      );
    }
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={GET_SONG_LIST}>
            {({ data, loading, error }) => (
              <div className="playlist-editor">
                <div className="playlist-header-container">
                  <div className="playlist-headers">
                    <h1>Edit and Save Your Current Playlist!</h1>
                    <h2>Click on a song to load it into the player!</h2>
                  </div>

                  <form onSubmit={event => this.handleSubmit(event, client)}>
                    <input
                      onClick={this.clearInput}
                      onChange={this.handleChange}
                      type="text"
                      value={this.state.playlistName}
                    />
                  </form>
                </div>

                <div className="playlist-buttons-container">
                  <h1>Save or Delete Your Playlist in Your Account...</h1>
                  <button>Save</button>
                  <button>Delete</button>
                </div>

                {this.handlePlaylistEditorView(data, loading, error)}
              </div>
            )}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default PlaylistEditor;
