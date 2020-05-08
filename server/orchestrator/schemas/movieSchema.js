const { gql } = require('apollo-server');
const url = 'http://localhost:3002/movies';
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

    type Delete_Response {
        deletedCount: Int!,
        ok: Int!,
    }

    input InputMovie {
        title: String!,
        overview: String!,
        poster_path: String!,
        popularity: Float!,
        tags: [String]!,
    }

    type Query {
        getMovies: [Movie],
        getMovie(
            id: ID!
        ): Movie,
    }
    
    type Mutation {
        createMovie(
            title: String!,
            overview: String!,
            poster_path: String!,
            popularity: Float!,
            tags: [String]!,
        ): Movie,
        updateMovie(
            id: ID!,
            title: String!,
            overview: String!,
            poster_path: String!,
            popularity: Float!,
            tags: [String]!,
        ): Movie,
        deleteMovie(
            id: ID!
        ): Delete_Response,
    }
`;

const resolvers = {
    Query: {
        getMovies: async (parent, args, context, info) => {
            try {
                const movies = JSON.parse(await redis.get('movies'));
                if (movies) return movies;

                const { data } = await axios({
                    url,
                    method: 'GET'
                })
                redis.set('movies', JSON.stringify(data));
                return data;
            } catch (error) {
                return { error };
            }
        },
        getMovie: async (parent, args, context, info) => {
            try {
                let { id } = args;
                const movies = JSON.parse(await redis.get('movies'))
                if (movies && movies.length !== 0) return movies.find(movie => movie._id === id);
                const { data } = await axios({
                    url: `${url}/${id}`,
                    method: 'GET'
                })
                redis.set('movies', JSON.stringify(data));
                return data;
            } catch (error) {
                return { error };
            }
        },
    },
    Mutation: {
        createMovie: async (parent, args, context, info) => {
            try {
                let form = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                };
                const { data } = await axios({
                    url,
                    method: 'POST',
                    data: form
                })
                const movies = JSON.parse(await redis.get('movies'));
                if (movies) {
                    movies.push(...data.ops);
                    redis.set('movies', JSON.stringify(movies));
                } else {
                    redis.set('movies', JSON.stringify(data.ops));
                }
                return data.ops[0];
            } catch (error) {
                return { error };
            }
        },
        updateMovie: async (parent, args, context, info) => {
            try {
                let { id } = args;
                let form = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                };
                const { data } = await axios({
                    url: `${url}/${id}`,
                    method: 'PUT',
                    data: form
                })
                let movies = JSON.parse(await redis.get('movies'));
                if (movies) {
                    let index = movies.findIndex(movie => movie._id === id);
                    movies[index].title = form.title;
                    movies[index].overview = form.overview;
                    movies[index].poster_path = form.poster_path;
                    movies[index].popularity = form.popularity;
                    movies[index].tags = form.tags;
                    redis.set('movies', JSON.stringify(movies));
                }
                form._id = id;
                return form;
            } catch (error) {
                return { error };
            }
        },
        deleteMovie: async (parent, args, context, info) => {
            try {
                let { id } = args;
                const { data } = await axios({
                    url: `${url}/${id}`,
                    method: 'DELETE'
                })
                let movies = JSON.parse(await redis.get('movies'));
                if (movies) {
                    redis.set('movies', JSON.stringify(movies.filter(movie => movie._id !== id)));
                }
                return data;
            } catch (error) {
                return { error };
            }
        },
    }
};

module.exports = {
    typeDefs,
    resolvers,
};