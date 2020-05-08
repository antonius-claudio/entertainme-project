const { gql } = require('apollo-server');

const typeDefs = gql`
    type Movie {
        id: ID!,
        title: String!,
        overview: String!,
        poster_path: String!,
        popularity: Double!,
        tags: Array!,
    }
    type TvSeries {
        id: ID!,
        title: String!,
        overview: String!,
        poster_path: String!,
        popularity: Double!,
        tags: Array!,
    }
`;