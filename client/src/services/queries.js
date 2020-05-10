import { gql } from "apollo-boost"

export const GET_ALL = gql`
    {
        getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        },
        getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

export const GET_MOVIES = gql`
    {
        getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

export const GET_TVSERIES = gql`
    {
        getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`;

export const GET_MOVIE = gql`
query getMovie($id: ID!) {
    getMovie(id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
}
`;

export const CREATE_MOVIE = gql`
    mutation createMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String]!) {
        createMovie(title: $title,
            overview: $overview,
            poster_path: $poster_path,
            popularity: $popularity,
            tags: $tags) {
            _id,
            title,
            overview,
            poster_path,
            popularity,
            tags
        }
    }
`;