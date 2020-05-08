const axios = require('axios');
const urlMovies = 'http://localhost:3001/movies';
const urlTvSeries = 'http://localhost:3002/tvseries';
const Redis = require("ioredis");
const redis = new Redis();

class Controller {
    static async getAll(req, res, next) {
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
            res.status(200).json({
                movies: tempMovies,
                tvSeries: tempTvSeries
            })
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Controller;