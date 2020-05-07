const TvSeries = require('../models/tvseries');

class TvSeriesController {
    static find(req, res, next) {
        TvSeries.find()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

    static findById(req, res, next) {
        let { id } = req.params;
        TvSeries.findById(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

    static create(req, res, next) {
        let {
            title,
            overview,
            poster_path,
            popularity,
            tags
        } = req.body;
        TvSeries.create({title, overview, poster_path, popularity, tags})
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

    static update(req, res, next) {
        let { id } = req.params;
        let {
            title,
            overview,
            poster_path,
            popularity,
            tags
        } = req.body;
        TvSeries.update(id, {title, overview, poster_path, popularity, tags})
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

    static delete(req, res, next) {
        let { id } = req.params;
        TvSeries.delete(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}

module.exports = TvSeriesController;