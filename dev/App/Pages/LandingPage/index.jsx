import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

const defaultState = {
  authenticated: false
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  checkForToken = () => {
    let token = localStorage.getItem("token");

    if (token) {
      this.setState({
        authenticated: true
      });
    }
  };

  componentDidMount() {
    this.checkForToken();
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <header>
          <div className="main-header">
            <h1>Read.io - Personalized Music Just For You</h1>

            {authenticated ? <Redirect to={{ pathname: "/main" }} /> : ""}

            <div className="btn-container">
              <Link className="link-btn" to="/login">
                Sign Up / Login
              </Link>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default LandingPage;
