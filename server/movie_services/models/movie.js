const { getDatabase } = require('../config/mongo');
const db = getDatabase();
const MovieDb = db.collection('Movies');
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

    static update(id, updateMovie) {
        return MovieDb.updateOne(
            {_id: ObjectId(id)},
            {
                $set: updateMovie,
                $currentDate: { lastModified: true }
            }
        );
    }

    static delete(id) {
        return MovieDb.deleteOne({_id: ObjectId(id)});
    }
}

module.exports = Movie;