const { getDatabase } = require('../config/mongo');
const db = getDatabase();
const MovieDb = db.collection('movies');
const { ObjectId } = require('mongodb');

class Movie {
    static find() {
        return MovieDb.find().toArray();
    }

    static findById(id) {
        return MovieDb.findOne({_id: ObjectId(id)});
    }

    static create(newMovie) {
        return MovieDb.insertOne(newMovie);
    }

    static update(newMovie) {
        return MovieDb.insertOne(newMovie);
    }

    static delete(id) {
        return MovieDb.remove({_id: ObjectId(id)});
    }
}

module.exports = Movie;