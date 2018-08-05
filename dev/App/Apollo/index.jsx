import ApolloClient from 'apollo-boost';
import { defaults, resolvers, typeDefs } from './API/index.jsx';


//clientState part of apollo-link-state in apollo-boost
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    clientState: {
        defaults,
        resolvers,
        typeDefs
    },

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