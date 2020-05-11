const { gql } = require('apollo-server-express');
const urlTvSeries = 'http://localhost:3003/tvseries';
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
    type TvSeries {
        _id: ID!,
        title: String!,
        overview: String!,
        poster_path: String!,
        popularity: Float!,
        tags: [String]!,
    }

    extend type Query {
        getTvSeries: [TvSeries],
        getATvSeries(
            id: ID!
        ): TvSeries,
    }
    
    extend type Mutation {
        createTvSeries(
            title: String!,
            overview: String!,
            poster_path: String!,
            popularity: Float!,
            tags: [String]!,
        ): TvSeries,
        updateTvSeries(
            id: ID!,
            title: String!,
            overview: String!,
            poster_path: String!,
            popularity: Float!,
            tags: [String]!,
        ): TvSeries,
        deleteTvSeries(
            id: ID!
        ): Delete_Response,
    }
`;

const resolvers = {
    Query: {
        getTvSeries: async (parent, args, context, info) => {
            try {
                const tvseries = JSON.parse(await redis.get('tvseries'));
                if (tvseries) return tvseries;

                const { data } = await axios({
                    url: urlTvSeries,
                    method: 'GET'
                })
                redis.set('tvseries', JSON.stringify(data));
                return data;
            } catch (error) {
                return { error };
            }
        },
        getATvSeries: async (parent, args, context, info) => {
            try {
                let { id } = args;
                const tvseries = JSON.parse(await redis.get('tvseries'))
                if (tvseries && tvseries.length !== 0) return tvseries.find(atvseries => atvseries._id === id);
                const { data } = await axios({
                    url: `${urlTvSeries}/${id}`,
                    method: 'GET'
                })
                redis.set('tvseries', JSON.stringify(data));
                return data;
            } catch (error) {
                return { error };
            }
        },
    },
    Mutation: {
        createTvSeries: async (parent, args, context, info) => {
            try {
                let form = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                };
                const { data } = await axios({
                    url: urlTvSeries,
                    method: 'POST',
                    data: form
                })
                const tvseries = JSON.parse(await redis.get('tvseries'));
                if (tvseries) {
                    tvseries.push(...data.ops);
                    redis.set('tvseries', JSON.stringify(tvseries));
                } else {
                    redis.set('tvseries', JSON.stringify(data.ops));
                }
                return data.ops[0];
            } catch (error) {
                return { error };
            }
        },
        updateTvSeries: async (parent, args, context, info) => {
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
                    url: `${urlTvSeries}/${id}`,
                    method: 'PUT',
                    data: form
                })
                let tvseries = JSON.parse(await redis.get('tvseries'));
                if (tvseries) {
                    let index = tvseries.findIndex(atvseries => atvseries._id === id);
                    tvseries[index].title = form.title;
                    tvseries[index].overview = form.overview;
                    tvseries[index].poster_path = form.poster_path;
                    tvseries[index].popularity = form.popularity;
                    tvseries[index].tags = form.tags;
                    redis.set('tvseries', JSON.stringify(tvseries));
                }
                form._id = id;
                return form;
            } catch (error) {
                return { error };
            }
        },
        deleteTvSeries: async (parent, args, context, info) => {
            try {
                let { id } = args;
                const { data } = await axios({
                    url: `${urlTvSeries}/${id}`,
                    method: 'DELETE'
                })
                let tvseries = JSON.parse(await redis.get('tvseries'));
                if (tvseries) {
                    redis.set('tvseries', JSON.stringify(tvseries.filter(atvseries => atvseries._id !== id)));
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