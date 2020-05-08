const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
// const dbName = 'movies-services-db';
const dbName = 'EntertainMe';
const client = new MongoClient(url, { useNewUrlParser: true ,useUnifiedTopology: true });

let db;

function connect(cb) {
    client.connect(function (err) {
        if (err) {
            console.log('Connection to db failed: ', err);
        } else {
            console.log('Successfully connect to mongoDb')
            db = client.db(dbName);
        }
        cb(err);
    })
}

function getDatabase() {
    return db;
}

module.exports = {
    connect, getDatabase
};