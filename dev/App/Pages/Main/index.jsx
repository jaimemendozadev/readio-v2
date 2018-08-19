import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_USER_INFO } from "./graphql";
import ReactPlayer from "react-player";
import Home from "../Home/index.jsx";
import Search from "../Search/index.jsx";
import PlaylistEditor from "../PlaylistEditor/index.jsx";

const defaultState = {
  currentUser: {},
  currentView: "Home",
  url: "https://soundcloud.com/john-dollar-1/alesso-years-original-mix",
  playing: false
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

  renderCurrentView = () => {
    const { currentView } = this.state;

    if (currentView == "Home") {
      return <Home />;
    }

    if (currentView == "Search") {
      return <Search />;
    }

    if (currentView == 'Playlist Editor') {
      return <PlaylistEditor />;
    }

    return null;
  };

  render() {
    const { playing, url } = this.state;
    return (
      <Query query={GET_USER_INFO}>
        {({ data, loading, error, client }) => {
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
                    url={url}
                    playing={playing}
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
