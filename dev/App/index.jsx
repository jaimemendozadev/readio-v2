import styles from '../sass/main.scss';
import React from 'react';
import {LandingPage, LoginPage, Home} from './Pages/index.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});


const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/home" component={Home} />
        {/* <Route path="/home" component={Home} /> */}
        
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
)

export default App;