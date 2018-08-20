import React, { Component } from "react";
import { Query } from "react-apollo";
import { escapeHtml } from "./utils";
import SongView from "../SongView/index.jsx";
import { GET_SONG_LIST, DELETE_FROM_SONG_LIST } from "./graphql";

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

  handleSubmit = event => {
    event.preventDefault();
    const playlistName = escapeHtml(this.state.playlistName);
  };

  render() {
    return (
      <Query query={GET_SONG_LIST}>
        {({ data, loading, error }) => (
          <div className="playlist-editor">
            <div>
              <h1>Edit and Save Your Current Playlist!</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                  onClick={this.clearInput}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.playlistName}
                />
              </form>
            </div>

            {data.songList.list.length == 0 ? null : (
              <SongView
                PROP_MUTATION={DELETE_FROM_SONG_LIST}
                songInput={data.songList.list}
                callback={null}
                assetType="trash"
              />
            )}
          </div>
        )}
      </Query>
    );
  }
}

export default PlaylistEditor;
