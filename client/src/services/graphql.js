import ApolloClient from 'apollo-boost';
import { GET_FAVORITES } from './queries';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    clientState: {
        resolvers: {
            Mutation: {
                addFavorites: (_, variables, client) => {
                    let { favorites } = client.cache.readQuery({query: GET_FAVORITES});
                    const movie = {
                        _id: variables._id,
                        title: variables.title,
                        overview: variables.overview,
                        poster_path: variables.poster_path,
                        popularity: variables.popularity,
                        tags: variables.tags,
                        __typename: 'favorites'
                    };
                    favorites = [...favorites, movie];
                    client.cache.writeData({
                        data: {
                            favorites
                        }
                    })
                }
            }
        },
        defaults: {
            favorites: [],
        }
    },
})

export default client;