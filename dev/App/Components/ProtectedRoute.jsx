import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

class ProtectedRoute extends Component {
  constructor(props){ 
    super(props);
    this.state = {
      authenticated: false
    }
    this.checkForToken = this.checkForToken.bind(this);
  } 

  checkForToken(){
    let token = localStorage.getItem('token');

    if(token) {
      this.setState({
        authenticated: true
      });
    }
  }

  componentDidMount(){
    this.checkForToken();
  }

  render(){
    this.checkForToken();  
    const {authenticated} = this.state; 
    
    if(authenticated){

      const {component: Component, ...rest} = this.props;
     
      return <Route {...rest} render={(props) => <Component {...props}/> } />

    } else {
      return <Redirect to={{pathname: "/login"}} />
    }
    
  }
}

export default ProtectedRoute;