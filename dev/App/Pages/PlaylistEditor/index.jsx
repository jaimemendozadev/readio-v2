import React, { Component } from "react";
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import { escapeHtml } from "./utils";
import SongView from "../SongView/index.jsx";
import {
  GET_SONG_LIST,
  DELETE_FROM_SONG_LIST,
  SAVE_SONGLIST_TO_DB,
  GET_USER_ID
} from "./graphql";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";
import Spinner from "../../Components/Spinner.jsx";

const defaultState = {
  playlistName: "Give your playlist a name!"
};

const defaultSongList = {
  __typename: "SongList",
  name: "untitled",
  list: []
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

    let newState = { ...oldState.songList };

    newState.name = playlistName;

    newState = Object.assign({}, oldState, { songList: newState });

    client.writeQuery({ query: GET_SONG_LIST, data: newState });
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

  saveToDB = (saveToDBMutation, client) => {
    const { songList } = client.readQuery({ query: GET_SONG_LIST });
    const { currentUser } = client.readQuery({ query: GET_USER_ID });

    let mutationResult = saveToDBMutation({
      variables: { userID: currentUser.id, input: songList.list }
    });

    console.log("mutation result is ", mutationResult);
  };

  deleteFromDB = () => {};

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation mutation={SAVE_SONGLIST_TO_DB}>
            {saveSonglistToDB => (
              <Query query={GET_SONG_LIST}>
                {({ data, loading, error }) => (
                  <div>
                    <div className="playlist-header-container">
                      <div className="playlist-headers">
                        <h1>Edit and Save Your Current Playlist!</h1>
                        <h2>Click on a song to load it into the player!</h2>
                      </div>

                      <form
                        onSubmit={event => this.handleSubmit(event, client)}
                      >
                        <input
                          onClick={this.clearInput}
                          onChange={this.handleChange}
                          type="text"
                          value={this.state.playlistName}
                        />
                      </form>
                    </div>

                    <div className="playlist-btn-container">
                      <div className="playlist-btn-header">
                        <h1>Save or Delete Your Playlist in Your Account...</h1>
                      </div>

                      <button
                        onClick={() =>
                          this.saveToDB(saveSonglistToDB, client)
                        }
                      >
                        <img src={SaveIcon} />
                        Save
                      </button>
                      <button onClick={this.deleteFromDB}>
                        <img src={DeleteIcon} />
                        Delete
                      </button>
                    </div>

                    {this.handlePlaylistEditorView(data, loading, error)}
                  </div>
                )}
              </Query>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default PlaylistEditor;
