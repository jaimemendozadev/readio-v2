import React from 'react';
import {Link} from 'react-router-dom';


const LandingPage = () => (
  <div>
    <header>
      <div className="main-header">
        <h1>Read.io - Personalized Music Just For You</h1>
        
        <div className="btn-container">
          <Link className="link-btn" to="/login">Sign Up / Login</Link>
          {/* <button className="link-btn" to="/login">Sign Up / Login</button> */}
        </div>
      </div>
    </header>
  </div>
)

export default LandingPage;