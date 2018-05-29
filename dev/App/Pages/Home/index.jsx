import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Home extends Component {
  constructor(props){
    super(props);
  }


  render(){
    return (
      <div className="home-container">
        <div className="side-bar">
          <nav>
             <Link className="side-bar-link" to="/home">Home</Link>
             <Link className="side-bar-link" to="/search">Search</Link>
          </nav>
        </div>

        <div className="main-content">
          <h1>Read.io - Home Page</h1>
        </div>
        
      </div>
    )
  }
}

export default Home;