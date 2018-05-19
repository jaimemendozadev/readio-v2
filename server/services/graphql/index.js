const {makeExecutableSchema} = require('graphql-tools');

//create baseSchema
const baseSchema = `
  schema {
    query: Query,
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [],
  resolvers: {}
});

module.exports = schema;