import ApolloClient from 'apollo-boost';
import {defaults} from './API/defaults/index.js';
import {resolvers} from './API/resolvers/index.js';
import {typeDefs} from './API/typeDefs/index.js';

const client = new ApolloClient({
  uri: '/graphql',
  clientState: {
    resolvers,
    defaults,
    typeDefs,
  },
  request: async operation => {
    const token = localStorage.getItem('token');

    console.log('token attached to FE graphQL request ', token);
    operation.setContext({
      headers: {
        authorization: token ? `bearer ${token}` : '',
      },
    });
  },
});

export default client;
