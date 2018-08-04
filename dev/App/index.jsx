import styles from '../sass/main.scss';
import React from 'react';
import { LandingPage, LoginPage, Home, Search } from './Pages/index.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/search" component={Search} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)

export default App;