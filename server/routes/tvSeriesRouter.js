const router = require('express').Router();
const TvSeriesController = require('../controllers/TvSeriesController');

router.get('/', TvSeriesController.find);

router.get('/:id', TvSeriesController.findById);

router.post('/', TvSeriesController.create);

router.put('/:id', TvSeriesController.update);

router.delete('/:id', TvSeriesController.delete);

module.exports = router;