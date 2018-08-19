import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";

const defaultState = {
  playlistName: "Give your playlist a name!",
  searchResults: []
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handleSubmit = (event, client) => {
    event.prventDefault();

  }

  render() {
    const { searchResults } = this.state;
    return (
      <ApolloConsumer>
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

 
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default PlaylistEditor;
