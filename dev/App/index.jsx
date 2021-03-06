import styles from '../sass/index.scss';
import React from 'react';
import {LandingPage, LoginPage, Main} from './Pages/index.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import client from './Apollo/index.jsx';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/main" component={Main} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
