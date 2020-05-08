const TvSeries = require('../models/tvseries');

class TvSeriesController {
    static find(req, res, next) {
        TvSeries.find()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
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
                res.status(500).json(err);
            });
    }

    static create(req, res, next) {
        console.log('object')
        let form = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: req.body.tags
        };
        TvSeries.create(form)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static update(req, res, next) {
        let { id } = req.params;
        let form = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tags: req.body.tags
        };
        TvSeries.update(id, form)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
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
                res.status(500).json(err);
            });
    }
}

module.exports = TvSeriesController;