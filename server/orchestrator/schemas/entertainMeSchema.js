const { gql } = require('apollo-server');
const urlMovies = 'http://localhost:3002/movies';
const urlTvSeries = 'http://localhost:3003/tvseries';
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
    type Movie {
        _id: ID!,
        title: String!,
        overview: String!,
        poster_path: String!,
        popularity: Float!,
        tags: [String]!,
    }
    type TvSeries {
        _id: ID!,
        title: String!,
        overview: String!,
        poster_path: String!,
        popularity: Float!,
        tags: [String]!,
    }

    type Query {
        getMoviesTvSeries: {[Movies], [TvSeries]},
    }
`;

const resolvers = {
    Query: {
        getMoviesTvSeries: async (parent, args, context, info) => {
            try {
                const movies = JSON.parse(await redis.get('movies'));
                const tvseries = JSON.parse(await redis.get('tvseries'));
                let tempMovies = [];
                let tempTvSeries = [];
                if (!movies) {
                    const { data } = await axios({
                        url: urlMovies,
                        method: 'GET'
                    })
                    redis.set('movies', JSON.stringify(data));
                    tempMovies = data;
                } else {
                    tempMovies = movies;
                }
                if (!tvseries) {
                    const { data } = await axios({
                        url: urlTvSeries,
                        method: 'GET'
                    })
                    redis.set('movies', JSON.stringify(data));
                    tempTvSeries = data;
                } else {
                    tempTvSeries = tvseries;
                }
                return {
                    movies: tempMovies,
                    tvSeries: tempTvSeries
                }
            } catch (error) {
                return {error};
            }
        },
    },
};

module.exports = {
    typeDefs,
    resolvers,
};