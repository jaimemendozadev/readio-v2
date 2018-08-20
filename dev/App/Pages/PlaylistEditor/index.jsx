import React, { Component } from "react";
import { Query } from "react-apollo";
import { escapeHtml } from "./utils";
import SongView from "../SongView/index.jsx";

const defaultState = {
  playlistName: "Give your playlist a name!",
  searchResults: []
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

  handleSubmit = async (event, client) => {
    event.preventDefault();
    const playlistName = escapeHtml(this.state.playlistName);
  };

  render() {
    const { searchResults } = this.state;
    return (
      <Query query={null}>
        {client => (
          <div className="playlist-editor">
            <div>
              <h1>Edit and Save Your Current Playlist!</h1>
              <form onSubmit={event => this.handleSubmit(event, client)}>
                <input
                  onClick={this.clearInput}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.playlistName}
                />
              </form>
            </div>

            {searchResults.length == 0 ? null : (
              <SongView
                PROP_MUTATION={ADD_TO_SONG_LIST}
                songInput={searchResults}
                callback={null}
              />
            )}

          </div>
        )}
      </Query>
    );
  }
}

export default PlaylistEditor;
