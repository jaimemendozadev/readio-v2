import React from 'react';
import {LandingPage, Login} from './Pages/index.jsx';

import styles from '../sass/main.scss';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>
)

export default App;