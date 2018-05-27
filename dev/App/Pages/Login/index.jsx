import React, {Component} from 'react';
import axios from 'axios';
const baseURL = 'http://localhost:3000/api/login';

class Login extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="form-container">
        <form>
          <h1>Sign Up / Login</h1>
          
          <a href={`${baseURL}/facebook`} onClick={this.handleAuthSubmit} className="facebook">Continue with Facebook</a>

          <a href={`${baseURL}/google`} onClick={this.handleAuthSubmit} className="google">Continue with Google</a>

        </form>
      </div>
      

    )    
  }


}

export default Login;