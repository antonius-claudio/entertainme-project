const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongo = require('./config/mongo');
// const routes = require('./routes');

mongo.connect(function(err) {
    if (!err) {
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(require('./routes'));
        app.listen(PORT, () => {
            console.log('listening on port: ', PORT);
        });
    }
})
