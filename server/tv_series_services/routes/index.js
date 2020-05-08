const router = require('express').Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/tvseries', TvSeriesController.find);

router.get('/tvseries/:id', TvSeriesController.findById);

router.post('/tvseries', TvSeriesController.create);

router.put('/tvseries/:id', TvSeriesController.update);

router.delete('/tvseries/:id', TvSeriesController.delete);

module.exports = router;