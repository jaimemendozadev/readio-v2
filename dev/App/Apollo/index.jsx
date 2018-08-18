import ApolloClient from 'apollo-boost';
import { defaults } from './API/DefaultState/index.jsx';
import { resolvers } from './API/Resolvers/index.jsx';
import { typeDefs } from './API/Typedefs/index.jsx';


//clientState part of apollo-link-state in apollo-boost
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    clientState: {
        resolvers,
        defaults,
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