const express = require('express');
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const movieSchema = require('./schemas/movieSchema');
const tvSeriesSchema = require('./schemas/tvSeriesSchema');
const PORT = process.env.PORT || 3001;
// const entertainMeSchema = require('./schemas/entertainMeSchema')

const schema = makeExecutableSchema({
  typeDefs: [movieSchema.typeDefs, tvSeriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers],
});

const server = new ApolloServer({
  schema,
});
const app = express();
server.applyMiddleware({ app });

// server.listen().then(({url}) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

app.listen({ port: PORT }, () =>
  console.log('Now browse to http://localhost:3001' + server.graphqlPath)
);