import React, {Component} from 'react';
import Login from '../../Components/Login.jsx';
import {Redirect} from 'react-router-dom';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  checkForToken(search) {
    let token = search.slice(7);

    console.log('token received from Server inside LoginPage ', token);

    if (token) {
      localStorage.setItem('token', token);

      return <Redirect to={{pathname: '/main'}} />;
    }
  }

  render() {
    const {search} = this.props.location;

    if (search) {
      return this.checkForToken(search);
    } else {
      return <Login heading={`Sign Up / Login`} />;
    }
  }
}

export default LoginPage;
