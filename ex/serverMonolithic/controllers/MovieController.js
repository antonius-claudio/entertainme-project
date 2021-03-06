const Movie = require('../models/movie');

class MovieController {
    static find(req, res, next) {
        Movie.find()
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
        Movie.findById(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }

    static create(req, res, next) {
        let form = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.overview,
            popularity: Number(req.body.popularity),
            tags: req.body.tags.trim().split(',')
        };
        Movie.create(form)
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
        let form = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.overview,
            popularity: Number(req.body.popularity),
            tags: req.body.tags.trim().split(',')
        };
        Movie.update(id, form)
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
        Movie.delete(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
}

module.exports = MovieController;