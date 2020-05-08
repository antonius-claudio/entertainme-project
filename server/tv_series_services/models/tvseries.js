const { getDatabase } = require('../config/mongo');
const db = getDatabase();
const TvSeriesDb = db.collection('TvSeries');
const { ObjectId } = require('mongodb');

class TvSeries {
    static find() {
        return TvSeriesDb.find().toArray();
    }

    static findById(id) {
        return TvSeriesDb.findOne({_id: ObjectId(id)});
    }

    static create(newMovie) {
        return TvSeriesDb.insertOne(newMovie);
    }

    static update(id, updateTvSeries) {
        return TvSeriesDb.updateOne(
            {_id: ObjectId(id)},
            {
                $set: updateTvSeries,
                $currentDate: { lastModified: true }
            }
        );
    }

    static delete(id) {
        return TvSeriesDb.deleteOne({_id: ObjectId(id)});
    }
}

module.exports = TvSeries;