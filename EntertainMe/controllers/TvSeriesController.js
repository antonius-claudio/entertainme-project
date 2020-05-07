const axios = require('axios');
const url = 'http://localhost:3002/tvseries';
const Redis = require("ioredis");
const redis = new Redis();

class TvSeriesController {
    static find(req, res, next) {
        // axios({
        //     url,
        //     method: 'GET'
        // })
        //     .then(({data}) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     });
        
        try {
            const tvseries = JSON.parse(await redis.get('tvseries'));
            if (tvseries) {
                res.status(200).json(tvseries);
            } else {
                const { data } = await axios({
                    url,
                    method: 'GET'
                })
                res.status(200).json(data);
                redis.set('tvseries', JSON.stringify(data));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static findById(req, res, next) {
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
            const tvseries = JSON.parse(await redis.get('tvseries'))
            if (tvseries) {
                let temp = tvseries.find(movie => movie._id === id);
                res.status(200).json(temp);
            } else {
                const { data } = await axios({
                    url: `${url}/${id}`,
                    method: 'GET'
                })
                res.status(200).json(data);
                redis.set('tvseries', JSON.stringify(data));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static create(req, res, next) {
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
            const tvseries = JSON.parse(await redis.get('tvseries'));
            if (tvseries) {
                tvseries.push(...data.ops);
                redis.set('tvseries', JSON.stringify(tvseries));
            } else {
                redis.set('tvseries', JSON.stringify(data.ops));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static update(req, res, next) {
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
            const tvseries = JSON.parse(await redis.get('tvseries'));
            if (tvseries) {
                let index = tvseries.findIndex(movie => movie._id === id);
                tvseries[index].title = req.body.title;
                tvseries[index].overview = req.body.overview;
                tvseries[index].poster_path = req.body.poster_path;
                tvseries[index].popularity = req.body.popularity;
                tvseries[index].tags = req.body.tags;
                redis.set('tvseries', JSON.stringify(tvseries));
            }
        } catch (error) {
            res.send(error);
        }
    }

    static delete(req, res, next) {
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
            const tvseries = JSON.parse(await redis.get('tvseries'));
            if (tvseries) {
                redis.set('tvseries', JSON.stringify(tvseries.filter(movie => movie._id !== id)));
            }
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = TvSeriesController;