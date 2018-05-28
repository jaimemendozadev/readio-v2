import React, {Component} from 'react';
import Login from '../../Components/Login.jsx';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


class LoginPage extends Component {
  constructor(props){
    super(props);
  }

  checkForToken(search){
    let token = search.slice(7);

    if(token) {
      localStorage.setItem('token', token);
        
      return <Redirect to={{pathname: "/home"}} />
    }
  }

  render(){
    const {search} = this.props.location;
    
    if (search) {
      return this.checkForToken(search);  
    
    } else {
      return <Login />
    }
  }
}

export default LoginPage;