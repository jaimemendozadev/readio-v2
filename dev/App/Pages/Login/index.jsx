import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
  }

  handleAuthSubmit(event) {
    console.log('event ', event.target)

  }

  render(){
    return(
      <div className="form-container">
        <form>
          <h1>Sign Up / Login</h1>
          <button className="fb">Continue with Facebook</button>
          <button>Continue with Google</button>
        </form>
      </div>
      

    )    
  }


}

export default Login;