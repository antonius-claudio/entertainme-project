const axios = require('axios');
const url = 'http://localhost:3001/movies';
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
    static async find(req, res, next) {
        // nda pake cache
        // const { data } = await axios({
        //     url,
        //     method: 'GET'
        // })
        // res.status(200).json(data);

        // cache
        try {
            const movies = JSON.parse(await redis.get('movies'));
            if (movies) {
                res.status(200).json(movies);
            } else {
                const { data } = await axios({
                    url,
                    method: 'GET'
                })
                res.status(200).json(data);
                redis.set('movies', JSON.stringify(data));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async findById(req, res, next) {
        let { id } = req.params;
        // axios({
        //     url: `${url}/${id}`,
        //     method: 'GET'
        // })
        //     .then(({data}) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     });

        try {
            const movies = JSON.parse(await redis.get('movies'))
            if (movies) {
                let temp = movies.find(movie => movie._id === id);
                res.status(200).json(temp);
            } else {
                const { data } = await axios({
                    url: `${url}/${id}`,
                    method: 'GET'
                })
                res.status(200).json(data);
                redis.set('movies', JSON.stringify(data));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async create(req, res, next) {
        // axios({
        //     url,
        //     method: 'POST',
        //     data: req.body
        // })
        //     .then(({data}) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     });

        try {
            const { data } = await axios({
                url,
                method: 'POST',
                data: req.body
            })
            res.status(200).json(...data.ops);
            const movies = JSON.parse(await redis.get('movies'));
            if (movies) {
                movies.push(...data.ops);
                redis.set('movies', JSON.stringify(movies));
            } else {
                redis.set('movies', JSON.stringify(data.ops));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async update(req, res, next) {
        let { id } = req.params;
        // axios({
        //     url: `${url}/${id}`,
        //     method: 'PUT',
        //     data: req.body
        // })
        //     .then(({data}) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     });

        try {
            const { data } = await axios({
                url: `${url}/${id}`,
                method: 'PUT',
                data: req.body
            })
            res.status(200).json(data);
            const movies = JSON.parse(await redis.get('movies'));
            if (movies) {
                let index = movies.findIndex(movie => movie._id === id);
                movies[index].title = req.body.title;
                movies[index].overview = req.body.overview;
                movies[index].poster_path = req.body.poster_path;
                movies[index].popularity = req.body.popularity;
                movies[index].tags = req.body.tags;
                redis.set('movies', JSON.stringify(movies));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static async delete(req, res, next) {
        let { id } = req.params;
        // axios({
        //     url: `${url}/${id}`,
        //     method: 'DELETE'
        // })
        //     .then(({data}) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     });

        try {
            const { data } = await axios({
                url: `${url}/${id}`,
                method: 'DELETE'
            })
            res.status(200).json(data);
            const movies = JSON.parse(await redis.get('movies'));
            if (movies) {
                redis.set('movies', JSON.stringify(movies.filter(movie => movie._id !== id)));
            }
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = MovieController;