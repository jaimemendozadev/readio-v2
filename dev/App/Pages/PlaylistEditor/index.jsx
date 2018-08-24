import React, {Component} from 'react';
import { ApolloConsumer, Query, Mutation } from "react-apollo";
import {
  escapeHtml,
  editSongList,
  handlePlaylistEditorView
} from "./utils.jsx";
import { GET_SONG_LIST, SAVE_SONGLIST_TO_DB, GET_USER_ID } from "./graphql";
import SaveIcon from "./assets/savesonglist.png";
import DeleteIcon from "./assets/deletesonglist.png";

const defaultState = {
  playlistName: "Give your playlist a name!",
  pageError: false,
  pageErrorMsg: "",
  serverResponse: ""
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = () => {
    const { playlistName } = this.state;
    if (playlistName.length) {
      this.setState({
        playlistName: "",
        pageError: false,
        pageErrorMsg: ""
      });
    }
  };

  handleChange = event => {
    event.preventDefault();

    this.setState({
      playlistName: event.target.value
    });
  };

  handleSubmit = (event, client, songListCount) => {
    event.preventDefault();

    if (songListCount == 0) {
      this.setState({
        pageError: true,
        pageErrorMsg:
          "Whoops! You can't enter a playlist name when you haven't selected a song!"
      });
    } else {
      const playlistName = this.state.playlistName;

      const oldState = client.readQuery({ query: GET_SONG_LIST });

      let newState = { ...oldState.songList };

      newState.name = playlistName;

      newState = Object.assign({}, oldState, { songList: newState });

      client.writeQuery({ query: GET_SONG_LIST, data: newState });
    }
  };

  saveToDB = async (saveToDBMutation, client) => {
    const { songList } = client.readQuery({ query: GET_SONG_LIST });
    const { currentUser } = client.readQuery({ query: GET_USER_ID });

    // MUST DELETE __typename of each song before sending to backend
    // else __typename will cause error in BE because __typename is
    // not found on mutation input

    // Not most optimal solution to delete __typename
    const filteredList = editSongList(songList.list);

    // sanitize the playlist BEFORE submitting to DB
    const input = {
      name: escapeHtml(songList.name),
      list: filteredList
    };

    const userID = currentUser.id;

    const { data } = await saveToDBMutation({
      variables: { userID, input }
    });

    const { createPlaylist } = data;

    // If playlist saved, reset songList cache
    if (!createPlaylist.error) {
      // Reset songList cache with defaults
      // NOTE: data MUST include defaultStore key
      const defaultSongList = {
        songList: Object.assign({}, songList, { name: "untitled", list: [] })
      };

      client.writeQuery({ query: GET_SONG_LIST, data: defaultSongList });
      console.log("cache after resetting ", client);
    }
  };

  deleteFromDB = () => {};

  render() {
    const { pageError, pageErrorMsg } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <Mutation mutation={SAVE_SONGLIST_TO_DB}>
            {(saveSonglistToDB, { data: mutationData }) => (
              <Query query={GET_SONG_LIST}>
                {({ data, loading, error }) => {
                  const songListCount = data.songList.list.length;

                  return (
                    <div>
                      <div className="playlist-editor-header-container">
                        <div>
                          <h1>Click on a playlist to edit it!</h1>
                          <h2>Click on a song to load it into the player!</h2>
                        </div>

                        <form
                          onSubmit={event =>
                            this.handleSubmit(event, client, songListCount)
                          }
                        >
                          <input
                            onClick={this.clearInput}
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.playlistName}
                          />
                        </form>
                      </div>

                      <div className="save-playlist-btn-container">
                        <div className="save-playlist-btn-header">
                          <h1>
                            Update or Delete the Playlist in Your Account...
                          </h1>
                        </div>

                        <button
                          disabled={songListCount == 0 ? true : false}
                          onClick={() =>
                            this.saveToDB(saveSonglistToDB, client)
                          }
                        >
                          <img src={SaveIcon} />
                          Save
                        </button>
                        <button
                          disabled={songListCount == 0 ? true : false}
                          onClick={this.deleteFromDB}
                        >
                          <img src={DeleteIcon} />
                          Delete
                        </button>
                      </div>

                      {handlePlaylistEditorView(
                        data,
                        loading,
                        error,
                        mutationData,
                        pageError,
                        pageErrorMsg
                      )}
                    </div>
                  );
                }}
              </Query>
            )}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }
}

export default PlaylistEditor;
