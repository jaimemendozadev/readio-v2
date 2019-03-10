require('dotenv').config();

const {app, server} = require('./server');

const port = process.env.PORT || 3000;

app.listen({port}, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`),
);
