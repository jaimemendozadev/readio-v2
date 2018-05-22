const {makeExecutableSchema} = require('graphql-tools');



//we need to tell the server which types represent the root query
//and root mutation types. We call them RootQuery and RootMutation by convention.
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [baseSchema],
  resolvers: {}
});

module.exports = schema;