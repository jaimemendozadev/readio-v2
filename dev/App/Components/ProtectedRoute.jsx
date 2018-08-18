import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

class ProtectedRoute extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      checkingAuthentication: true,  
      authenticated: false
    }
  } 

  checkForToken = () => {
    let token = localStorage.getItem('token');

    if(token) {
      this.setState({
        authenticated: true,
        checkingAuthentication: false
      });
    } else {
      //At this point, the token was never set, redirect to login
      this.setState({
        checkingAuthentication: false
      });
    }
  }

  componentDidMount(){
    //on CDM, checkForToken
    this.checkForToken();
  }

  render(){
     
    const {authenticated, checkingAuthentication} = this.state; 
    
    //Create checkingAuthentication to prevent immediate redirect
    if(!checkingAuthentication){
      if(authenticated) {    
        const {component: Component, ...rest} = this.props;
           
        return <Route {...rest} render={(props) => <Component {...props}/> } />    
      } else {
        return <Redirect to={{pathname: "/login"}} />
      }
    }
    
    //Return feedback for user
    return <h1>Checking Authentication...</h1>
  }
}

export default ProtectedRoute;