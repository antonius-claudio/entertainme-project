const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const mongo = require('./config/mongo');
const cors = require('cors');

mongo.connect(function(err) {
    if (!err) {
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(require('./routes'));
        app.listen(PORT, () => {
            console.log('listening on port: ', PORT);
        });
    }
})