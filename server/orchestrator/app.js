const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const movieSchema = require('./schemas/movieSchema');
// const tvSeriesSchema = require('./schemas/tvSeriesSchema');
// const entertainMeSchema = require('./schemas/entertainMeSchema')

// const typeDefs = `
//   type Query
//   type Mutation
// `;

const schema = makeExecutableSchema({
  typeDefs: [movieSchema.typeDefs],
//   typeDefs: [movieSchema.typeDefs, tvSeriesSchema.typeDefs, entertainMeSchema],
  resolvers: [movieSchema.resolvers],
//   resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers, entertainMeSchema.resolvers],
});

const server = new ApolloServer({
  schema,
});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
