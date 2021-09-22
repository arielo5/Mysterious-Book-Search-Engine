const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

async function startApolloServer(typeDefs, resolvers){
  const server = new ApolloServer({typeDefs, resolvers, context: authMiddleware,})
  // const app = express();
  await server.start();
  server.applyMiddleware({app, path: '/graphql'});
  
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


