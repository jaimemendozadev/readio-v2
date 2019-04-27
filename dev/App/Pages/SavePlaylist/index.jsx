import React, {Component} from 'react';
import Header from './Header.jsx';
import SaveButton from './SaveButton.jsx';
import EditorView from './EditorView.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import CustomMutation from '../../Components/CustomMutation.jsx';
import {
  GET_SONG_LIST,
  SAVE_SONGLIST_TO_DB,
  GET_USER_INFO,
} from '../../Apollo/API/graphql/index.js';
import {savePlaylistToDB} from './utils.js';

const defaultState = {
  playlistName: 'Give your playlist a name!',
  pageError: false,
  pageErrorMsg: '',
  serverResponse: '',
};

class SavePlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  clearInput = () => {
    const {playlistName} = this.state;
    if (playlistName.length) {
      this.setState({
        playlistName: '',
        pageError: false,
        pageErrorMsg: '',
      });
    }
  };

  resetInput = () => {
    this.setState(defaultState);
  };

  handleChange = event => {
    event.preventDefault();

    this.setState({
      playlistName: event.target.value,
    });
  };

  handleSubmit = (event, client, songListCount) => {
    event.preventDefault();

    if (songListCount == 0) {
      this.setState({
        pageError: true,
        pageErrorMsg:
          "Whoops! You can't enter a playlist name when you haven't selected a song!",
      });
    } else {
      const playlistName = this.state.playlistName;

      const oldState = client.readQuery({query: GET_SONG_LIST});

      let newState = {...oldState.songList};

      newState.name = playlistName;

      newState = Object.assign({}, oldState, {songList: newState});

      client.writeQuery({query: GET_SONG_LIST, data: newState});
    }
  };

  render() {
    const {pageError, pageErrorMsg, playlistName} = this.state;
    return (
      <CustomMutation
        mutation={SAVE_SONGLIST_TO_DB}
        refetchQueries={() => [{query: GET_USER_INFO}]}
      >
        {(savePlaylistMutation, {data: mutationData}) => (
          <CustomQuery query={GET_SONG_LIST}>
            {(data, client) => {
              const songListCount = data.songList.list.length;

              return (
                <div>
                  <Header
                    client={client}
                    songListCount={songListCount}
                    onSubmit={this.handleSubmit}
                    onBlur={this.resetInput}
                    onClick={this.clearInput}
                    onChange={this.handleChange}
                    playlistName={playlistName}
                  />

                  <SaveButton
                    songListCount={songListCount}
                    savePlaylistToDB={savePlaylistToDB}
                    savePlaylistMutation={savePlaylistMutation}
                    client={client}
                  />

                  <EditorView
                    queryData={data}
                    mutationData={mutationData}
                    pageError={pageError}
                    pageErrorMsg={pageErrorMsg}
                  />
                </div>
              );
            }}
          </CustomQuery>
        )}
      </CustomMutation>
    );
  }
}

export default SavePlaylist;
