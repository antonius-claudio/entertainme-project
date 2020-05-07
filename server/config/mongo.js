const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'entertainMe';
const client = new MongoClient(url, { useUnifiedTopology: true });

let db;

function connect(cb) {
    client.connect(function (err) {
        if (err) {
            console.log('Connection to db failed: ', err);
        } else {
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