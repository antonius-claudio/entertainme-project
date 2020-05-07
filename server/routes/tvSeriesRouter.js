const router = require('express').Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.find);

module.exports = router;