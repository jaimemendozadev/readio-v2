import React from 'react';
import {LandingPage, LoginPage, Home} from './Pages/index.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import styles from '../sass/main.scss';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';


const App = () => (
  <BrowserRouter>
    <Switch>
      {/* <ProtectedRoute component={Home} /> */}
      <Route path="/home" component={Home} />
      
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>
)

export default App;