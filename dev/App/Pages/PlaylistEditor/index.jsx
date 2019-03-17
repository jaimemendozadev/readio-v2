import React, {Component} from 'react';
import EditorContainer from './EditorContainer.jsx';
import CustomMutation from '../../Components/CustomMutation.jsx';
import CustomQuery from '../../Components/CustomQuery.jsx';
import PlaylistView from '../PlaylistView/index.jsx';
import UpdatePanel from './UpdatePanel.jsx';
import {
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_USER_INFO,
  GET_LOCAL_USER_INFO,
} from '../../Apollo/API/graphql/index.js';

const defaultState = {
  currentView: 'Edit Playlist',
  selectedPlaylist: {},
};

class PlaylistEditor extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  sendToHomeView = () => {
    const {viewSwitchCB} = this.props;
    viewSwitchCB('Home');
  };

  selectPlaylistToEdit = playlist => {
    const selectedPlaylist = {
      playlistToEdit: playlist,
      playlistID: playlist.id,
      playlistName: playlist.name,
      playlistSongs: playlist.songs,
    };

    this.setState({
      selectedPlaylist,
      currentView: 'Song View',
    });
  };

  deleteSongFromPlaylist = playlistSong => {
    const {playlistSongs} = this.state;

    const {id_user_id_identifier} = playlistSong;

    const filteredList = playlistSongs.filter(
      song => song.id_user_id_identifier != id_user_id_identifier,
    );

    this.setState({
      playlistSongs: filteredList,
    });
  };

  handleSongViewRendering = (updateResponse, deleteResponse, playlistSongs) => {
    if (updateResponse) {
      return <h1>{updateResponse.updatePlaylist.message}</h1>;
    }

    if (deleteResponse) {
      return <h1>{deleteResponse.deletePlaylist.message}</h1>;
    }

    return (
      <SongView
        PROP_MUTATION={null}
        songInput={playlistSongs}
        callback={this.deleteSongFromPlaylist}
        assetType={'trash'}
        searchView={false}
        hasOneSong={playlistSongs.length == 1 ? true : false}
      />
    );
  };

  render() {
    console.log('this.props on PlaylistEditor render ', this.props);
    console.log('this.state on PlaylistEditor render ', this.state);

    // On first render, we use currentUser from props
    const {currentUser} = this.props;

    const {currentView} = this.state;

    return (
      <CustomQuery
        query={GET_LOCAL_USER_INFO}
        onCompleted={data => console.log('data from query on complete ', data)}
      >
        {({currentUser}) => (
          <CustomMutation
            mutation={UPDATE_PLAYLIST}
            refetchQueries={() => [{query: GET_USER_INFO}]}
          >
            {(updatePlaylistMutation, {data: updatePlaylistResponse}) => (
              <CustomMutation
                mutation={DELETE_PLAYLIST}
                refetchQueries={() => [{query: GET_USER_INFO}]}
              >
                {(deletePlaylistMutation, {data: deletePlaylistResponse}) => {
                  const mutationsProps = {
                    delete: deletePlaylistMutation,
                    update: updatePlaylistMutation,
                  };

                  if (currentView == 'Edit Playlist') {
                    return (
                      <EditorContainer>
                        <PlaylistView
                          propMutation={null}
                          varObjKey={null}
                          playlists={currentUser.playlists}
                          callback={this.selectPlaylistToEdit}
                        />
                      </EditorContainer>
                    );
                  }

                  if (currentView == 'Song View') {
                    const {selectedPlaylist} = this.state;

                    return (
                      <EditorContainer>
                        <UpdatePanel
                          currentUser={currentUser}
                          selectedPlaylist={selectedPlaylist}
                          mutationsProp={mutationsProps}
                          sendToHomeView={this.sendToHomeView}
                        />

                        {this.handleSongViewRendering(
                          updatePlaylistResponse,
                          deletePlaylistResponse,
                          selectedPlaylist.playlistSongs,
                        )}
                      </EditorContainer>
                    );
                  }
                }}
              </CustomMutation>
            )}
          </CustomMutation>
        )}
      </CustomQuery>
    );
  }
}

export default PlaylistEditor;
