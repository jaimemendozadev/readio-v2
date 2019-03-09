import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Spinner from './Spinner.jsx';

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingAuthentication: true,
      authenticated: false,
    };
  }

  checkForToken = () => {
    let token = localStorage.getItem('token');

    console.log('token inside checkForToken for ProtectedRoute ', token);

    if (token) {
      this.setState({
        authenticated: true,
        checkingAuthentication: false,
      });
    } else {
      this.setState({
        checkingAuthentication: false,
      });
    }
  };

  componentDidMount() {
    this.checkForToken();
  }

  render() {
    const {authenticated, checkingAuthentication} = this.state;

    if (!checkingAuthentication) {
      if (authenticated) {
        const {component: Component, ...rest} = this.props;

        return <Route {...rest} render={props => <Component {...props} />} />;
      } else {
        return <Redirect to={{pathname: '/login'}} />;
      }
    }

    return (
      <div>
        <h1>Checking Authentication...</h1>
        <Spinner />
      </div>
    );
  }
}

export default ProtectedRoute;
