import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_CURRENTLY_PLYAING_SONG } from "./graphql";
import ReactPlayer from "react-player";
import Home from "../Home/index.jsx";
import Search from "../Search/index.jsx";
import PlaylistEditor from "../PlaylistEditor/index.jsx";

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

  returnQueryResults = (data, loading, error, dataType) => {
    const { currentSong } = this.state;
    if (loading) {
      return dataType == "currentSong" ? currentSong : false;
    }

    if (error) {
      console.log(
        "There was an error with GET_CURRENTLY_PLYAING_SONG query ",
        error
      );
      return dataType == "currentSong" ? currentSong : false;
    }

    return data.currentlyPlaying[dataType];
  };

  renderCurrentView = () => {
    const { currentView } = this.state;

    if (currentView == "Home") {
      return <Home />;
    }

    if (currentView == "Search") {
      return <Search />;
    }

    if (currentView == "Playlist Editor") {
      return <PlaylistEditor />;
    }

    return null;
  };

  render() {
    const { currentSong } = this.state;
    return (
      <Query query={GET_CURRENTLY_PLYAING_SONG}>
        {({ data, loading, error }) => {
          console.log("data inside Main is ", data);
          return (
            <div className="page-container">
              <div className="side-bar">
                <nav>
                  <div
                    onClick={() => this.viewSwitch("Home")}
                    className="side-bar-link"
                  >
                    Home
                  </div>
                  <div
                    onClick={() => this.viewSwitch("Search")}
                    className="side-bar-link"
                  >
                    Search
                  </div>
                  <div
                    onClick={() => this.viewSwitch("Playlist Editor")}
                    className="side-bar-link"
                  >
                    Playlist Editor
                  </div>
                </nav>
              </div>

              <div className="main-content">
                {this.renderCurrentView()}

                <div className="react-player">
                  <ReactPlayer
                    url={data ? data.currentlyPlaying.currentSong : currentSong}
                    playing={data ? data.currentlyPlaying.playing : false}
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
