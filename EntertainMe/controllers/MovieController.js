const axios = require('axios');
const url = 'http://localhost:3001/movies'

class MovieController {
    static find(req, res, next) {
        axios({
            url,
            method: 'GET'
        })
            .then(({data}) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static findById(req, res, next) {
        let { id } = req.params;
        axios({
            url: `${url}/${id}`,
            method: 'GET'
        })
            .then(({data}) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static create(req, res, next) {
        axios({
            url,
            method: 'POST',
            data: req.body
        })
            .then(({data}) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static update(req, res, next) {
        let { id } = req.params;
        axios({
            url: `${url}/${id}`,
            method: 'PUT',
            data: req.body
        })
            .then(({data}) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static delete(req, res, next) {
        let { id } = req.params;
        axios({
            url: `${url}/${id}`,
            method: 'DELETE'
        })
            .then(({data}) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

module.exports = MovieController;