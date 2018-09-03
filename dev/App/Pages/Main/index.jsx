import React, { Component } from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { GET_CURRENTLY_PLAYING_SONG, GET_LOCAL_USER_INFO } from "./graphql";
import ReactPlayer from "react-player";
import Home from "../Home/index.jsx";
import Search from "../Search/index.jsx";
import SavePlaylist from "../SavePlaylist/index.jsx";
import NavSidebar from "./NavSidebar.jsx";
import PlaylistEditor from "../PlaylistEditor/index.jsx";
import CustomQuery from "../../Components/CustomQuery.jsx";

const defaultState = {
  currentUser: {},
  currentSong: "https://soundcloud.com/john-dollar-1/alesso-years-original-mix",
  currentView: "Home"
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  viewSwitch = view => {
    this.setState({
      currentView: view
    });
  };

  logError = error => {
    if (error) {
      console.log(
        "There was an error for GET_CURRENTLY_PLAYING_SONG query ",
        error
      );
    }
  };

  renderCurrentView = currentlyPlaying => {
    const { currentView } = this.state;

    if (currentView == "Log Out") {
      localStorage.clear();
      return <Redirect to={{ pathname: "/" }} />;
    }

    if (currentView == "Home") {
      return <Home />;
    }

    if (currentView == "Search") {
      return <Search />;
    }

    if (currentView == "Save Playlist") {
      return <SavePlaylist />;
    }

    if (currentView == "Playlist Editor") {
      return (
        <CustomQuery query={GET_LOCAL_USER_INFO}>
          {data => {
            return <PlaylistEditor currentUser={data.currentUser} />;
          }}
        </CustomQuery>
      );
    }

    

    return null;
  };

  render() {
    const { currentSong, currentView } = this.state;
    return (
      <Query query={GET_CURRENTLY_PLAYING_SONG}>
        {({ data, loading, error }) => {
          console.log("CURRENTLY_PLYAING_SONG inside Main is ", data);

          if (error) {
            this.logError(error);
          }

          const { currentlyPlaying } = data;

          return (
            <div className="page-container">
              <NavSidebar callback={this.viewSwitch} />

              <div
                className={
                  currentView == "Save Playlist"
                    ? "save-playlist-editor-main"
                    : "main-content"
                }
              >
                {this.renderCurrentView(currentlyPlaying)}

                <div className="react-player">
                  <ReactPlayer
                    url={
                      currentlyPlaying
                        ? currentlyPlaying.currentSong
                        : currentSong
                    }
                    playing={
                      currentlyPlaying ? currentlyPlaying.playing : false
                    }
                    width="100%"
                    height="20%"
                    config={{
                      soundcloud: {
                        options: {
                          color: "#55728C"
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Main;
