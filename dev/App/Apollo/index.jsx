import ApolloClient from 'apollo-boost';
import { defaults } from './Resolvers/index.jsx';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',

    request: async (operation) => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token ? `bearer ${token}` : "",
            }
        });
    },
});

export default client;